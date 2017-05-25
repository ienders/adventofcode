const fs = require('fs')
const md5 = require('md5')

const secretKey = fs.readFileSync('secret_key', 'utf8')

let i = 1
while (md5(`${secretKey}${i}`).substring(0, 6) !== '000000') {
  i += 1
}

console.log(`Found the number! ${i}`)
