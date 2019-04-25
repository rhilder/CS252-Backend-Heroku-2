const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const createGame = async (req, res) => {
    const {
        serverId
      } = req.body;

      let errorMessage;

      const db = req.app.get('db');

      let server = await db.servers.findOne({
        id: serverId,
      });
      if (!server) {
        errorMessage = 'Server does not exist.';
        return sendErrorResponse(res, errorMessage);
      }

      server = await db.games.save({
        serverId
      });

      return res.status(200).json({
        message: 'Game was successfully created.'
      });
};

export default createGame;