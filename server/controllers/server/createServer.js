const sendErrorResponse = (res, errorMessage) => res.status(400).json({
    message: errorMessage,
  });

const createServer = async (req, res) => {
    const {
        name,
        minBuyin,
        maxBuyin
      } = req.body;
      console.log(name);

      let errorMessage;

      const db = req.app.get('db');

      let server = await db.servers.findOne({
        name,
      });
      if (server) {
        errorMessage = 'Server name in use.';
        return sendErrorResponse(res, errorMessage);
      }

      const maxBuyIn = parseInt(maxBuyin, 10);
      const minBuyIn = parseInt(minBuyin, 10);

      if(maxBuyIn<minBuyIn){
        errorMessage = 'Maximum buyin is less than minimum buy in.';
        return sendErrorResponse(res, errorMessage);
      }

      server = await db.servers.save({
        name,
        minBuyin,
        maxBuyin
      });

      return res.status(200).json({
        message: 'Server was successfully created'
      });
};

export default createServer;