import { Request, Response, NextFunction } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made');
  next();
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Pssword</label>
          <input name="password" type='password' />
        </div>
        <button type='submit'>Submit</button>
    </form>  
  `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === 'yes@in.com' && password === 'pass') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid Email & password..');
    }
  }
}
