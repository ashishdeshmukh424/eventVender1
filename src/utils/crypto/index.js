const crypto = require('crypto-js');

const decrypt = (text) => {
  if (!text) return null;

  const bytes = crypto.AES.decrypt(text, 'FHRVr+XvNJh@3N$$wV_m7ujVp2#G5n2f');
  return bytes.toString(crypto.enc.Utf8);
};

module.exports = {
  decrypt,
};