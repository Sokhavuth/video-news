//models/setting.js

class Setting{
    async createSetting(req){
        const setting = {
            siteTitle: req.body.siteTitle,
            description: req.body.description,
            ditemLimit: req.body.ditemLimit,
            fitemLimit: req.body.fitemLimit,
            categoryItemLimit: req.body.categoryItemLimit,
        }
        await req.mydb.settings.put(setting)
    }

    async getSetting(req){
        return await req.mydb.settings.get("ek9r0v349ng6")
    }

    async updateSetting(req){
        const setting = {
            siteTitle: req.body.siteTitle,
            description: req.body.description,
            ditemLimit: req.body.ditemLimit,
            fitemLimit: req.body.fitemLimit,
            categoryItemLimit: req.body.categoryItemLimit,
        }

        await req.mydb.settings.update(setting, req.params.key)
    }
}

export default new Setting()