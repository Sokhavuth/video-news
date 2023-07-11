// routes/frontend/user.js

import express from "express"
const userRouter = express.Router()

import user from "../../controllers/frontend/user.js"

userRouter.get("/:key", async (req, res) => {
    user.getUser(req, res)
})

export default userRouter