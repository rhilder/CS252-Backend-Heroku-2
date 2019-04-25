const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const endGame = async (req,res) => {
    const {
        serverName,
        playerWon,
        username
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

      let user = await db.users.findOne({
        username,
      });

      if (!user) {
        errorMessage = 'Username does not exist.';
        return sendErrorResponse(res, errorMessage);
      };

      let oldMoney=user.money;
      let usePot=game.pot;
      let newMoney=oldMoney+usePot;

      await db.users.update(
        { username: username },
        { money: newMoney }
      );

      return res.status(200).json({
        message: 'Game Successfully ended.',
      });
}

export default endGame;