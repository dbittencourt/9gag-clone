import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import Container from 'typedi';
import PostsController from '@src/controllers/postsController';

const app = express();

//todo: add auth
//todo: add health checks
app.use(helmet());
app.use(cors());
// adds a limit to request payload, in case someone tries to add a massive image
app.use(bodyParser.json({ limit: '20mb' }));
// adds url encoded support
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

const controller = Container.get(PostsController);

app.use('/', controller.router);

export default app;
