// routes/frontend/search.js

import express from "express"
const searchRouter = express.Router()

import search from "../../controllers/frontend/search.js"

searchRouter.post("/", async (req, res) => {
    search.searchItems(req, res)
})


export default searchRouter