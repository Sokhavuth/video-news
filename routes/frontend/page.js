// routes/frontend/page.js

import express from "express"
const pageRouter = express.Router()

import page from "../../controllers/frontend/page.js"


pageRouter.get("/:key", async (req, res) => {
    page.getPage(req, res)
})


export default pageRouter