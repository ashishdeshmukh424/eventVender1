const crypto = require('crypto-js');

export const encrypt = (value) => {
  const encryptedText = crypto.AES.encrypt(value, '20cd1210-e42a-4c27-b0f8-c0c69321900b').toString();
  return encryptedText
};

encrypt();