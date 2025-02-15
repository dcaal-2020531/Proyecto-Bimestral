import {Router} from 'express'
import { getAll, updateUserProfile, deleteUserProfile } from './user.controller.js'
import { test } from '../auth/auth.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { validateAdmin } from '../../middlewares/validate.admin.js'


const api = Router()

api.get('/',[validateJwt, validateAdmin],getAll)
api.put('/:userId', [validateJwt,validateAdmin], updateUserProfile);
api.delete('/:userId',[validateJwt,validateAdmin],deleteUserProfile);


api.get('/test', test)


export default api