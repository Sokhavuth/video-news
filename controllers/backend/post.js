//controllers/backend/post.js

import postDb from "../../models/post.js"
import categoryDb from "../../models/category.js"

class Post{
    async getPage(req,res){
        req.settings.pageTitle = 'ទំព័រ​ការផ្សាយ'
        req.settings.message = ''
        req.settings.route = '/admin/post'
        req.settings.type = 'post'
        req.settings.userName = req.user.userName

        const {posts, lastKey} = await postDb.getPosts(req, req.settings.dItemLimit)
        req.settings.items = posts
        req.settings.lastKey = lastKey
        req.settings.categories = await categoryDb.getAllItems(req)

        if(req.params.key){
            req.settings.pageTitle = 'ទំព័រ​កែប្រែ​ការផ្សាយ'
            req.settings.item = await postDb.getPost(req)
        }
        
        res.render('base', {data:req.settings})
    }

    async createPost(req, res){
        if(req.user.userRole !== 'Guest'){
            await postDb.createPost(req)
        }

        res.redirect("/admin/post")
    }

    async updatePost(req, res){
        if(req.user.userRole === "Author"){
            const post = await postDb.getPost(req)
            if(req.user.userKey === post.userid){
                await postDb.updatePost(req)
            }
        }else if(req.user.userRole === "Admin"){
            await postDb.updatePost(req)
        }

        res.redirect("/admin/post")
    }

    async deletePost(req, res){
        if(req.user.userRole === "Author"){
            const post = await postDb.getPost(req)
            if(req.user.userKey === post.userid){
                await postDb.deletePost(req)
            }
        }else if(req.user.userRole === "Admin"){
            await postDb.deletePost(req)
        }

        res.redirect("/admin/post")
    }

    async paginatePosts(req, res){
        const { posts, lastKey } = await postDb.paginatePosts(req, req.settings.dItemLimit)
        req.settings.items = posts
        req.settings.lastKey = lastKey
        req.settings.type = "post"
        res.json(req.settings)
    }
}

export default new Post()