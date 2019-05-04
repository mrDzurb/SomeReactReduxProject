const AES = require('crypto-js/aes'),
  modeCFB = require('crypto-js/mode-cfb'),
  Utf8 = require('crypto-js/enc-utf8'),
  Base64 = require('crypto-js/enc-base64');

/*
 * @desc Decrypt string from AES Base64
 * @param string val data for decript
 * @param string key secret key
 * @return string decripted JSON string
 */
module.exports.decode = (val, key) => {
  const tmpVal = Base64.parse(val);
  const iv = tmpVal.clone();
  iv.sigBytes = 16;
  iv.clamp();
  tmpVal.words.splice(0, 4); // delete 4 words = 16 bytes
  tmpVal.sigBytes -= 16;
  // decryption
  return AES.decrypt({ ciphertext: tmpVal }, Utf8.parse(key), {
    iv,
    mode: modeCFB
  }).toString(Utf8);
};
