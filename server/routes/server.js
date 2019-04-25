import asyncHandler from '../middlewares/asyncHandler';
import express from 'express';
import serverController from '../controllers/server';

const server = express.Router();

server.post('/createServer', asyncHandler(serverController.createServer));
server.get('/getServerList', asyncHandler(serverController.getServerList));
server.patch('/joinServer', asyncHandler(serverController.joinServer));
server.patch('/leaveServer', asyncHandler(serverController.leaveServer));
server.patch('/resetPlayerCount', asyncHandler(serverController.resetPlayerCount));

export default server;