"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual_1 = __importDefault(require("lodash-es/isEqual"));
var isPlainObject_1 = __importDefault(require("lodash-es/isPlainObject"));
var mm_get_prototype_chain_1 = require("../misc/mm-get-prototype-chain");
var isString = function (v) { return typeof v === 'string'; };
/**
 *
 */
var BaseModel = /** @class */ (function () {
    /**
     * @param data
     * @param {boolean} forceDirty
     */
    function BaseModel(data, forceDirty) {
        if (forceDirty === void 0) { forceDirty = false; }
        /**
         * @type {Array}
         * @private
         */
        this._dirtyKeys = [];
        if (data && typeof data.toJSON === 'function') {
            data = data.toJSON();
        }
        this._data = Object.assign({}, this._defaults); // dolezity uvodny init...
        this.populate(Object.assign({}, this._defaults, data || {})); // populate via setters
        this.resetDirty();
        if (forceDirty) {
            this.markDirty();
        }
    }
    /**
     * @param data
     * @returns {BaseModel}
     */
    BaseModel.prototype.populate = function (data) {
        var _this = this;
        if (data) {
            // allow whitelisted only
            Object.keys(this._defaults).forEach(function (k) {
                if (data[k] !== void 0) {
                    _this.set(k, data[k]);
                }
            });
        }
        return this;
    };
    BaseModel.prototype.populateRelationships = function (rels) {
        //
    };
    Object.defineProperty(BaseModel.prototype, "id", {
        // get id() {  throw new Error('Method id() must be overidden in extended models');}
        // get/set id je default
        get: function () {
            return this._get('id');
        },
        set: function (v) {
            this._set('id', v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseModel.prototype, "_defaults", {
        /**
         * @private
         */
        get: function () {
            // throw new Error('Method _defaults must be overidden in extended models');
            return BaseModel.defaults();
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    BaseModel.prototype.toJSON = function () {
        var _this = this;
        return Object.keys(this._data).reduce(function (out, k) {
            out[k] = _this.get(k);
            return out;
        }, {});
    };
    /**
     * defaultne to iste co `toJSON` akurat povolujeme custom override pre special case-y
     * (serializovanie non-primitivov do DB)
     */
    BaseModel.prototype.toJSONSerialized = function () {
        var json = this.toJSON();
        // NEW FEATURE: all plain object values are serialized/stringified
        // automatically (handly for JSONB types)
        return Object.keys(json).reduce(function (memo, k) {
            if (isPlainObject_1.default(json[k])) {
                memo[k] = BaseModel.JSONStringify(json[k]);
            }
            else {
                memo[k] = json[k];
            }
            return memo;
        }, {});
        // return json;
    };
    /**
     * "over the wire" attributes filter hook
     * @param options
     * @param options
     * @private
     */
    BaseModel.prototype._toJSONApiAttributes = function (options) {
        if (options === void 0) { options = null; }
        return this.toJSON();
    };
    /**
     * @param options
     * @returns {null}
     * @private
     */
    BaseModel.prototype._toJSONApiRelationships = function (options) {
        if (options === void 0) { options = null; }
        return null;
    };
    /**
     * http://jsonapi.org/format/
     */
    BaseModel.prototype.toJSONApi = function (options) {
        if (options === void 0) { options = null; }
        var out = {
            type: this.entityType,
            id: this.id,
            attributes: this._toJSONApiAttributes(options),
        };
        var relationships = this._toJSONApiRelationships(options);
        if (relationships) {
            Object.assign(out, { relationships: relationships });
        }
        return out;
    };
    /**
     * @param k
     * @returns {PropertyDescriptor | boolean}
     * @private
     */
    BaseModel.prototype._hasSetterFor = function (k) {
        var chain = mm_get_prototype_chain_1.mmGetPrototypeChain(this);
        if (Array.isArray(chain)) {
            return chain.some(function (proto) {
                var desc = Object.getOwnPropertyDescriptor(proto, k);
                return desc && !!desc.set;
            });
        }
        return false;
    };
    /**
     * @param k
     * @returns {PropertyDescriptor | boolean}
     * @private
     */
    BaseModel.prototype._hasGetterFor = function (k) {
        var chain = mm_get_prototype_chain_1.mmGetPrototypeChain(this);
        if (Array.isArray(chain)) {
            return chain.some(function (proto) {
                var desc = Object.getOwnPropertyDescriptor(proto, k);
                return desc && !!desc.get;
            });
        }
        return false;
    };
    /**
     * general "safe" public setter (rozdielna funkcionalita od low level `_set`)
     * @param k
     * @param v
     * @returns {BaseModel}
     */
    BaseModel.prototype.set = function (k, v) {
        var oldRawValue = this._data[k];
        // IMPORTANT: prefer setter if exists
        this._hasSetterFor(k) ? (this[k] = v) : (this._data[k] = v);
        this._maybeMarkKeyDirty(k, oldRawValue);
        return this;
    };
    /**
     * @param k
     * @returns {any}
     */
    BaseModel.prototype.get = function (k) {
        // CONVENTION: prefer getter if exists (WARN: doesn't handle potential name colision)
        return this._hasGetterFor(k) ? this[k] : this._data[k];
    };
    /**
     * wrapper on top od _data, called by setters
     * @param k
     * @param v
     * @returns {this}
     * @private
     */
    BaseModel.prototype._set = function (k, v) {
        var oldRawValue = this._data[k];
        this._data[k] = v;
        this._maybeMarkKeyDirty(k, oldRawValue);
        return this;
    };
    /**
     * wrapper on top of _data, called by getters
     * @param k
     * @param defaultValue
     * @param withToJSON
     * @private
     */
    BaseModel.prototype._get = function (k, defaultValue, withToJSON) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (withToJSON === void 0) { withToJSON = false; }
        var out = this._data[k] === null ? defaultValue : this._data[k];
        if (withToJSON && out && !out.toJSON) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
            // ...If the value has a toJSON() method, it's responsible to define
            // what data will be serialized...
            return __assign(__assign({}, out), { toJSON: function () { return JSON.stringify(out); } });
        }
        return out;
    };
    /**
     * DRY
     * @param k
     * @param oldRawValue
     * @returns {this}
     * @private
     */
    BaseModel.prototype._maybeMarkKeyDirty = function (k, oldRawValue) {
        var newRawValue = this._data[k];
        // if (oldRawValue !== newRawValue && -1 === this._dirtyKeys.indexOf(k)) {
        if (!isEqual_1.default(oldRawValue, newRawValue) && -1 === this._dirtyKeys.indexOf(k)) {
            this._dirtyKeys.push(k);
        }
        return this;
    };
    /**
     * @returns {BaseModel}
     */
    BaseModel.prototype.resetDirty = function () {
        this._dirtyKeys = [];
        return this;
    };
    /**
     * @returns {BaseModel}
     */
    BaseModel.prototype.markDirty = function () {
        var _this = this;
        this.resetDirty();
        Object.keys(this._data).forEach(function (k) { return _this._dirtyKeys.push(k); });
        return this;
    };
    /**
     * @returns {number}
     */
    BaseModel.prototype.isDirty = function () {
        return this._dirtyKeys.length;
    };
    Object.defineProperty(BaseModel.prototype, "dirtyKeys", {
        /**
         * @returns {Array}
         */
        get: function () {
            return this._dirtyKeys;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param k
     * @returns {boolean}
     */
    BaseModel.prototype.keyExists = function (k) {
        return this._data[k] !== void 0;
    };
    /**
     * helper
     * @param v
     * @private
     */
    BaseModel.prototype._maybeUnserialize = function (v) {
        if (isString(v)) {
            try {
                v = JSON.parse(v);
            }
            catch (e) {
                v = {
                    __unserialize_error__: e.toString(),
                    __raw_value__: v,
                };
            }
        }
        return v;
    };
    /**
     * @returns {BaseModelData}
     */
    BaseModel.defaults = function () {
        // throw new Error('Method defaults must be overidden in extended models');
        return {
            id: null,
        };
    };
    /**
     * Convention (db reasons mainly) - do not serialize empty values...
     * @param val
     * @constructor
     */
    BaseModel.JSONStringify = function (val) {
        var isEmptyObject = function (obj) {
            return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
        };
        val = JSON.stringify(val);
        if (val === void 0 || val === 'null' /*|| val === '{}' || isEmptyObject(val)*/) {
            val = null;
        }
        return val;
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
