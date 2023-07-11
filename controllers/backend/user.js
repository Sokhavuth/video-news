//controllers/backend/user.js

import userDb from "../../models/user.js"

class User{
    async getPage(req, res){
        req.settings.pageTitle = "ទំព័រ​អ្នក​ប្រើប្រាស់"
        req.settings.route = "/admin/user"
        req.settings.type = "user"
        req.settings.userName = req.user.userName

        const { users, lastKey } = await userDb.getUsers(req, req.settings.dItemLimit)
        req.settings.items = users
        req.settings.lastKey = lastKey

        if(req.params.key){
            req.settings.pageTitle = 'ទំព័រ​កែប្រែ​អ្នក​ប្រើប្រាស់'
            req.settings.item = await userDb.getUser(req)
        }

        res.render("base", { data: req.settings })
    }

    async createUser(req, res){
        const user = await userDb.checkUser(req)
        if(user.count){
            req.settings.message = `This email ${req.body.email} is already used by another user.`
            this.getPage(req, res)
        }else{
            await userDb.createUser(req)
            res.redirect("/admin/user")
        }
    }

    async updateUser(req, res){
        if(req.user.userRole === "Author"){
            const user = await userDb.getUser(req)
            if(req.user.userKey === user.key){
                await userDb.updateUser(req)
            }
        }else if(req.user.userRole === "Admin"){
            await userDb.updateUser(req)
        }

        res.redirect("/admin/user")
    }

    async deleteUser(req,res){
        await userDb.deleteUser(req)
        res.redirect("/admin/user")
    }

    async paginateUsers(req, res){
        const { users, lastKey } = await userDb.paginateUsers(req, req.settings.dItemLimit)
        req.settings.items = users
        req.settings.lastKey = lastKey
        req.settings.type = "user"
        res.json(req.settings)
    }
}

export default new User()