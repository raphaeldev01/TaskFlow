import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title: String,
    desc: String,
    priority: String,
    state: String,
    dateStart: Number,
    dataEnd: Number || null,
    tags: Array
})

export default mongoose.model('Task', TaskSchema)