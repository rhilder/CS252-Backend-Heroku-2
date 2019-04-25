import createServer from './createServer';
import getServerList from './getServerList';
import joinServer from './joinServer';
import leaveServer from './leaveServer';
import resetPlayerCount from './resetPlayerCount';

const serverController = {};

serverController.createServer = createServer;
serverController.getServerList = getServerList;
serverController.joinServer = joinServer;
serverController.leaveServer = leaveServer;
serverController.resetPlayerCount = resetPlayerCount;

export default serverController;