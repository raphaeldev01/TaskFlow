import UserSchemas from "../../Schemas/UserSchemas.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../../config.js";
interface LoginUserInterface {
    error: boolean,
    message: string,
    token?: string
}

const LoginUser = async (user: string, password: string): Promise<LoginUserInterface> => {
    if (!user) return { error: true, message: "User can't be null" }
    if (!password) return { error: true, message: "Password can't be null" }

    const errorObj = {error: true, message: "Username and/or Password incorrect"}

    try {
        const userOnBase = (await UserSchemas.find({ user: { $eq: user } }))[0]

        if (!userOnBase) return errorObj
        if (!userOnBase.password) return errorObj

        const pwdIsCorrect = await bcrypt.compare(password, userOnBase.password)

        if(!pwdIsCorrect) return errorObj

        const token = jwt.sign({id: userOnBase._id, user: userOnBase.user}, config.jwtSecret);
        return {error: false, message: "User logged", token}

    } catch (err) {
        console.error(err)
        return errorObj
    }
}

export default LoginUser