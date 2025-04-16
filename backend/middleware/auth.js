//Firebase JWT 미들웨어
const {admin} = require ("../config/firebase");

async function authenticate(req, res, next) {
    const token = req.headers.authoriztion?.split("Bearer")[1];
    if (!token) 
        return res.status(401).json({ error: "Unauthorized"});

    try{
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        next();
    } catch(err) {
        res.status(403).json({ error: "Invalid token" });
    }
}

module.exports = authenticate;