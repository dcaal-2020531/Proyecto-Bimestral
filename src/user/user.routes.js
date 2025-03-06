import {Router} from 'express'
import { getAll, updateUserProfile, deleteUserProfile } from './user.controller.js'
import { test } from '../auth/auth.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { validateAdmin } from '../../middlewares/validate.admin.js'
import { validatePassword } from '../../middlewares/validate.password.js'


const api = Router()

api.get('/',[validateJwt, validateAdmin],getAll)
api.put('/:userId', [validateJwt], updateUserProfile);
api.delete('/:userId',[validateJwt,validateAdmin,validatePassword],deleteUserProfile);


api.get('/test', test)


export default api