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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MMDateFormatter = void 0;
var mm_is_valid_date_1 = require("./mm-is-valid-date");
var mm_escape_regex_1 = require("../string/mm-escape-regex");
var MMDateFormatter = /** @class */ (function () {
    /**
     * @param _date
     * @param locale
     */
    function MMDateFormatter(_date, locale) {
        if (locale === void 0) { locale = 'en'; }
        this._date = _date;
        this.locale = locale;
        this._date = this._date || new Date();
    }
    Object.defineProperty(MMDateFormatter.prototype, "date", {
        /**
         *
         */
        get: function () {
            return this._date;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param mask
     * @param utc
     * @param i18n
     */
    MMDateFormatter.prototype.format = function (mask, utc, i18n) {
        if (utc === void 0) { utc = false; }
        return MMDateFormatter.format(this.date, mask, this.locale, utc, i18n);
    };
    /**
     * @param date
     * @param mask
     * @param locale
     * @param utc
     * @param i18n
     */
    MMDateFormatter.format = function (date, mask, locale, utc, i18n) {
        if (locale === void 0) { locale = 'en'; }
        if (utc === void 0) { utc = false; }
        if (!mm_is_valid_date_1.mmIsValidDate(date)) {
            throw new Error("Invalid date " + date);
        }
        if (!MMDateFormatter.i18n[locale]) {
            console.error("Invalid locale " + locale);
            locale = 'en';
            // throw new Error(`Invalid locale ${locale}`);
        }
        if (!mask || typeof mask !== 'string') {
            return date.toISOString();
        }
        var pad = function (val, len) {
            if (len === void 0) { len = 2; }
            val = "" + val;
            while (val.length < len) {
                val = "0" + val;
            }
            return val;
        };
        var _ = utc ? 'getUTC' : 'get';
        var _Date = date[_ + 'Date']();
        var Day = date[_ + 'Day']();
        var Month = date[_ + 'Month']();
        var FullYear = date[_ + 'FullYear']();
        var Hours = date[_ + 'Hours']();
        var Minutes = date[_ + 'Minutes']();
        var Seconds = date[_ + 'Seconds']();
        var Milliseconds = date[_ + 'Milliseconds']();
        var TZOffset = utc ? 0 : date.getTimezoneOffset();
        var _i18n = function (k) {
            var t = __assign(__assign({}, (MMDateFormatter.i18n[locale] || {})), (i18n || {}));
            return t[k] || {};
        };
        var ZZ = function () {
            return (TZOffset > 0 ? '-' : '+') +
                pad(Math.floor(Math.abs(TZOffset) / 60) * 100 + (Math.abs(TZOffset) % 60), 4);
        };
        var replaceMap = {
            // YY	18	Two-digit year
            YY: function () { return ("" + FullYear).slice(2); },
            // YYYY	2018	Four-digit year
            YYYY: function () { return FullYear; },
            // M	1-12	The month, beginning at 1
            M: function () { return Month + 1; },
            // MM	01-12	The month, 2-digits
            MM: function () { return pad(Month + 1); },
            // MMM	Jan-Dec	The abbreviated month name
            MMM: function () { return _i18n('shortMonthNames')[Month]; },
            // MMMM	January-December	The full month name
            MMMM: function () { return _i18n('longMonthNames')[Month]; },
            // D	1-31	The day of the month
            D: function () { return _Date; },
            // DD	01-31	The day of the month, 2-digits
            DD: function () { return pad(_Date); },
            // d	0-6	The day of the week, with Sunday as 0
            d: function () { return Day; },
            //     dd	Su-Sa	The min name of the day of the week
            dd: function () { return (_i18n('shortDayNames')[Day] || '').substr(0, 2); },
            // ddd	Sun-Sat	The short name of the day of the week
            ddd: function () { return _i18n('shortDayNames')[Day] || ''; },
            // dddd	Sunday-Saturday	The name of the day of the week
            dddd: function () { return _i18n('longDayNames')[Day] || ''; },
            // H	0-23	The hour
            H: function () { return Hours; },
            // HH	00-23	The hour, 2-digits
            HH: function () { return pad(Hours); },
            // h	1-12	The hour, 12-hour clock
            h: function () { return Hours % 12 || 12; },
            // hh	01-12	The hour, 12-hour clock, 2-digits
            hh: function () { return pad(Hours % 12 || 12); },
            // m	0-59	The minute
            m: function () { return Minutes; },
            // mm	00-59	The minute, 2-digits
            mm: function () { return pad(Minutes); },
            // s	0-59	The second
            s: function () { return Seconds; },
            // ss	00-59	The second, 2-digits
            ss: function () { return pad(Seconds); },
            // SSS	000-999	The millisecond, 3-digits
            SSS: function () { return pad(Milliseconds, 3); },
            // A	AM PM
            A: function () { return (Hours < 12 ? 'AM' : 'PM'); },
            // a	am pm
            a: function () { return (Hours < 12 ? 'am' : 'pm'); },
            // Z	+5:00	The offset from UTC
            Z: function () {
                var _ZZ = ZZ();
                return [
                    _ZZ.substr(0, 1),
                    _ZZ.substr(1, 2).replace(/^0+/, ''),
                    ':',
                    _ZZ.substr(3, 2),
                ].join('');
            },
            // ZZ	+0500	The offset from UTC, 2-digits
            ZZ: ZZ,
            // unix milliseconds
            x: function () { return Milliseconds; },
            // unix seconds
            X: function () { return Math.round(Milliseconds / 1000); },
        };
        var patterns = [];
        var keys = Object.keys(replaceMap);
        keys.sort().reverse(); // sort desc, hm...
        keys.forEach(function (k) { return patterns.push(mm_escape_regex_1.mmEscapeRegExp(k)); });
        var rgx = new RegExp(patterns.join('|'), 'g');
        return mask.replace(rgx, function ($0) {
            return $0 in replaceMap ? replaceMap[$0]() : '';
        });
    };
    /**
     * @param delta (in seconds)
     * @private
     */
    MMDateFormatter._diff = function (delta) {
        var SEC_PER_DAY = 86400; // 60 * 60 * 24;
        //
        var seconds = delta % 60;
        var minutes = Math.floor(delta / 60);
        var hours = Math.floor(delta / 3600);
        //
        var days = Math.floor(delta / SEC_PER_DAY);
        var months = Math.floor(days / 30);
        var years = Math.floor(days / 365);
        var out = function (type, value) { return ({
            type: type,
            value: value,
            details: { delta: delta, years: years, months: months, days: days, hours: hours, minutes: minutes, seconds: seconds },
        }); };
        var min2sec = function (_min) { return _min * 60; };
        var hours2sec = function (_hours) { return _hours * 60 * 60; };
        var days2sec = function (_days) { return _days * SEC_PER_DAY; };
        var months2sec = function (_months) { return days2sec(_months * 30); };
        // https://github.com/iamkun/dayjs/blob/master/docs/en/Plugin.md#relativetime
        // 18 months+	yy	2 years ago ... 20 years ago
        if (delta >= months2sec(18)) {
            return out('yy', Math.max(2, years));
        }
        // 11 months to 17 months	y	a year ago
        else if (delta >= months2sec(11)) {
            return out('y', 1);
        }
        // 46 days to 10 months	MM	2 months ago ... 10 months ago
        else if (delta >= days2sec(46)) {
            return out('MM', Math.max(2, months));
        }
        // 26 to 45 days	M	a month ago
        else if (delta >= days2sec(26)) {
            return out('M', 1);
        }
        // 36 hours to 25 days	dd	2 days ago ... 25 days ago
        else if (delta >= hours2sec(36)) {
            return out('dd', Math.max(2, days));
        }
        // 22 to 35 hours	d	a day ago
        else if (delta >= hours2sec(22)) {
            return out('d', 1);
        }
        // 90 minutes to 21 hours	hh	2 hours ago ... 21 hours ago
        else if (delta >= min2sec(90)) {
            return out('hh', Math.max(2, hours));
        }
        // 45 to 89 minutes	h	an hour ago
        else if (delta >= min2sec(45)) {
            return out('h', 1);
        }
        // 90 seconds to 44 minutes	mm	2 minutes ago ... 44 minutes ago
        else if (delta >= 90) {
            return out('mm', Math.max(2, minutes));
        }
        // 45 to 89 seconds	m	a minute ago
        else if (delta >= 45) {
            return out('m', 1);
        }
        // 0 to 44 seconds	s	a few seconds ago
        return out('s', seconds);
    };
    /**
     * @param date
     * @param locale
     */
    MMDateFormatter.fromNow = function (date, locale) {
        if (locale === void 0) { locale = 'en'; }
        return MMDateFormatter.from(date, new Date(), locale);
    };
    /**
     * @param date
     * @param compareTo
     * @param locale
     * @param i18n
     */
    MMDateFormatter.from = function (date, compareTo, locale, i18n) {
        if (locale === void 0) { locale = 'en'; }
        if (!mm_is_valid_date_1.mmIsValidDate(date)) {
            throw new Error("Invalid 'date' date");
        }
        if (!mm_is_valid_date_1.mmIsValidDate(compareTo)) {
            throw new Error("Invalid 'compareTo' date");
        }
        if (!MMDateFormatter.i18n[locale]) {
            // throw new Error(`Invalid locale ${locale}`);
            console.error("Invalid locale " + locale);
            locale = 'en';
        }
        var deltaSeconds = Math.round(Math.abs(date.valueOf() - compareTo.valueOf()) / 1000);
        var res = MMDateFormatter._diff(deltaSeconds);
        var isPast = date < compareTo;
        var _i18n = function (k, _val, _isPast) {
            var t = __assign(__assign({}, ((MMDateFormatter.i18n[locale] || {}).relative || {})), (i18n || {}));
            return t[k] ? t[k](_val, _isPast) : k + "," + _val + "," + _isPast;
        };
        return __assign(__assign({}, res), { isPast: isPast, isFuture: !isPast, localized: _i18n(res.type, res.value, isPast) });
    };
    // prettier-ignore
    MMDateFormatter.i18n = {
        en: {
            shortDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            longDayNames: [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
            ],
            shortMonthNames: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ],
            longMonthNames: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December',
            ],
            relative: {
                yy: function (v, isPast) { return isPast ? v + " years ago" : "in " + v + " years"; },
                y: function (v, isPast) { return isPast ? "a year ago" : "in a year"; },
                MM: function (v, isPast) { return isPast ? v + " months ago" : "in " + v + " months"; },
                M: function (v, isPast) { return isPast ? "a month ago" : "in a month"; },
                dd: function (v, isPast) { return isPast ? v + " days ago" : "in " + v + " days"; },
                d: function (v, isPast) { return isPast ? "a day ago" : "in a day"; },
                hh: function (v, isPast) { return isPast ? v + " hours ago" : "in " + v + " hours"; },
                h: function (v, isPast) { return isPast ? "an hour ago" : "in an hour"; },
                mm: function (v, isPast) { return isPast ? v + " minutes ago" : "in " + v + " minutes"; },
                m: function (v, isPast) { return isPast ? "a minute ago" : "in a minute"; },
                s: function (v, isPast) { return isPast ? "a few seconds ago" : "in a few seconds"; },
            }
        },
        sk: {
            shortDayNames: ['Ned', 'Pon', 'Uto', 'Str', 'Štv', 'Pia', 'Sob'],
            longDayNames: [
                'Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota',
            ],
            shortMonthNames: [
                'Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún',
                'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec',
            ],
            longMonthNames: [
                'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún',
                'Júl', 'August', 'September', 'Október', 'November', 'December',
            ],
            relative: {
                yy: function (v, isPast) { return isPast ? "pred " + v + " rokmi" : "za " + v + " rok" + (v < 5 ? 'y' : 'ov'); },
                y: function (v, isPast) { return isPast ? "pred rokom" : "za rok"; },
                MM: function (v, isPast) { return isPast ? "pred " + v + " mesiacmi" : "za " + v + " mesiac" + (v < 5 ? 'e' : 'ov'); },
                M: function (v, isPast) { return isPast ? "pred mesiacom" : "za mesiac"; },
                dd: function (v, isPast) { return isPast ? "pred " + v + " d\u0148ami" : "za " + v + " dn" + (v < 5 ? 'i' : 'í'); },
                d: function (v, isPast) { return isPast ? "v\u010Dera" : "zajtra"; },
                hh: function (v, isPast) { return isPast ? "pred " + v + " hodinami" : "za " + v + " hod" + (v < 5 ? 'iny' : 'ín'); },
                h: function (v, isPast) { return isPast ? "pred hodinou" : "za hodinu"; },
                mm: function (v, isPast) { return isPast ? "pred " + v + " min\u00FAtami" : "za " + v + " min\u00FAt" + (v < 5 ? 'y' : ''); },
                m: function (v, isPast) { return isPast ? "pred min\u00FAtou" : "za min\u00FAtu"; },
                s: function (v, isPast) { return isPast ? "pred p\u00E1r sekundami" : "za p\u00E1r sek\u00FAnd"; },
            }
        },
        cs: {
            shortDayNames: ['Ned', 'Pon', 'Úte', 'Stř', 'Čtv', 'Pát', 'Sob'],
            longDayNames: [
                'Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota',
            ],
            shortMonthNames: [
                'Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čer',
                'Červ', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro',
            ],
            longMonthNames: [
                'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
                'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec',
            ],
            relative: {
                yy: function (v, isPast) { return isPast ? "p\u0159ed " + v + " roky" : "za " + v + " rok" + (v < 5 ? 'y' : 'ů'); },
                y: function (v, isPast) { return isPast ? "p\u0159ed rokem" : "za rok"; },
                MM: function (v, isPast) { return isPast ? "p\u0159ed " + v + " m\u011Bs\u00EDci" : "za " + v + " m\u011Bs\u00EDc" + (v < 5 ? 'e' : 'ů'); },
                M: function (v, isPast) { return isPast ? "p\u0159ed m\u011Bs\u00EDcem" : "za m\u011Bs\u00EDc"; },
                dd: function (v, isPast) { return isPast ? "p\u0159ed " + v + " dny" : "za " + v + " dn" + (v < 5 ? 'y' : 'í'); },
                d: function (v, isPast) { return isPast ? "v\u010Dera" : "z\u00EDtra"; },
                hh: function (v, isPast) { return isPast ? "p\u0159ed " + v + " hodinami" : "za " + v + " hod" + (v < 5 ? 'iny' : 'in'); },
                h: function (v, isPast) { return isPast ? "p\u0159ed hodinou" : "za hodinu"; },
                mm: function (v, isPast) { return isPast ? "p\u0159ed " + v + " minutami" : "za " + v + " minut" + (v < 5 ? 'y' : ''); },
                m: function (v, isPast) { return isPast ? "p\u0159ed minutou" : "za minutu"; },
                s: function (v, isPast) { return isPast ? "p\u0159ed p\u00E1r sekundami" : "za p\u00E1r sekund"; },
            }
        },
    };
    return MMDateFormatter;
}());
exports.MMDateFormatter = MMDateFormatter;
