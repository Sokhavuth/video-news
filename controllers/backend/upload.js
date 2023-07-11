//controllers/backend/upload.js

import crypto from 'crypto'

class Upload{
    async getPage(req, res){
        req.settings.pageTitle = "ទំព័រ Upload"
        req.settings.route = "/admin/upload"
        req.settings.userName = req.user.userName

        if(('items' in req.settings)&&('count' in req.settings)){
            delete req.settings.items
            delete req.settings.count
        }
        
        res.render("base", {data: req.settings})
    }

    async insertFile(req, res){
        req.settings.pageTitle = "ទំព័រ Upload"
        req.settings.route = "/admin/upload"
        req.settings.userName = req.user.userName
        
        req.settings.name = crypto.randomUUID() + "-" + req.files.file.name
        const contents = req.files.file.data
        if(req.user.userRole !== "Guest"){
            req.settings.img = await req.mydb.upload.put(req.settings.name, {data: contents})
        }
        res.render("base", {data: req.settings})
    }

    async getFile(req, res){
        req.settings.pageTitle = "ទំព័រ Upload"
        req.settings.route = "/admin/upload"

        const name = req.params.fileName
        const img = await req.mydb.upload.get(name)
        const buffer = await img.arrayBuffer()
        res.send(Buffer.from(buffer))
    }
}

export default new Upload()