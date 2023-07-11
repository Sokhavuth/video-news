//index.js
//npm install express
//npm install ejs
//npm install dotenv
//npm install cookie-parser
//npm install express-fileupload
 
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from "cookie-parser"
import upload from "express-fileupload"
 
const app = express()
const port = process.env.PORT || 3000
process.env.TZ = "Asia/Phnom_Penh"
const __dirname = path.resolve()

import setup from './settings.js'
import frontend from './routes/frontend.js'
import backend from './routes/backend.js'
import mydb from './models/database.js'

app.use('/',async function(req,res,next){
    req.mydb = mydb
    req.settings = await setup(mydb)
    next()
})
 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(upload())
                                  
app.use('/',frontend) 
app.use('/admin',backend)
 
app.listen(port,function(){
    console.log(`This application is listening to the port: ${port}`)
})