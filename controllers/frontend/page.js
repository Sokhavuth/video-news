// controllers/frontend/page.js

import pageDb from "../../models/page.js"

class Page{
    async getPage(req, res){
        req.settings.pageTitle = "ទំព័រ​រឹង"
        req.settings.route = `/page/${req.params.key}`

        req.settings.item = await pageDb.get1Page(req)

        res.render("base", { data: req.settings })
    }
}


export default new Page()