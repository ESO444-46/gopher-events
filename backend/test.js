const Crypto = require("crypto")
const array = new Uint32Array(1);
Crypto.getRandomValues(array);

console.log("Your lucky numbers:");
console.log(array)