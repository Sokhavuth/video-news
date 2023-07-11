// controllers/frontend/user.js

import userDb from "../../models/user.js"


class User{
    async getUser(req, res){
        req.settings.pageTitle = "User page"
        req.settings.route = "/user"

        req.settings.item = await userDb.getUser(req)

        res.render("base", { data: req.settings })
    }
}


export default new User()