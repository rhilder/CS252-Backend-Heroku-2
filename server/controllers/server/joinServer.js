const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const joinServer = async (req, res) => {
    const {
        name
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
    const newPlayerCount=++serverPlayerCount;

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

    let newPlayersInGame=game.playersInGame;
    let useNewPlayerCount;
    if(game.playersInGame.includes(2)&&game.playersInGame.includes(3)){
        newPlayersInGame.push(1);
        useNewPlayerCount=1;
    }
    else if(game.playersInGame.includes(1)&&game.playersInGame.includes(3)){
        newPlayersInGame.push(2);
        useNewPlayerCount=2;
    }
    else if(game.playersInGame.includes(3)&&!game.playersInGame.includes(1)){
        newPlayersInGame.push(1);
        useNewPlayerCount=1;
    }
    else if(game.playersInGame.includes(2)&&!game.playersInGame.includes(1)){
        newPlayersInGame.push(1);
        useNewPlayerCount=1;
    }
    else{
        newPlayersInGame.push(newPlayerCount);
        useNewPlayerCount=newPlayerCount;
    }

    newPlayersInGame.sort();

    await db.games.update(
        { serverId: server.id },
        { playersInGame: newPlayersInGame }
    );
    
    return res.status(200).json({
        message: 'Server was successfully joined.',
        data: {
            minBuyin: server.minBuyin,
            maxBuyin: server.maxBuyin,
            playerCount: useNewPlayerCount
        }
    });
}

export default joinServer;