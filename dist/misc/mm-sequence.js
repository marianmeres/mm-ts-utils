"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmSequence = (function () {
    var _counters = {};
    return function (prefix) {
        var _prefix = "_" + prefix;
        var seq = {
            reset: function () {
                delete _counters[_prefix];
                return seq;
            },
            current: function () {
                _counters[_prefix] = _counters[_prefix] || 0;
                return prefix
                    ? "" + prefix + _counters[_prefix]
                    : _counters[_prefix];
            },
            next: function () {
                _counters[_prefix] = _counters[_prefix] || 0;
                var i = ++_counters[_prefix];
                return prefix ? "" + prefix + i : i;
            },
        };
        return seq;
    };
})();
