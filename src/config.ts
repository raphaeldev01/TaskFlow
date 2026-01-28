import * as dotenv from 'dotenv'

const env = dotenv.config()

interface Config {
    port: number,
    dbUrl: string,
    jwtSecret: string
}

if(!process.env.PORT) {
    throw new Error("PORT isn't defined on .env")
}

if(!process.env.DB_URL) {
    throw new Error("DB_URL isn't defined on .env")
}

if(!process.env.JWT_SECRET) {
    throw new Error("DB_URL isn't defined on .env")
}

export const config : Config  = {
    port: Number(process.env.PORT),
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET
}