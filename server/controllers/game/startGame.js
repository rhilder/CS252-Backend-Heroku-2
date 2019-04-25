const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const startGame = async (req,res) => {
    const {
        serverName
      } = req.body;

      const db = req.app.get('db');

      let errorMessage;

      let server = await db.servers.findOne({
        name: serverName,
      });
      if (!server) {
        errorMessage = 'Server does not exist.';
        return sendErrorResponse(res, errorMessage);
      }

      let game = await db.games.findOne({
          serverId: server.id
      });
      if (!game) {
        errorMessage = 'Game does not exist.';
        return sendErrorResponse(res, errorMessage);
      }

      await db.games.update(
        { serverId: server.id },
        { roundStarted: true }
      );

      return res.status(200).json({
        message: 'Game Successfully started.',
      });
}

export default startGame;