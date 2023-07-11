//routes/backend/post.js

import express from 'express'
const postRouter = express.Router()
import post from '../../controllers/backend/post.js'
import login from '../../controllers/backend/login.js'

postRouter.get('/',login.authorization ,async function(req,res){
    if(req.user){
        await post.getPage(req,res)
    }else{
        res.redirect("/admin/login")
    }
})

postRouter.post('/',login.authorization ,async function(req,res){
    if(req.user){
        await post.createPost(req,res)
    }else{
        res.redirect("/admin/login")
    }
})

postRouter.get('/edit/:key',login.authorization ,async function(req,res){
    if(req.user){
        await post.getPage(req,res)
    }else{
        res.redirect("/admin/login")
    }
})

postRouter.post('/edit/:key',login.authorization, async function(req,res){
    if(req.user){
        await post.updatePost(req,res)
    }else{
        res.redirect("/admin/login")
    }
})

postRouter.get('/delete/:key',login.authorization, async function(req,res){
    if(req.user){
        await post.deletePost(req,res)
    }else{
        res.redirect("/admin/login")
    }
})

postRouter.post('/paginate',login.authorization, async function(req,res){
    if(req.user){
        await post.paginatePosts(req,res)
    }else{
        res.redirect("/admin/login")
    }
})

export default postRouter