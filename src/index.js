import {app} from './app.js'
import dotenv from "dotenv";
import connectDb from './DB/database.js';

dotenv.config({ path: "./.env" });

const port = process.env.PORT

connectDb().then(() => {
    app.listen(port, ()=>{
        console.log("server started at port", port)
    })
}).catch((error) => console.log("connection to Db failed", error))



