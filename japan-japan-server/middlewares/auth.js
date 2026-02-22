import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next) {

    let token = req.headers.authorization
    if (!token)
        return res.status(401).json({ title: "unauthorized", message: "first log in" })
    try {

        let data = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = data._id
        next()
        
    }
    catch (err) {
        return res.status(401).json({ title: "unauthorized", message: err.message })
    }
}

export function authManagerMiddleware(req, res, next) {

    let token = req.headers.authorization
    if (!token)
        return res.status(401).json({ title: "unauthorized", message: "first log in" })
    try {


        let data = jwt.verify(token,process.env.JWT_SECRET)//הוא בודק שהטוקן תקין ובתוקף
        req.userId = data._id
        if (data.role != "ADMIN")
            return res.status(403).json({ title: "forbidden", message: "you are not allowed" })
        next()
    }        
    catch (err) {
        return res.status(401).json({ title: "unauthorized", message: err.message })
    }
}