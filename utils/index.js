
import CryptoJS from 'crypto-js/crypto-js'
/**
 * 加密
 * @param {*} str 
 */

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

function encrypt(str) {
    let srcs = CryptoJS.enc.Utf8.parse(str);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
/**
 * 解密
 * @param {*} str 
 */
function decryption(str) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(str);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}


export default {
    encrypt,
    decryption
}