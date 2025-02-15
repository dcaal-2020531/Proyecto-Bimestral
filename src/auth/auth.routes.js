import {Router} from 'express'
import{
    test,
    register,
    login
} from './auth.controller.js'

import { validateJwt } from '../../middlewares/validate.jwt.js'
import { loginValidator, registerValidator } from '../../helpers/validators.js'

const api = Router()

api.post('/register', [registerValidator], register)
api.post('/login',login)


api.get('/test',  test)


//Exportar
export default api