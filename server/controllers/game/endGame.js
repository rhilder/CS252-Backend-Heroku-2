const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const endGame = async (req,res) => {
    const {
        serverName,
        playerWon
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
        { currentPlayerTurn: playerWon }
      );

      await db.games.update(
        { serverId: server.id },
        { gameWinner: playerWon }
      );

      await db.games.update(
        { serverId: server.id },
        { gameFinished: true }
      );

      return res.status(200).json({
        message: 'Game Successfully ended.',
      });
}

export default endGame;