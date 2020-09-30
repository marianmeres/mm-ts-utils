"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmApplyMixins = void 0;
// https://www.typescriptlang.org/docs/handbook/mixins.html
exports.mmApplyMixins = function (derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
};
