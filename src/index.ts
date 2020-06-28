import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookie from 'cookie-session';
import './controllers/LoginController';
import { AppRouter } from './AppRouter';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie({ keys: ['abcd'] }));

app.use(router);
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('Listening ');
});
