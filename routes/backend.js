//routes/backend.js

import express from 'express'
const backendRouter = express.Router()

import loginRouter from './backend/login.js'
backendRouter.use('/login', loginRouter)

import postRouter from './backend/post.js'
backendRouter.use('/post', postRouter)

import categoryRouter from './backend/category.js'
backendRouter.use('/category', categoryRouter)

import pageRouter from './backend/page.js'
backendRouter.use('/page', pageRouter)

import uploadRouter from './backend/upload.js'
backendRouter.use('/upload', uploadRouter)

import userRouter from './backend/user.js'
backendRouter.use('/user', userRouter)

import settingRouter from './backend/setting.js'
backendRouter.use('/setting', settingRouter)

import searchRouter from './backend/search.js'
backendRouter.use('/search', searchRouter)

export default backendRouter