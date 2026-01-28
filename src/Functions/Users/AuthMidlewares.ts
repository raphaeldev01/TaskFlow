import jwt from  "jsonwebtoken"
import { config } from "../../config.js";
import GetUser from "./GetUser.js";

interface DecodedToken {
  id: string; 
  user: string; 
}

const AuthMidleware = async (req : any, res : any, next: any) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ error: true, msg: "Unauthorized" })
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), config.jwtSecret) as DecodedToken;
        req.id = decoded.id;
        req.user = decoded.user
        const response =  await GetUser(decoded.id)
        if(response.error) res.status(401).send({ error: true, msg: "Unauthorized" })
        next();
    } catch (err) {
        res.status(401).send({ error: true, msg: "Unauthorized" })
    }
}

export default AuthMidleware