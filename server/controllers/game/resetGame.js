const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const resetGame = async (req,res) => {
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

      let newPlayersBet = [0];

      await db.games.update(
        { serverId: server.id },
        { playersBet: newPlayersBet }
      );

      await db.games.update(
        { serverId: server.id },
        { gameStarted: false }
      );

      await db.games.update(
        { serverId: server.id },
        { currentBet: 0 }
      );

      await db.games.update(
        { serverId: server.id },
        { player1Roll: 0 }
      );

      await db.games.update(
        { serverId: server.id },
        { player2Roll: 0 }
      );

      await db.games.update(
        { serverId: server.id },
        { player3Roll: 0 }
      );

      await db.games.update(
        { serverId: server.id },
        { player1FirstRoll: 0 }
      );

      await db.games.update(
        { serverId: server.id },
        { player2FirstRoll: 0 }
      );

      await db.games.update(
        { serverId: server.id },
        { player3FirstRoll: 0 }
      );

      await db.games.update(
        { serverId: server.id },
        { numberPlayersBet: 0 }
      );

      await db.games.update(
        { serverId: server.id },
        { roundStarted: false }
      );

      await db.games.update(
        { serverId: server.id },
        { gameFinished: false }
      );

      await db.games.update(
        { serverId: server.id },
        { pot: 0 }
      );

      await db.games.update(
        { serverId: server.id },
        { numberPlayersOut: 0 }
    );

      return res.status(200).json({
        message: 'Game Successfully reset.',
      });
}

export default resetGame;