import 'reflect-metadata';
import { MethdatKeys } from './MetadataKey';

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MethdatKeys.validator, keys, target, key);
  };
}
