import OSS from "ali-oss";
import type { Credentials } from "ali-oss";

// 向服务器获取临时凭证
function getSTS(): Promise<Credentials> {
  return new Promise((resolve, reject) => {
    // get STS token from server
    // see: https://help.aliyun.com/document_detail/32077.html
    fetch("http://127.0.0.1:5976/clover-api/ali-oss/v1/get-sts")
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}

// 构建OSS客户端
async function createOSSClient() {
  const sts = await getSTS().catch(console.log);
  if (!sts) return null;
  return new OSS({
    // 使用自定义域名作为Endpoint。
    // see: https://help.aliyun.com/document_detail/64059.htm
    endpoint: "https://clover-oss.wzc520pyf.cn",
    // 使用自定义域名需开启cname
    cname: true,
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: "oss-cn-hangzhou",
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: sts.AccessKeyId,
    accessKeySecret: sts.AccessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: sts.SecurityToken,
    bucket: "clover-admin-oss",
    // 刷新临时访问凭证
    refreshSTSToken: async () => {
      // 向您搭建的STS服务获取临时访问凭证。
      const info = await getSTS();
      return {
        accessKeyId: info.AccessKeyId,
        accessKeySecret: info.AccessKeySecret,
        stsToken: info.SecurityToken,
      };
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 300000,
  });
}

export { createOSSClient };
