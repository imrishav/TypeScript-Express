import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MethdatKeys } from './MetadataKey';
import { RequestHandler, Request, Response, NextFunction } from 'express';

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid Request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid Request');
        return;
      }
    }

    next();
  };
}

export function controller(prefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MethdatKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        MethdatKeys.method,
        target.prototype,
        key
      );
      //we can use Methods enum to show ts that we have these properties defined for the router, please use from them
      //Hence line no 20 error is gone

      const middlewares =
        Reflect.getMetadata(MethdatKeys.middleware, target.prototype, key) ||
        [];

      //For mIddlewares

      const requiredBody =
        Reflect.getMetadata(MethdatKeys.validator, target.prototype, key) || [];

      const validator = bodyValidators(requiredBody);
      if (path) {
        router[method](
          `${prefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
