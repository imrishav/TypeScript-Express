"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKey_1 = require("./MetadataKey");
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid Request');
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send('Invalid Request');
                return;
            }
        }
        next();
    };
}
function controller(prefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKey_1.MethdatKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKey_1.MethdatKeys.method, target.prototype, key);
            //we can use Methods enum to show ts that we have these properties defined for the router, please use from them
            //Hence line no 20 error is gone
            var middlewares = Reflect.getMetadata(MetadataKey_1.MethdatKeys.middleware, target.prototype, key) ||
                [];
            //For mIddlewares
            var requiredBody = Reflect.getMetadata(MetadataKey_1.MethdatKeys.validator, target.prototype, key) || [];
            var validator = bodyValidators(requiredBody);
            if (path) {
                router[method].apply(router, __spreadArrays(["" + prefix + path], middlewares, [validator,
                    routeHandler]));
            }
        }
    };
}
exports.controller = controller;
