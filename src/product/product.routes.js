import {Router} from 'express'
import { getAll, save, updateProducts, deleteProduct } from './product.controller.js'
import { test } from '../auth/auth.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { validateAdmin } from '../../middlewares/validate.admin.js'


const api = Router()

api.get('/',[validateJwt,validateAdmin],getAll)
api.post('/',[validateJwt,validateAdmin], save)
api.put('/:productId',[validateJwt,validateAdmin],updateProducts)
api.delete('/:productId',[validateJwt,validateAdmin],deleteProduct)
api.get('/test', test)
export default api