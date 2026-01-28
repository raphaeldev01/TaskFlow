import express, {Application} from "express"

// IMPORT ROUTERS
import userAuthRouter from "./Routers/UserAuth.js"
import AuthMidleware from "./Functions/Users/AuthMidlewares.js"

const app : Application  = express()

//Midlewares
app.use(express.json())

//AuthRouter
app.use("/auth", userAuthRouter)

app.use(AuthMidleware)

export default app;