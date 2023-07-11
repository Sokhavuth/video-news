//controllers/backend/category.js

import categoryDb from '../../models/category.js'

class Category{
    async getPage(req,res){
        req.settings.pageTitle = 'ទំព័រ​ជំពូក'
        req.settings.message = ''
        req.settings.route = '/admin/category'
        req.settings.type = "category"
        req.settings.userName = req.user.userName

        const { categories, lastKey } = await categoryDb.getCategories(req,req.settings.dItemLimit)
        req.settings.items = categories
        req.settings.lastKey = lastKey
  
        res.render('base', {data:req.settings})
    }

    async createCategory(req, res){
        await categoryDb.createCategory(req)
        res.redirect("/admin/category")
    }

    async editCategory(req, res){
        req.settings.pageTitle = "ទំព័រ​កែប្រែ​ជំពូក"
        req.settings.message = ''
        req.settings.route = '/admin/category'
        req.settings.type = "category"
        req.settings.userName = req.user.userName

        const { categories, length} = await categoryDb.getCategories(req, req.settings.dpostLimit)
        req.settings.items = categories
        req.settings.count = length
        req.settings.item = await categoryDb.getCategory(req)

        res.render("base", { data: req.settings })
    }

    async updateCategory(req, res){
        await categoryDb.updateCategory(req)
        res.redirect("/admin/category")
    }

    async deleteCategory(req, res){
        await categoryDb.deleteCategory(req)
        res.redirect("/admin/category")
    }

    async paginate(req, res){
        const { categories, lastKey } = await categoryDb.paginate(req, req.settings.dItemLimit)
        req.settings.items = categories
        req.settings.lastKey = lastKey
        req.settings.type = "category"
        res.json(req.settings)
    }
}

export default new Category()