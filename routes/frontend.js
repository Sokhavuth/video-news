//routes/frontend.js

import express from 'express'
const frontendRouter = express.Router()

import frontRouter from './frontend/home.js'
frontendRouter.use('/', frontRouter)

import postRouter from './frontend/post.js'
frontendRouter.use('/post', postRouter)

import categoryRouter from './frontend/category.js'
frontendRouter.use('/category', categoryRouter)

import pageRouter from './frontend/page.js'
frontendRouter.use('/page', pageRouter)

import userRouter from './frontend/user.js'
frontendRouter.use('/user', userRouter)

import searchRouter from './frontend/search.js'
frontendRouter.use('/search', searchRouter)

export default frontendRouter