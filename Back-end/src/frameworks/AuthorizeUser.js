function Authorize(roleAccess){
    console.log(roleAccess)
    return(req, res, next) => {
        if(req.user.role != roleAccess){
            return res.status(403).json({error: "Access denied"})
        }
        next()
    }
}

module.exports = Authorize