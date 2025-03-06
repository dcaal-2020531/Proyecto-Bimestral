import { Router } from 'express';
import { save} from './shopingCart.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js'; // Para verificar que el usuario esté autenticado

const api = Router();

// Ruta para guardar o actualizar un carrito
api.post('/save', validateJwt, save);

export default api;
