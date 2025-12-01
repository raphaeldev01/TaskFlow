import express, {Application} from "express"

// IMPORT ROUTERS

const app : Application  = express()

//Midlewares
app.use(express.json())



export default app;