//models/search.js

class Search{
    async searchItems(req, amount){
        const q = req.body.q
        const type = req.body.search_type

        const itemType = {
            "ការផ្សាយ": "posts",
            "ទំព័រស្តាទិក": "pages",
            "ជំពូក": "categories",
            "អ្នក​ប្រើប្រាស់": "users",
        }

        const collection = itemType[type]

        if(req.body.search_front){
            const category = {
                "​​​​​​​​​​​​​​ព័ត៌មាន": "News",
                "ភាពយន្ត": "Movie"
            }
            var query = {
                "title?contains": q,
                "categories?contains": category[req.body.search_front]
            }
              
        }else{
            var query = [
                {"title?contains": q},
                {"content?contains": q},
                {"categories?contains": q},
                {"role?contains": q}
            ]   
        }

        const { items } = await req.mydb[collection].fetch(query)
        items.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
    
        return items.slice(0, amount)
    }
}

export default new Search()