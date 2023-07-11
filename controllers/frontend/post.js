// controllers/frontend/post.js

import postDb from "../../models/post.js"


class Post{
    async getPost(req, res){
        req.settings.pageTitle = 'ទំព័រ​​​​​​​​ការផ្សាយ'
        req.settings.message = ''
        req.settings.route = '/post'
        req.settings.type = 'post'

        req.settings.item = await postDb.getPost(req)

        res.render("base", { data: req.settings })
    }
}


export default new Post()