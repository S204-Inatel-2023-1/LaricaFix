import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const { SERVER_PORT = 3000 } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`Server listening at http://localhost:${SERVER_PORT}`);
});
