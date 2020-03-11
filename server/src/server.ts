import 'reflect-metadata';
import { SERVER_PORT, MONGO_CONFIG } from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './loaders/app';

//todo: move mongoose config out of here
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_CONFIG, { useNewUrlParser: true, useFindAndModify: false });

app.listen(SERVER_PORT, () => {
    console.log(`app running on port ${SERVER_PORT}`);
});
