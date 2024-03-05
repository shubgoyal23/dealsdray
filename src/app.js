import express from "express";
import cors from "cors";
import path from 'path';
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(cookieParser());


import userRouter from "./router/user.router.js"
app.use("/api/v1/users", userRouter)

import employeeRouter from './router/employee.route.js'
app.use("/api/v1/employee", employeeRouter)

export {app}