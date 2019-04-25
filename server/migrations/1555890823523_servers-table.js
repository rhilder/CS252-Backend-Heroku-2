exports.up = (pgm) => {
    pgm.createTable('servers', {
        id: 'id',
        name: {
          type: 'varchar(100)',
          notNull: true
        },
        minBuyin: {
          type: 'int',
          notNull: true
        },
        maxBuyin: {
          type: 'int',
          notNull: true
        },
        playerCount: {
            type: 'int',
            notNull: true,
            default: 0
        }
      });
};

exports.down = (pgm) => {
    pgm.dropTable('servers');
};
