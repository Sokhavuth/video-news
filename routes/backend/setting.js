//routes/backend/setting.js

import express from 'express'
const settingRouter = express.Router()
import setting from '../../controllers/backend/setting.js'
import login from '../../controllers/backend/login.js'

settingRouter.get('/',login.authAdmin,async function(req,res){
    if(req.userRole){
        setting.getPage(req,res)
    }else{
        res.redirect('/admin/post')
    }
})

settingRouter.post('/',login.authAdmin,async function(req,res){
    if(req.userRole){
        setting.createSetting(req,res)
    }else{
        res.redirect('/admin/post')
    }
})

settingRouter.post('/edit/:key',login.authAdmin,async function(req,res){
    if(req.userRole){
        setting.updateSetting(req,res)
    }else{
        res.redirect('/admin/post')
    }
})

export default settingRouter