//controllers/backend/login.
//npm install jsonwebtoken

import userDb from '../../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

class Login{
    async getPage(req,res){
        req.settings.pageTitle = 'ទំព័រ​ចុះ​ឈ្មោះ'
        req.settings.message = ''
        req.settings.route = '/admin/login'
        //await userDb.createRootUser(req)
        res.render('base', {data:req.settings})
    }

    async verifyUser(req,res){
        let result = await userDb.checkUser(req)
        
        if(result.count){
            const user = result.items[0]
            if(bcrypt.compareSync(req.body.password, user.password)){
                const data = {userKey:user.key, userRole:user.role, userName:user.title}
                const token = jwt.sign(data, process.env.SECRET_KEY, {expiresIn: "12h"})
                res.cookie("access_token", token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                })
                res.redirect('/admin/post')
            }else{
                req.settings.message = 'ពាក្យ​សំងាត់​មិន​ត្រឹមត្រូវ​ទេ'
                req.settings.route = '/admin/login'
                res.render('base',{data:req.settings})
            }
        }else{
            req.settings.message = 'Email មិន​ត្រឹមត្រូវទេ'
            req.settings.route = '/admin/login'
            res.render('base',{data:req.settings})
        }
    }

    async authorization(req,res,next){
        const token = req.cookies.access_token
        if (!token) {
            next()
            return 
        }
        try{
            const user = jwt.verify(token, process.env.SECRET_KEY)
            req.user = user
            next()
        }catch{
            next()
            return
        }
    }

    async authAdmin(req,res,next){
        const token = req.cookies.access_token
        if (!token) {
            next()
            return 
        }
        try{
            const user = jwt.verify(token, process.env.SECRET_KEY)
            if(user.userRole === "Admin"){
                req.user = user
                req.userRole = user.userRole
            }
            next()
        }catch{
            next()
            return
        }
    }
}

export default new Login()