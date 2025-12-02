import express, {Application} from "express"

// IMPORT ROUTERS
import userAuthRouter from "./Routers/UserAuth.js"

const app : Application  = express()

//Midlewares
app.use(express.json())

//AuthRouter
app.use("/auth", userAuthRouter)

export default app;