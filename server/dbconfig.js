const getDbConfig = () => {
    let dbConfig = {
      host: process.env.DB_HOST || 'ec2-54-243-197-120.compute-1.amazonaws.com',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_DATABASE || 'd4v1chttm3uh13',
      user: process.env.DB_USER || 'mxydluztjcvapm',
      password: process.env.DB_PASSWORD || 'c6629f27ae3a15fbab688dfe97898cea9f4a7fd922aa8c30c6a649fb2e58f9d3',
      poolSize: 3,
    };
    
    return dbConfig;
};
export default getDbConfig;