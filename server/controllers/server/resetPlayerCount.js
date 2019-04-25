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

    await db.servers.update(
        { name },
        { playerCount: 0 }
      );

    return res.status(200).json({
        message: 'Server players reset.',
    });
}

export default joinServer;