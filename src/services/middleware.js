import inMemoryJWTManager from './inMemoryJwt';
const jwt = require("jsonwebtoken");



 const verify = (req, res, next) => {
		let accessToken = req.body.token;
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        console.log('notverified')
        return res.status(403).send()
    }
    let payload
    try{

        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log('verified bitchezsszzs')
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
        console.log(e)
        return res.status(401).send()
    }
}

exports.verify = verify;