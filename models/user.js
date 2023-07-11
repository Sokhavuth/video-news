//models/user.js
//npm install bcryptjs

import bcrypt from "bcryptjs"

class User{
    async createRootUser(req){
        const hashPassword = bcrypt.hashSync("password", 10)

        const user = {
            key: `${ 8.64e15 - Date.now()}`,
            title: "Guest",
            password: hashPassword,
            email: "guest@khmerweb.app",
            role: "Guest",
            thumb: "",
            info: "",
            video: "",
            date: ""
        }

        await req.mydb.users.put(user)
    }

    async checkUser(req){
        return await req.mydb.users.fetch({email: req.body.email})
    }

    async getUsers(req, amount){
        let result = await req.mydb.users.fetch({}, {limit: parseInt(req.settings.dItemLimit)})
        let users = result.items
        let lastKey = result.last
        return { users, lastKey }
    }

    async createUser(req){
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const user = {
            key: `${ 8.64e15 - Date.now()}`,
            title: req.body.title,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role,
            thumb: req.body.thumb,
            content: req.body.content,
            date: req.body.datetime,
        }

        await req.mydb.users.put(user)
    }

    async getUser(req){
        const user = await req.mydb.users.get(req.params.key)
        return user
    }

    async updateUser(req){
        const user = await this.getUser(req)
        if(req.body.password !== user.password){
            var hashedPassword = bcrypt.hashSync(req.body.password, 10)
        }else{
            var hashedPassword = req.body.password
        }

        const newUser = {
            title: req.body.title,
            password: hashedPassword,
            email: req.body.email,
            thumb: req.body.thumb,
            content: req.body.content,
            date: req.body.datetime,
        }
     
        await req.mydb.users.update(newUser, req.params.key)
    }

    async deleteUser(req){
        await req.mydb.users.delete(req.params.key)
    }

    async paginateUsers(req, amount){
        let options = {limit: parseInt(req.settings.dItemLimit), last: req.body.page}
        let result = await req.mydb.users.fetch({}, options)
        let users = result.items
        let lastKey = result.last
        return { users, lastKey }
    }
}

export default new User()