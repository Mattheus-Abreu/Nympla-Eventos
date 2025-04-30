const jwt = require("jsonwebtoken")

function Autheticate(req, res, nextStage){
    const token = req.headers.authorization.split(" ")[1]

    console.log(token)

    if(!token){
        return res.status(404).json({error: "Token not found"})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded)

        req.user = decoded

        nextStage()
    } catch (error) {
        return res.status(401).json({error: "Invalid token"})
        
    }

}

module.exports = Autheticate