import {Router} from 'express'
import { getAll, save, updateProducts, deleteProduct, outOfStock, getByName, orderBySales, getByCategory } from './product.controller.js'
import { test } from '../auth/auth.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { validateAdmin } from '../../middlewares/validate.admin.js'


const api = Router()

api.get('/',[validateJwt,validateAdmin],getAll)
api.post('/',[validateJwt,validateAdmin], save)
api.put('/:productId',[validateJwt,validateAdmin],updateProducts)
api.delete('/:productId',[validateJwt,validateAdmin],deleteProduct)
api.get('/test', test)
api.get('/outOfStock', outOfStock)
api.get('/orderBySales', orderBySales)
api.get('/:category', getByCategory)
api.get('/:name', getByName)


export default api