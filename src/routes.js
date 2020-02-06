import { Router } from 'express';
import multer from 'multer';

import sessionController from './app/controllers/SessionController';
import recipientController from './app/controllers/RecipientController';
import userControleller from './app/controllers/UserController';
import deliverymanController from './app/controllers/DeliverymanController';
import fileController from './app/controllers/FileController';
/**
 * imports de configuraçao
 */
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const router = new Router();
const upload = multer(multerConfig);

router.get('/', (req, res) => {
  res.json({ message: 'ola Mundo' });
});

// cria a sessão de login
router.post('/session', sessionController.store);

// middleware que realiza autenticação so passa se o usuario for admin
router.use(authMiddleware);
// cadastro de usuarios
router.post('/user', userControleller.store);

// cadastro de destinatarios
router.post('/recipient', recipientController.store);
// Atualiza destinatarios
router.put('/recipient', recipientController.update);

/**
 * rotas para tratar eventos dos Entregadores
 */
router.post('/deliveryman', deliverymanController.store);
router.get('/deliveryman', deliverymanController.index);
router.put('/deliveryman/:id', deliverymanController.update);
router.delete('/deliveryman/:id', deliverymanController.delete);

/**
 * Rotas de Files
 */
router.post('/file', upload.single('file'), fileController.store);

export default router;
