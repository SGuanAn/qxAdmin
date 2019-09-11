const CryptoJS = require('crypto-js')

// 密钥
const key = CryptoJS.enc.Utf8.parse("eutg^7sNcKpe8ZjT");
const iv = CryptoJS.enc.Utf8.parse('NDZRO2Rtu2etl&PN');

// 解密方法
export function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedStr.toString());
}

// 加密
export function Encrypt(data) {
    let text = JSON.stringify(data)
    let srcs = CryptoJS.enc.Utf8.parse(text);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString().toUpperCase();
}