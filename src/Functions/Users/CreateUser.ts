import { error } from "console";
import UserSchemas from "../../Schemas/UserSchemas.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../../config.js";
interface CreateUserType {
    error: boolean,
    message: string,
    token?: string
}

const CreateUser = async (mail: string, password: string, user: string) : Promise<CreateUserType> => {
    if(!mail) return {error: true, message: "Mail can't be null"}
    if(!password) return {error: true, message: "Password can't be null"}
    if(!user) return {error: true, message: "User can't be null"}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(mail)
    if(!emailRegex.test(mail)) {
        return {error: true, message: "Mail is invalid"}
    }

    if(password.length < 6) {
        return {error: true, message: "Password is very short"}
    }

    const isUserByUser = (await UserSchemas.find({user: {$eq: user}}))
    const isUserByMail = (await UserSchemas.find({mail: {$eq: mail}}))

    if(isUserByMail.length > 0) return {error: false, message: "Anyone already have this email address registered"}
    if(isUserByUser.length > 0) return {error: false, message: "Anyone already have this username address registered"}


    try {
        const passwordHash = await bcrypt.hash(password, 10)

        const data = {
            mail, 
            user,
            password: passwordHash,
        }
        const newUser = new UserSchemas(data)
        await newUser.save()

        const token = jwt.sign({id: newUser.id, user: user}, config.jwtSecret)

        return {error: false, message: "A user was created.", token}
    }catch (err) {
        console.error(err)
        return {error: true, message: "There was an error"}
    }
}

export default CreateUser