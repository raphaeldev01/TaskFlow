import UserSchemas from "../../Schemas/UserSchemas.js";

interface GetUserInterface {
    error: boolean,
    message: string,
    user?: object,
}

const GetUser = async (id: string): Promise<GetUserInterface> => {
    if(!id) return {error: true, message: "ID can't be null"}


    try {
        const userOnBase = (await UserSchemas.findById(id))

        if(!userOnBase) return {error: true, message: "This ID is invalid!"}

        const dataUser = {
            user: userOnBase.user,
            mail: userOnBase.mail
        }

        return {error: false, message: "", user: dataUser }
    } catch (err) {
        return { error: true, message: "", }
    }
}