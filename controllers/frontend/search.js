// controllers/frontend/search.js

import searchDb from "../../models/search.js"


class Search{
    async searchItems(req, res){
        req.settings.pageTitle = "ទំព័រ​ស្វែង​រក"
        req.settings.route = "/search"
        req.settings.type = "post"

        req.body.search_type = "ការផ្សាយ"
        req.settings.searchResult = await searchDb.searchItems(req, 12)
    
        res.render("base", { data: req.settings })
    }
}


export default new Search()