import asyncHandler from '../middlewares/asyncHandler';
import express from 'express';
import gameController from '../controllers/game';

const game = express.Router();

game.post('/createGame', asyncHandler(gameController.createGame));
game.get('/getGameState', asyncHandler(gameController.getGameState));
game.patch('/playerBet', asyncHandler(gameController.playerBet));
game.patch('/startGame', asyncHandler(gameController.startGame));
game.patch('/endGame', asyncHandler(gameController.endGame));
game.patch('/resetGame', asyncHandler(gameController.resetGame));
game.patch('/roll', asyncHandler(gameController.roll));
game.patch('/out', asyncHandler(gameController.playerOut))

export default game;