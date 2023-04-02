import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"
import dotenv from "dotenv"
import db from './Conifg/db.js'
import router from './Routes/Users.js'

dotenv.config();
const app = express()

app.use(cors())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)


app.listen(process.env.PORT || 8000, ()=>{
    console.log(`yoyo im on${process.env.PORT || 8000}`);
})

try {
    await db.authenticate()
    console.log("DB OK");
} catch (e) {
    console.log(e);
}
