//models/post.js

class Post{
    async createPost(req){
        let categories = []

        if(req.body.categories.includes(',')){
            let str = req.body.categories.replace(/\s+/g, "")
            categories = str.split(',')
        }else{
            categories = [req.body.categories]
        }
        
        const new_post = {
            key: `${ 8.64e15 - Date.now()}`,
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos,
            userid: req.user.userKey,
        }

        await req.mydb.posts.put(new_post)
    }

    async getPosts(req, amount, query={}){
        let result = await req.mydb.posts.fetch(query, {limit: parseInt(amount)})
        let posts = result.items
        let lastKey = result.last
        
        return { posts, lastKey }
    }

    async getPost(req){
        return await req.mydb.posts.get(req.params.key)
    }

    async updatePost(req){
        let categories = []

        if(req.body.categories.includes(',')){
            let str = req.body.categories.replace(/\s+/g, "")
            categories = str.split(',')
        }else{
            categories = [req.body.categories]
        }

        let newvalue = {
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos
        }
     
        await req.mydb.posts.update(newvalue, req.params.key)
    }

    async deletePost(req){
        await req.mydb.posts.delete(req.params.key)
    }

    async paginatePosts(req, amount, query={}){
        let options = {limit: parseInt(amount), last: req.body.page}
        let result = await req.mydb.posts.fetch(query, options)
        let posts = result.items
        let lastKey = result.last

        return { posts, lastKey }
    }
}

export default new Post()