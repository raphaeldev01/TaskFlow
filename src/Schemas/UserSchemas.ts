import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    user: String,
    password: String,
    mail: String,
    recoverMail: Object || null
})

export default mongoose.model('user', UserSchema)