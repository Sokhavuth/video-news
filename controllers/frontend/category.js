// controllers/frontend/category.js

import postDb from "../../models/post.js"

class Category{
    async getPosts(req, res){
        req.settings.pageTitle = "Category page"
        req.settings.route = "/category"
        req.settings.type = req.params.category

        const query = { "categories?contains": req.params.category }
        const amount = req.settings.categoryPostLimit
        const { posts, lastKey } = await postDb.getPosts(req, amount, query)
        req.settings.items = posts
        req.settings.lastKey = lastKey
        
        res.render("base", { data: req.settings })
    }

    async paginate(req, res){
        const amount = req.settings.categoryPostLimit
        const query = { "categories?contains": req.body.category }
        const { posts, lastKey } = await postDb.paginatePosts(req, amount, query)
        req.settings.lastKey = lastKey
        req.settings.items = posts

        res.json(req.settings)
    }
}


export default new Category()