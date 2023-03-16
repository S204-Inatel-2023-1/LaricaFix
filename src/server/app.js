import path from 'path';
import express from 'express';
import router from './routes/router.js';

const app = express();

app.use(express.json());
app.use('/api', router);

app.use(express.static('dist/client'));

app.get('*', (_req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist/client/index.html'));
});

export default app;