import { createOSSClient } from "@/sdk";
import type { PutObjectOptions } from "ali-oss";

/**
 * AliOSS
 */
export default async function useAliOSS() {
  const client = await createOSSClient();
  if (!client) throw new Error("OSS client is null");

  /**
   * 上传文件
   */
  const upload = async (name: string, file: File, headers: PutObjectOptions) => {
    const result = await client.put(name, file, headers);
    return result;
  };

  /**
   * 预览文件
   */
  const preview = async (name: string) => {
    const result = await client.signatureUrl(name, {
      expires: 3600,
      process: "imm/previewdoc,copy_1",
      response: {
        "content-disposition": "inline",
      },
    });
    return result;
  };

  /**
   * 下载文件
   */
  const download = async (name: string) => {
    const result = await client.signatureUrl(name, {
      expires: 3600,
      response: {
        "content-disposition": "attachment",
      },
    });
    return result;
  };

  /**
   * 删除文件
   */
  const remove = async (name: string) => {
    const result = await client.delete(name);
    return result;
  };

  /**
   * 列举文件
   */
  const list = async (prefix: string) => {
    const result = await client.list(
      {
        prefix,
        "max-keys": 1000,
      },
      {
        timeout: 60000,
      }
    );
    return result;
  };

  return {
    client,
    upload,
    preview,
    remove,
    download,
    list,
  };
}
