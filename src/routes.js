import { Router } from 'express';

import sessionController from './app/controllers/SessionController';
import recipientController from './app/controllers/RecipientController';
import userControleller from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';

const router = new Router();

router.get('/', (req, res) => {
  res.json({ message: 'ola Mundo' });
});

// cria a sessão de login
router.post('/session', sessionController.store);

// middleware que realiza autenticação so passa se o usuario for admin
router.use(authMiddleware);
// cadastro de usuarios
router.post('/user', userControleller.store);

// cadastro de studantes
router.post('/recipient', recipientController.store);
// Atualiza usuario
router.put('/recipient', recipientController.update);

export default router;
