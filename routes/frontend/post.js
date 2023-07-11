//routes/frontend/post.js

import express from 'express'
const postRouter = express.Router()
import post from '../../controllers/frontend/post.js'

postRouter.get("/:key", async (req, res) => {
    post.getPost(req, res)
})

export default postRouter