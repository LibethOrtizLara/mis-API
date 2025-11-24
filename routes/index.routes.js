import computadoras from './computadoras.routes.js';
import { Router } from 'express';

const indexRoutes = Router();

indexRoutes.use('/computadoras', computadoras);

export default indexRoutes;