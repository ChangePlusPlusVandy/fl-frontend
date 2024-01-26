import * as cryptoJs from "crypto-js";

export const generateHmacSignature = (
  requestBody: string,
  secretKey: string
): string => {
  const hmac = cryptoJs.HmacSHA256(requestBody, secretKey);
  const signatureBase64 = cryptoJs.enc.Base64.stringify(hmac);
  return signatureBase64;
};
