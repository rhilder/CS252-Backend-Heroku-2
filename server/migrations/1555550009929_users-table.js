exports.up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        username: {
          type: 'varchar(100)',
          notNull: true
        },
        password: {
          type: 'varchar(100)'
        },
        firstName: {
          type: 'varchar(50)',
          notNull: true
        },
        lastName: {
          type: 'varchar(50)'
        },
        email: {
          type: 'varchar(100)',
          notNull: true
        },
        money: {
          type: 'int',
          default: 100
        }
      });
};

exports.down = (pgm) => {
    pgm.dropTable('users');
};
