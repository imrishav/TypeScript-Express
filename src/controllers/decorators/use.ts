import 'reflect-metadata';
import { MethdatKeys } from './MetadataKey';
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MethdatKeys.middleware, target, key) || [];

    middlewares.push(middleware);

    Reflect.defineMetadata(MethdatKeys.middleware, middlewares, target, key);
  };
}
