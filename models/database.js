//models/database.js

import dotenv from 'dotenv'
dotenv.config()
import {Deta} from "deta"

const deta = Deta(process.env.DETA_PROJECT_KEY)
const mydb = {}
mydb.users = deta.Base("users")
mydb.categories = deta.Base("categories")
mydb.posts = deta.Base("posts")
mydb.pages = deta.Base("pages")
mydb.upload = deta.Drive("upload")
mydb.settings = deta.Base("settings")

export default mydb