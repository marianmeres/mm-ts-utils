"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var find_1 = __importDefault(require("lodash/find"));
var BaseCollection = /** @class */ (function () {
    /**
     * @param {any[]} items
     */
    function BaseCollection(items) {
        this._items = [];
        if (items && !Array.isArray(items)) {
            throw new Error('Expecting array of items');
        }
        items && (this._items = items);
    }
    /**
     * @param index
     * @returns {any}
     */
    BaseCollection.prototype.at = function (index) {
        return this._items[index];
    };
    /**
     * @param item
     * @returns {number}
     */
    BaseCollection.prototype.indexOf = function (item) {
        return this._items.indexOf(item);
    };
    /**
     * Return an array of all the models in a collection that match the passed attributes.
     * Useful for simple cases of filter.
     * @returns {any[]}
     */
    BaseCollection.prototype.where = function (attributes) {
        var attrKeys = Object.keys(attributes);
        var isWhereMatch = function (item) {
            return attrKeys.length ===
                attrKeys.reduce(function (acc, key) { return (acc += item[key] === attributes[key] ? 1 : 0); }, 0);
        };
        return this._items.filter(isWhereMatch);
    };
    /**
     * Just like where, but directly returns only the first model in the collection
     * that matches the passed attributes.
     */
    BaseCollection.prototype.findWhere = function (attributes) {
        var attrKeys = Object.keys(attributes);
        var isWhereMatch = function (item) {
            return attrKeys.length ===
                attrKeys.reduce(function (acc, key) { return (acc += item[key] === attributes[key] ? 1 : 0); }, 0);
        };
        return find_1.default(this._items, isWhereMatch);
    };
    return BaseCollection;
}());
exports.default = BaseCollection;
