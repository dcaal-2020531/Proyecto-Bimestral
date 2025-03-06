import {Router} from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { getAll, getById, save } from './bill.controller.js'


const api = Router()

api.post('/',[validateJwt],save)
api.get('/',[validateJwt], getAll)
api.get('/:billId',[validateJwt], getById)
export default api