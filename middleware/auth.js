const jwt = require('jsonwebtoken')
const secret = '869dc5e63173eee4ff96c55dc942c10c'


module.exports = async (req, res, next) => {
    if (!req.headers.authorization){
        return res.status(401).json({erro: "Falha ao autenticar seu token!"})
    }
    const [, token] = req.headers.authorization.split(' ')

    try{
        const decode = await jwt.verify(token, secret)
        req.user = decode
        next()
    }catch(err){
        return res.status(401).json({error: 'Falha ao autenticar seu token!'})
    }
}