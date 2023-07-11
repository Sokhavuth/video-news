// models/category.js

class Category{
    async getAllItems(req){
        let result = await req.mydb.categories.fetch()
        let allItems = result.items

        while(result.last){
            result = await req.mydb.categories.fetch({}, {last: result.last})
            allItems = allItems.concat(result.items)
        }
        
        return allItems
    }

    async createCategory(req){
        const new_category = {
            key: `${ 8.64e15 - Date.now()}`,
            title: req.body.label,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }

        await req.mydb.categories.put(new_category)
    }

    async getCategories(req, amount){
        let result = await req.mydb.categories.fetch({}, {limit: parseInt(req.settings.dItemLimit)})
        let categories = result.items
        let lastKey = result.last
        return { categories, lastKey }
    }

    async getCategory(req){
        return await req.mydb.categories.get(req.params.key)
    }

    async updateCategory(req){
        const updatedCategory = {
            title: req.body.label,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }
        
        await req.mydb.categories.update(updatedCategory, req.params.key)
    }

    async deleteCategory(req){
        await req.mydb.categories.delete(req.params.key)
    }

    async paginate(req, amount){
        if(req.body.page){
            let options = {limit: parseInt(req.settings.dItemLimit), last: req.body.page}
            let result = await req.mydb.categories.fetch({}, options)
            let categories = result.items
            let lastKey = result.last
        }else{
            categories = []
            lastKey = ''
        }

        return { categories, lastKey }
    }
}


export default new Category()