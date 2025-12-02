import express from "express"
import CreateUser from "../Functions/Users/CreateUser.js";
import LoginUser from "../Functions/Users/LoginUser.js";

const userAuth = express.Router()

userAuth.post("/create", async (req, res) => {
    if(!req.body) return res.status(400).json({error: true, message: "invalid body"})
    
    const {user, password, mail} = req.body;

    if(!user) return res.status(400).json({error: true, message: "Body don't have the user"})
    if(!password) return res.status(400).json({error: true, message: "Body don't have the password"})
    if(!mail) return res.status(400).json({error: true, message: "Body don't have the mail"})
    
    const response = await CreateUser(mail, password, user)

    if(response.error) return res.status(400).json(response)
    
    res.send(response)
})

userAuth.post("/login", async (req, res) => {
    if(!req.body) return res.status(400).json({error: true, message: "invalid body"})
    
    const {user, password} = req.body;

    if(!user) return res.status(400).json({error: true, message: "Body don't have the user"})
    if(!password) return res.status(400).json({error: true, message: "Body don't have the password"})
    
    const response = await LoginUser(user, password)

    if(response.error) return res.status(401).json(response)
    
    res.send(response)
})

export default userAuth