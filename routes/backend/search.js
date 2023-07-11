//routes/backend/search.js

import express from 'express'
const searchRouter = express.Router()
import search from '../../controllers/backend/search.js'
import login from '../../controllers/backend/login.js'

searchRouter.post('/',login.authorization,async function(req,res){
    if(req.user){
        search.searchItems(req, res)
    }else{
        res.redirect('/admin/login')
    }
})

export default searchRouter