const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (res, req, next) => {
        const token = req.headers.token;
        if (token) {
            const accesToken = token.split(" ")[1];
            jwt.verify(accesToken, privateKey, (er, user) => {
                if (er) {
                    res.status(403).json('Token đã hết hạn');
                }
                req.user = user;
                next();
            })
        } else {
            res.status(401).json('bạn chưa đăng nhập')
        }
    }
}
module.exports = middlewareController;