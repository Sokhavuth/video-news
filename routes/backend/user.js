//routes/backend/user.js

import express from 'express'
const userRouter = express.Router()
import user from '../../controllers/backend/user.js'
import login from '../../controllers/backend/login.js'

userRouter.get('/',login.authorization,async function(req,res){
    if(req.user){
        await user.getPage(req,res)
    }else{
        res.redirect('/admin/login')
    }
})

userRouter.post('/',login.authAdmin,async function(req,res){
    if(req.userRole){
        await user.createUser(req,res)
    }else{
        res.redirect('/admin/user')
    }
})

userRouter.get('/edit/:key',login.authorization,async function(req,res){
    if(req.user){
        await user.getPage(req,res)
    }else{
        res.redirect('/admin/login')
    }
})

userRouter.post('/edit/:key',login.authorization,async function(req,res){
    if(req.user){
        await user.updateUser(req,res)
    }else{
        res.redirect('/admin/login')
    }
})

userRouter.get('/delete/:key',login.authAdmin,async function(req,res){
    if(req.userRole){
        await user.deleteUser(req,res)
    }else{
        res.redirect('/admin/user')
    }
})

userRouter.post('/paginate',login.authorization,async function(req,res){
    if(req.user){
        await user.paginateUsers(req,res)
    }else{
        res.redirect('/admin/login')
    }
})

export default userRouter