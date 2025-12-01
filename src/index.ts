import app from "./app.js";
import { config } from "./config.js";
import mongoose from "mongoose"

mongoose.connect(config.db_url)

app.listen(config.port, () => {
    console.log(`Server running on ${config.port}`)
})