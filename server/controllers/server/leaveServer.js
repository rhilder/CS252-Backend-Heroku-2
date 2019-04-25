const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const leaveServer = async (req, res) => {
    const {
        name,
        playerNumber
    } = req.body;

    const db = req.app.get('db');
    let errorMessage;

    let server = await db.servers.findOne({
        name,
    });
    if (!server) {
        errorMessage = 'Server doesn\'t exist.';
        return sendErrorResponse(res, errorMessage);
    }

    let serverPlayerCount = parseInt(server.playerCount, 10);
    const newPlayerCount=--serverPlayerCount;

    await db.servers.update(
        { name },
        { playerCount: newPlayerCount }
      );

      let game = await db.games.findOne({
        serverId: server.id
    });
    if (!game) {
        errorMessage = 'Game does not exist.';
        return sendErrorResponse(res, errorMessage);
    }

    let usePlayerNumber=parseInt(playerNumber,10);
    let newPlayersInGame=game.playersInGame;
    let realUsePlayerNumber = newPlayersInGame.indexOf(usePlayerNumber);
    newPlayersInGame.splice(realUsePlayerNumber,1);

    await db.games.update(
        { serverId: server.id },
        { playersInGame: newPlayersInGame }
    );

    await db.games.update(
        { serverId: server.id },
        { gameStarted: false }
    );
    
    return res.status(200).json({
        message: 'Server was successfully left.',
    });
}

export default leaveServer;