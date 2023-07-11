//settings.js
 
async function setup(mydb){
    const setting = await mydb.settings.get("ek9r0v349ng6")
    
    const settings = {
        siteTitle: setting?.siteTitle,
        description: setting?.description,
        date: (new Date()).toDateString(),
        dItemLimit: setting?.ditemLimit,
        indexPostLimit: setting?.fitemLimit,
        categoryPostLimit: setting?.categoryItemLimit,
        pageTitle: "Home",
        username: "",
        message: "",
        count: 0,
    }

    return settings
}
 
export default setup