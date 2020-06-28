import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requiredAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send('Not Permitted');
}

const router = Router();

router.get('/', (req: RequestWithBody, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href='/logout'>Logut</a>
      </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are Not logged in</div>
      <a href='/login'>Login</a>
    </div>
  `);
  }
});

router.get('/logout', (req: RequestWithBody, res: Response) => {
  req.session = null;
  res.redirect('/');
});

router.get(
  '/protected',
  requiredAuth,
  (req: RequestWithBody, res: Response) => {
    res.send('Welecome to To protectedRoute ');
  }
);

export { router };
