import inMemoryJWTManager from './inMemoryJwt';
const jwt = require("jsonwebtoken");



const verify = (req, res, next) => {
    let accessToken = inMemoryJWTManager.getToken;
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        console.log('i am here1', accessToken)
        return res.status(403).send()
    }
    let payload
    console.log('i am here2', accessToken)
    try{
        console.log('i am here3', accessToken)

        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
        return res.status(401).send()
    }
}

exports.verify = verify;