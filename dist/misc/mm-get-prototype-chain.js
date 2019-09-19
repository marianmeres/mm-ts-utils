"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isPlainObject_1 = __importDefault(require("lodash-es/isPlainObject"));
// import { isPlainObject } from 'lodash';
/**
 * hm...q
 * @param obj
 * @returns {any}
 */
exports.mmGetPrototypeChain = function (obj) {
    if (obj === null) {
        return null;
    }
    if (typeof obj !== 'object') {
        return null;
    }
    var proto = Object.getPrototypeOf(obj);
    var out = [];
    while (!isPlainObject_1.default(proto)) {
        out.push(proto);
        proto = Object.getPrototypeOf(proto);
    }
    return out.length ? out : null;
};
