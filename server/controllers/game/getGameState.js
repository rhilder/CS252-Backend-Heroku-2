const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const getGameStatus = async (req, res) => {
    const {
        serverName
      } = req.query;
      console.log(serverName);

      let errorMessage;

      const db = req.app.get('db');

      let server = await db.servers.findOne({
        name: serverName,
      });
      if (!server) {
        errorMessage = 'Server does not exist.';
        return sendErrorResponse(res, errorMessage);
      }

      let game= await db.games.findOne({
          serverId: server.id
      });
      if (!game) {
        errorMessage = 'Game does not exist.';
        return sendErrorResponse(res, errorMessage);
      }

      if(game.playersInGame.includes(1)&&game.playersInGame.includes(2)&&game.playersInGame.includes(3)){
        await db.games.update(
          { serverId: server.id },
          { gameStarted: true }
        );
      }

      if(game.numberPlayersBet===3){
        await db.games.update(
          { serverId: server.id },
          { roundStarted: true }
        );
      }

      return res.status(200).json({
        message: 'Game status successfully retrieved.',
        data: game
      });
};

export default getGameStatus;