const getServerList = async (req, res) => {
    const db = req.app.get('db');
    const data = await db.servers.find();
    return res.json({
        message: 'Get server list successful.',
        data,
    });
};

export default getServerList;