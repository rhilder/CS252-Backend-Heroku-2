import express from 'express';
import user from './user';
import server from './server';
import game from './game';

const router = express.Router();
router.use('/user', user);
router.use('/server',server);
router.use('/game',game);

export default router;