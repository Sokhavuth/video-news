//controllers/backend/search.js

import searchDb from "../../models/search.js"

class Search{
    async searchItems(req, res){
        req.settings.pageTitle = "ទំព័រ​ស្វែងរក"
        req.settings.route = "/admin/search"
        req.settings.userName = req.user.userName

        if('items' in req.settings){
            delete req.settings.items
        }

        const itemType = {
            "ការផ្សាយ": "post",
            "ទំព័រស្តាទិក": "page",
            "ជំពូក": "category",
            "អ្នក​ប្រើប្រាស់": "user",
        }
        req.settings.type = itemType[req.body.search_type]
        req.settings.searchResult = await searchDb.searchItems(req, 12)
        res.render("base", { data: req.settings })
    }
}

export default new Search()