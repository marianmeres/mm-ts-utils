// https://www.typescriptlang.org/docs/handbook/mixins.html
export const mmApplyMixins = (derivedCtor, baseCtors) => {
    baseCtors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
};
