var jwt = require('jsonwebtoken');

let signAsJWT = async (payload) => {
    let token = await new Promise((res, rej) => {
        let privateKey=process.env.NEXT_PRIVATE_KEY;
        //console.log(privateKey)
        jwt.sign(payload, privateKey, { algorithm: 'RS256' }, function (err, token) {
            if (err) {
                rej(err)
            }
            console.log(token);
            res(token)
        });
    });
    return token;
}

export { signAsJWT }