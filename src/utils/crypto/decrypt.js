const crypto = require('crypto-js');
const Salsa20 = require("js-salsa20");
const { TextEncoder, TextDecoder } = require("util");

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const key1 = encoder.encode("my32lengthsupersecretnooneknows1");
const iv1 = encoder.encode("8bytesiv");

const decryptDetails = (text) => {
  // decrypt: (text) => {
    try {
      if (text) {
        const hexToBytes = (hex) =>
          new Uint8Array(
            hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
          );
        const encrypted = hexToBytes(text);
        const encrypter = new Salsa20(key1, iv1);
        const messageBytes = encrypter.decrypt(encrypted);
        const message = decoder.decode(messageBytes);
        return message;
      } else {
        return { code: 404, message: "String is empty" };
      }
    } catch (e) {
      console.log('e---->',e);
    }
  };
// };

module.exports = {
  decryptDetails,
};