const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const roll = async (req,res) => {
    const {
        serverName,
        playerNumber,
        roll,
        firstRoll,
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

      let playerNumberUse=parseInt(playerNumber,10);

    if(playerNumberUse===1){
        if(firstRoll===true){
            await db.games.update(
                { serverId: server.id },
                { player1FirstRoll: roll }
            );
        }
        await db.games.update(
            { serverId: server.id },
            { player1Roll: roll }
        );
        if(game.playersBet.includes(2)){
            await db.games.update(
                { serverId: server.id },
                { currentPlayerTurn: 2 }
            );
        }
        else{
            await db.games.update(
                { serverId: server.id },
                { currentPlayerTurn: 3 }
            );
        }
    }
    else if(playerNumberUse===2){
        if(firstRoll===true){
            await db.games.update(
                { serverId: server.id },
                { player2FirstRoll: roll }
            );
        }
        await db.games.update(
            { serverId: server.id },
            { player2Roll: roll }
        );
        if(game.playersBet.includes(3)){
            await db.games.update(
                { serverId: server.id },
                { currentPlayerTurn: 3 }
            );
        }
        else{
            await db.games.update(
                { serverId: server.id },
                { currentPlayerTurn: 1 }
            );
        }
    }
    else if(playerNumberUse===3){
        if(firstRoll===true){
            await db.games.update(
                { serverId: server.id },
                { player3FirstRoll: roll }
            );
        }
        await db.games.update(
            { serverId: server.id },
            { player3Roll: roll }
        );
        if(game.playersBet.includes(1)){
            await db.games.update(
                { serverId: server.id },
                { currentPlayerTurn: 1 }
            );
        }
        else{
            await db.games.update(
                { serverId: server.id },
                { currentPlayerTurn: 2 }
            );
        }
    }

    return res.status(200).json({
        message: 'Game roll successfully updated.',
      });
}

export default roll;