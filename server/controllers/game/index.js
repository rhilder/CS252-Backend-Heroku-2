import createGame from './createGame';
import getGameState from './getGameState'
import playerBet from './playerBet';
import startGame from './startGame';
import endGame from './endGame';
import resetGame from './resetGame';
import roll from './roll';
import playerOut from './playerOut'

const gameController = {};

gameController.createGame = createGame;
gameController.getGameState = getGameState;
gameController.playerBet = playerBet;
gameController.startGame = startGame;
gameController.endGame = endGame;
gameController.resetGame = resetGame;
gameController.roll = roll;
gameController.playerOut = playerOut;

export default gameController;