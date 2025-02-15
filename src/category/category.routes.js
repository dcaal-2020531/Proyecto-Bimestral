import {Router} from 'express'
import { getAll, save,updateCategory, deleteCategory } from './category.controller.js'
import { test } from '../auth/auth.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'


const api = Router()

api.get('/',[validateJwt],getAll)
api.post('/',[validateJwt], save)
api.put('/:categoryId',[validateJwt],updateCategory)
api.delete('/:categoryId',[validateJwt],deleteCategory)
api.get('/test', test)
export default api