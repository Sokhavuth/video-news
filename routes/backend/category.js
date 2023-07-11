//routes/backend/category.js

import express from 'express'
const categoryRouter = express.Router()
import category from '../../controllers/backend/category.js'
import login from '../../controllers/backend/login.js'

categoryRouter.get('/',login.authorization,async function(req,res){
    if(req.user){
        await category.getPage(req,res)
    }else{
        res.redirect("/admin/login")
    }
    
})

categoryRouter.post('/',login.authAdmin,async function(req,res){
    if(req.userRole){
        await category.createCategory(req,res)
    }else{
        res.redirect("/admin/category")
    }
})

categoryRouter.get('/edit/:key',login.authAdmin,async function(req,res){
    if(req.userRole){
        await category.editCategory(req,res)
    }else{
        res.redirect("/admin/category")
    }
})

categoryRouter.post('/edit/:key',login.authAdmin,async function(req,res){
    if(req.userRole){
        await category.updateCategory(req,res)
    }else{
        res.redirect("/admin/category")
    }
})

categoryRouter.get('/delete/:key',login.authAdmin,async function(req,res){
    if(req.userRole){
        await category.deleteCategory(req,res)
    }else{
        res.redirect("/admin/category")
    }
})

categoryRouter.post('/paginate',login.authorization,async function(req,res){
    if(req.user){
        await category.paginate(req,res)
    }else{
        res.redirect("/admin/login")
    }
})

export default categoryRouter