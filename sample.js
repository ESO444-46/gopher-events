const bcrypt = require('bcrypt')

async function hash() {
    const plainPassword = "qwerty2005"
    const hashed = await bcrypt.hash(plainPassword, saltRounds)
    return hashed
}


async function compareHash(hash, plainPassword) {
    const password = bcrypt.compare(plainPassword, hash)
    return password
}


(async () => {
    console.log(await compareHash('$2b$10mR2svTLMgQf6DoW7HjnE9.3dUlaPlCaNulj1Z07ZUZT3UiYBaIkbi', 'qwerty2005'))  // Now it awaits the promise from hash()
})()