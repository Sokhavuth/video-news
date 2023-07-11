//controllers/frontend/index.js

import postDb from "../../models/post.js"

class Home{
    async shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async generateVideos(posts){
        const videos = []
        for(let post of posts){
            var playlist = post.videos
            await videos.push((JSON.parse(playlist))[0].id)
        }
        return videos
    }

    async getPage(req, res){
        req.settings.pageTitle = 'ទំព័រ​ដើម'
        req.settings.message = ''
        req.settings.route = '/'
        req.settings.type = 'post'

        const amount = 50
        
        const query_news = { "categories?contains": "News" }
        let newsObj = await postDb.getPosts(req, amount, query_news)
        this.shuffleArray(newsObj.posts)
        req.settings.newsThumb = newsObj.posts[0].thumb
        const news_videos = await this.generateVideos(newsObj.posts)
        req.settings.news = JSON.stringify(news_videos)

        const query_movie = { "categories?contains": "Movie" }
        let movieObj = await postDb.getPosts(req, amount, query_movie)
        this.shuffleArray(movieObj.posts)
        req.settings.movieThumb = movieObj.posts[0].thumb
        const movie_videos = await this.generateVideos(movieObj.posts)
        req.settings.movies = JSON.stringify(movie_videos)

        let frontObj = await postDb.getPosts(req, req.settings.indexPostLimit)
        req.settings.latestPosts = frontObj.posts
        req.settings.lastKey = frontObj.lastKey
        let posts = movieObj.posts.concat(newsObj.posts)
        const post_videos = await this.generateVideos(posts)
        this.shuffleArray(post_videos)
        req.settings.latestVideos = JSON.stringify(post_videos)
        
        res.render('base', {data:req.settings})
    }

    async paginate(req, res){
        const { posts, lastKey } = await postDb.paginatePosts(req, req.settings.indexPostLimit)
        req.settings.items = posts
        req.settings.lastKey = lastKey
        
        res.json(req.settings)
    }
}

export default new Home()