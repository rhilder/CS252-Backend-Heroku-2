const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const playerBet = async (req,res) => {
    const {
        username,
        playerNumber,
        serverName,
        bet,
      } = req.body;

      const db = req.app.get('db');

      let errorMessage;
      
      let user = await db.users.findOne({
        username,
      });
      if (!user) {
        errorMessage = 'User does not exist.';
        return sendErrorResponse(res, errorMessage);
      }

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

      let newPlayersBet=game.playersBet;
      newPlayersBet.push(playerNumber);

      let oldMoney=user.money; 
      const userBet = parseInt(bet, 10);
      let newMoney=oldMoney-userBet;

      let oldNumPlayersBet=game.numberPlayersBet;
      let newNumPlayersBet=++oldNumPlayersBet;

      await db.games.update(
        { serverId: server.id },
        { numberPlayersBet: newNumPlayersBet }
      );

      await db.users.update(
        { username },
        { money: newMoney }
      );
      
      if(userBet>0){
        await db.games.update(
          { serverId: server.id },
          { playersBet: newPlayersBet }
        );
      

      await db.games.update(
        { serverId: server.id },
        { currentBet: bet }
      );

      }
      else{
        let oldPlayersOut=game.numberPlayersOut;
        let newPlayersOut=++oldPlayersOut;
        await db.games.update(
          { serverId: server.id },
          { numberPlayersOut: newPlayersOut }
        );
      }

      let oldPot=game.pot;
      let newPot=oldPot+userBet;

      await db.games.update(
        { serverId: server.id },
        { pot: newPot }
      );

      return res.status(200).json({
        message: 'Player successfully bet.',
      });
}

export default playerBet;