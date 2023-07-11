//routes/backend/page.js

import express from 'express'
const pageRouter = express.Router()
import page from '../../controllers/backend/page.js'
import login from '../../controllers/backend/login.js'

pageRouter.get('/',login.authorization ,async function(req,res){
    if(req.user){
        await page.getPage(req,res)
    }else{
        res.redirect("/admin/login")
    }
})

pageRouter.post('/',login.authAdmin ,async function(req,res){
    if(req.userRole){
        await page.createPage(req,res)
    }else{
        res.redirect("/admin/page")
    }
})

pageRouter.get('/edit/:key',login.authAdmin ,async function(req,res){
    if(req.userRole){
        await page.getPage(req,res)
    }else{
        res.redirect("/admin/page")
    }
})

pageRouter.post('/edit/:key',login.authAdmin ,async function(req,res){
    if(req.userRole){
        await page.updatePage(req,res)
    }else{
        res.redirect("/admin/page")
    }
})

pageRouter.get('/delete/:key',login.authAdmin,async function(req,res){
    if(req.userRole){
        await page.deletePage(req,res)
    }else{
        res.redirect("/admin/page")
    }
})

pageRouter.post('/paginate',login.authorization, async function(req,res){
    if(req.user){
        await page.paginatePages(req,res)
    }else{
        res.redirect("/admin/login")
    }
})

export default pageRouter