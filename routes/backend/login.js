//routes/backend/login.js
 
import express from 'express'
const loginRouter = express.Router()
import login from '../../controllers/backend/login.js'
 
loginRouter.get('/',login.authorization,async function(req,res){
    if(req.user){
        res.redirect("/admin/post")
    }else{
        await login.getPage(req,res)
    }
})

loginRouter.get('/logout',login.authorization,async function(req,res){
    if(req.user){
        res.clearCookie("access_token")
        res.redirect("/admin/login")
    }else{
        res.redirect('/admin/login')
    }
})

loginRouter.post('/',async function(req,res){
    await login.verifyUser(req,res)
})
 
export default loginRouter