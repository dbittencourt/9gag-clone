import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { SERVER_PORT } from './config';

const server = express();

//todo: add auth
server.use(cors());
server.use(bodyParser.json());

server.listen(SERVER_PORT, () => {
    console.log(`app running on port ${SERVER_PORT}`);
});
