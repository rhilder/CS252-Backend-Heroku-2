exports.up = (pgm) => {
    pgm.createTable('games', {
        id: 'id',
        serverId: {
            type: 'id',
            notNull: true,
            references: 'servers(id)',
        },
        currentPlayerTurn:{
            type: 'int',
            notNull: true,
            default: 1
        },
        currentBet:{
            type: 'int',
            notNull: true,
            default: 0
        },
        playersBet:{
            type: 'int[]',
            notNull: true,
            default: [0]
        },
        roundStarted:{
            type: 'boolean',
            notNull: true,
            default: false
        },
        gameStarted:{
            type: 'boolean',
            notNull: true,
            default: false
        },
        playersInGame:{
            type: 'int[]',
            notNull: true,
            default: [0]
        },
        player1Roll:{
            type: 'int',
            notNull: true,
            default: 0
        },
        player2Roll:{
            type: 'int',
            notNull: true,
            default: 0
        },
        player3Roll:{
            type: 'int',
            notNull: true,
            default: 0
        },
        player1FirstRoll:{
            type: 'int',
            notNull: true,
            default: 0
        },
        player2FirstRoll:{
            type: 'int',
            notNull: true,
            default: 0
        },
        player3FirstRoll:{
            type: 'int',
            notNull: true,
            default: 0
        },
        numberPlayersBet:{
            type: 'int',
            notNull: true,
            default: 0
        },
        gameFinished:{
            type: 'boolean',
            notNull: true,
            default: false
        },
        gameWinner: {
            type: 'int',
            notNull: true,
            default: 0
        },
        numberPlayersOut:{
            type:'int',
            notNull:true,
            default:0
        },
        pot:{
            type:'int',
            notNull:true,
            default:0
        }
      });
};

exports.down = (pgm) => {
    pgm.dropTable('games');
};
