// routes/backend/upload.js

import express from "express"
const uploadRouter = express.Router()
import upload from "../../controllers/backend/upload.js"
import login from '../../controllers/backend/login.js'

uploadRouter.get('/',login.authorization,async function(req,res){
    if(req.user){
        await upload.getPage(req, res)
    }else{
        res.redirect('/admin/login')
    }
})

uploadRouter.post('/',login.authorization,async function(req,res){
    if(req.user){
        await upload.insertFile(req, res)
    }else{
        res.redirect('/admin/login')
    }
})

uploadRouter.get("/download/:fileName",login.authorization, async (req, res) => {
    if(req.user){
        upload.getFile(req, res)
    }else{
        res.redirect('/admin/login')
    }
})

export default uploadRouter