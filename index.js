const axios = require('axios').default;
const crypto = require('crypto');
// const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)
const fs = require('fs');
const CircularJSON = require('circular-json');

var publicKey = fs.readFileSync('publickey.pem', 'utf8');


const express = require('express')
const app = express()

app.get('/', async (req, res) => {
    // var custId = encrypt("subham", key, iv);
    var custId = encrypt("bonedagift", key, iv);
    console.log("\nThis is Custid.encryptedData =====>", custId.encryptedData);

    // var pwd = encrypt("subhamMukherjee**", key, iv);
    var pwd = encrypt("123wincube**", key, iv);
    console.log("\nThis is pwd.encryptedData =====>", pwd.encryptedData);

    var autKey = encrypt("eyrtjhvcye7657823bh6f7tvtcw8qbhjvgv7qw654hvgchdvfgasf", key, iv);
    console.log("\nThis is autKey.encryptedData =====>", autKey.encryptedData);

    const aesKey = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        },
        Buffer.from(key).toString('base64')
    )

    const aesIv = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(iv)
    )

    console.log("\nThis is aesKey =====>", aesKey.toString('base64'));


    console.log("\nThis is aesIv =====>", aesIv.toString('base64'));


    // var options = {
    //     'method': 'POST',
    //     'url': 'http://dev.giftting.co.kr:48081/auth/code/issue',
    //     'headers': {
    //         'Content-Type': 'application/json'
    //     },
    //     'body': {
    //         "custId": custId.encryptedData,
    //         "pwd": pwd.encryptedData,
    //         "autKey": autKey.encryptedData,
    //         "aesKey": aesKey.toString("base64"),
    //         "aesIv": aesIv.toString("base64")

    //     }
    // };
    // const result = await axios(options);

    // console.log('result=================', result)
    // const str = CircularJSON.stringify(result);


    // res.send({
    //     data: JSON.parse(str)
    // })

    res.send('Hello World')
})

function encrypt(text, key, iv) {
    const crypto = require('crypto')
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return {
        encryptedData: encrypted.toString('hex'),
        key: key.toString('hex'),
        iv: iv.toString('hex')
    }
}

app.listen(3000)