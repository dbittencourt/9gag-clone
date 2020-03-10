import express from 'express';
import bodyParser from 'body-parser';
import { SERVER_PORT } from './config';

const server = express();
server.use(bodyParser.json());

server.listen(SERVER_PORT, () => {
    console.log(`app running on port ${SERVER_PORT}`);
});
