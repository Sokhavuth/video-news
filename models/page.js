//models/page.js

class Page{
    async getPages(req, amount){
        let result = await req.mydb.pages.fetch({}, {limit: parseInt(req.settings.dItemLimit)})
        let pages = result.items
        let lastKey = result.last
        
        return { pages, lastKey }
    }

    async createPage(req){
        const new_page = {
            key: `${ 8.64e15 - Date.now()}`,
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }

        await req.mydb.pages.put(new_page)
    }

    async get1Page(req){
        return await req.mydb.pages.get(req.params.key)
    }

    async updatePage(req){
        let newvalue = {
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }
     
        await req.mydb.pages.update(newvalue, req.params.key)
    }

    async deletePage(req){
        await req.mydb.pages.delete(req.params.key)
    }

    async paginatePages(req, amount){
        let options = {limit: parseInt(req.settings.dItemLimit), last: req.body.page}
        let result = await req.mydb.pages.fetch({}, options)
        let pages = result.items
        let lastKey = result.last
        return { pages, lastKey }
    }
}

export default new Page()