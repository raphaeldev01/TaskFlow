import TaskSchema from "../../Schemas/TaskSchema.js";

interface CreateTaskInterface {

}

type params = {
    id: string,
    title: string,
    desc: string,
    priority: "high" | "mid" | "low",
    state: "finish" | "in progress" | "to do",
    dateStart: number,
    dateEnd: number,
    tags: string[],
    userID: string
}

const CreateTask: CreateTaskInterface = async ({
    id,
    title,
    desc,
    priority,
    state,
    dateStart,
    dateEnd,
    tags,
}: params) => {
    if (!id) return { error: true, message: "ID can't be null" }
    if (!title) return { error: true, message: "Title can't be null" }
    if (!desc) return { error: true, message: "Desc can't be null" }
    if (!dateStart) return { error: true, message: "DateStart can't be null" }

    try {
        const orderNumber = (await TaskSchema.find({userId: {$eq: id}})).length
        
        const data = {
            title,
            desc,
            priority: priority ? priority : "low",
            state: state ? state : "to do",
            dateStart,
            dataEnd: dateEnd ? dateEnd : null,
            tags: tags ? tags : [],
            userID: id,
            order: orderNumber
        }

        const newTask = new TaskSchema(data)
        await newTask.save()

        return {error: true, message: "There was an error"}

    } catch (err) {
        return {error: true, message: "There was an error"}
    }
}

export default CreateTask