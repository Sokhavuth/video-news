//routes/frontend/home.js

import express from 'express'
const frontRouter = express.Router()
import home from '../../controllers/frontend/home.js'

frontRouter.get('/', async (req, res)=>{
    await home.getPage(req,res)
})

frontRouter.post("/paginate", async (req, res) => {
    home.paginate(req, res)
})

export default frontRouter