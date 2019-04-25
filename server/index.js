import '@babel/polyfill';
import massive from 'massive';
import router from './routes';
import getDbConfig from './dbconfig';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const port = process.env.PORT || 3001;
const app = express();

app.use(cors());

//show incoming requests
app.use(morgan('combined'));

app.use(express.json());

app.use('/api', router);

const dbConfig = getDbConfig();

massive(dbConfig).then((instance) => {
  console.log('Connected to db');
  app.set('db', instance);
  app.listen(port, () => {
    console.log('Server listening on port 3001');
  });
});

export default app;
