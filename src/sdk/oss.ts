import OSS from "ali-oss";
import type { Credentials } from "ali-oss";

function getSTS(): Promise<Credentials> {
  return new Promise((resolve, reject) => {
    // get STS token from server
    fetch("http://127.0.0.1:5976/clover-api/ali-oss/v1/get-sts")
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
      });
  });
}

export default async function createOSSClient() {
  const sts = await getSTS();
  if (!sts) return null;
  return new OSS({
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
