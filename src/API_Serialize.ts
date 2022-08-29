/*
 * API_Serialize.ts
 * author: evan kirkiles
 * created on Mon Aug 29 2022
 * 2022 the nobot space,
 */
import * as APIt from "./API";
import { Storage, StorageAccessLevel } from "@aws-amplify/storage";
import awsmobile from "./aws-exports";
import { Auth } from "@aws-amplify/auth";
import { ICredentials } from "@aws-amplify/core";

/**
 * Uploads a file to S3, and then returns an S3Object input type which can be
 * used to reference that file.
 * @param file
 * @param protectionLevel
 * @param key
 */
export const uploadToS3 = async (
  file: File,
  key: string,
  protectionLevel: StorageAccessLevel,
  credentials?: ICredentials
): Promise<APIt.S3ObjectInput> => {
  const { type: mimeType } = file;
  // get credentials to use identityid
  const creds = credentials || (await Auth.currentCredentials());
  // put the S3 object in storage
  await Storage.put(key, file, {
    level: protectionLevel,
    contentType: mimeType,
  });
  // return access controls to get it
  return {
    identityId: creds.identityId,
    bucket: awsmobile.aws_user_files_s3_bucket,
    region: awsmobile.aws_user_files_s3_bucket_region,
    key: key,
  };
};
