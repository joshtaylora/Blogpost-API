import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { userRouter } from './routes/UserRouter';

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// tell express to use the UserRouter for all /Users/ routes
app.use('/Users', userRouter);
// app.use('/Posts', postRouter);

app.get('/', (req, res, next) => {
    console.log(req.url);
    res.sendFile(path.join(process.cwd(), 'views', 'index.html'));
});