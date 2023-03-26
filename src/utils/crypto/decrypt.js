const crypto = require('crypto-js');

const decrypt = (text) => {
  if (!text) return null;

  const bytes = crypto.AES.decrypt(text, '20cd1210-e42a-4c27-b0f8-c0c69321900b');
  return bytes.toString(crypto.enc.Utf8);
};

module.exports = {
  decrypt,
};