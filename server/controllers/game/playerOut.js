const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const playerOut = async (req,res) => {
    const {
        serverName,
        playerNumber
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
        
        let newPlayersBet=game.playersBet;
        let indexOfPlayer=newPlayersBet.indexOf(1);
        newPlayersBet.splice(indexOfPlayer,1);
        
        await db.games.update(
            { serverId: server.id },
            { playersBet: newPlayersBet }
        );
    }
    else if(playerNumberUse===2){
        
        let newPlayersBet=game.playersBet;
        let indexOfPlayer=newPlayersBet.indexOf(2);
        newPlayersBet.splice(indexOfPlayer,1);

        await db.games.update(
            { serverId: server.id },
            { playersBet: newPlayersBet }
        );
    }
    else if(playerNumberUse===3){

        let newPlayersBet=game.playersBet;
        let indexOfPlayer=newPlayersBet.indexOf(3);
        newPlayersBet.splice(indexOfPlayer,1);

        await db.games.update(
            { serverId: server.id },
            { playersBet: newPlayersBet }
        );
    }

    let oldPlayersOut=game.numberPlayersOut;
    let newPlayersOut=++oldPlayersOut;
    await db.games.update(
        { serverId: server.id },
        { numberPlayersOut: newPlayersOut }
    );

    return res.status(200).json({
        message: 'Player successfully out.',
      });
}

export default playerOut;