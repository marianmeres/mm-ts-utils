"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Nothing fancy, just basic calculations.
 */
var MmPaginator = /** @class */ (function () {
    function MmPaginator(itemsTotal, itemsPerPage, currentPage) {
        if (itemsPerPage === void 0) { itemsPerPage = 10; }
        if (currentPage === void 0) { currentPage = 1; }
        this._itemsPerPage = 10;
        this._currentPage = 1;
        this.itemsTotal = itemsTotal;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = currentPage;
    }
    Object.defineProperty(MmPaginator.prototype, "itemsTotal", {
        get: function () {
            return this._itemsTotal;
        },
        set: function (v) {
            this._itemsTotal = this._assertNumber(v, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MmPaginator.prototype, "itemsPerPage", {
        get: function () {
            return this._itemsPerPage;
        },
        set: function (v) {
            this._itemsPerPage = Math.max(1, this._assertNumber(v));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MmPaginator.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        set: function (v) {
            this._currentPage = Math.max(1, this._assertNumber(v));
        },
        enumerable: true,
        configurable: true
    });
    MmPaginator.prototype._assertNumber = function (val, fallback) {
        if (fallback === void 0) { fallback = 1; }
        val = parseInt(val, 10);
        return Number.isNaN(val) ? fallback : val;
    };
    Object.defineProperty(MmPaginator.prototype, "pageCount", {
        get: function () {
            return Math.ceil(this.itemsTotal / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns interval from (exclusive) - to (inclusive); Offset is considered
     * as postgres does: OFFSET says to skip that many rows before beginning to return rows.
     *
     * @param {number} page
     * @param {boolean} noInterval
     */
    MmPaginator.prototype.getOffsetByPage = function (page, noInterval) {
        if (page === void 0) { page = null; }
        if (noInterval === void 0) { noInterval = true; }
        page = page === null ? this.currentPage : this._assertNumber(page, 1);
        var out = [
            Math.max(this.itemsPerPage * (page - 1), 0),
            Math.min(this.itemsTotal, this.itemsPerPage * page),
        ];
        return noInterval ? out[0] : out;
    };
    MmPaginator.prototype.getPageByOffset = function (offset) {
        offset = this._assertNumber(offset, 0);
        // moze byt aj zaporny, vtedy odratavam s total items
        if (offset < 0) {
            offset = Math.max(0, this.itemsTotal + offset);
        }
        // OFFSET says to skip that many rows before beginning to return rows.
        offset++;
        return Math.max(Math.ceil(offset / this.itemsPerPage), 1);
    };
    Object.defineProperty(MmPaginator.prototype, "offset", {
        get: function () {
            return this.getOffsetByPage(null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MmPaginator.prototype, "limit", {
        get: function () {
            return this.itemsPerPage;
        },
        enumerable: true,
        configurable: true
    });
    MmPaginator.prototype.isOutOfBounds = function (page) {
        if (page === void 0) { page = null; }
        page = page === null ? this.currentPage : this._assertNumber(page, 0);
        // lebo page 0 neexistuje, tak max(..., 1)
        return this.pageCount > 0 && this.pageCount < page;
    };
    MmPaginator.prototype.getNextPage = function (page) {
        if (page === void 0) { page = null; }
        page = page === null ? this.currentPage : this._assertNumber(page, 1);
        var n = page + 1;
        return this.pageCount >= n ? n : false;
    };
    Object.defineProperty(MmPaginator.prototype, "nextPage", {
        get: function () {
            return this.getNextPage(null);
        },
        enumerable: true,
        configurable: true
    });
    MmPaginator.prototype.getPreviousPage = function (page) {
        if (page === void 0) { page = null; }
        page = page === null ? this.currentPage : this._assertNumber(page, 1);
        var p = Math.max(0, Math.min(page - 1, this.pageCount - 1));
        return p !== 0 ? p : false;
    };
    Object.defineProperty(MmPaginator.prototype, "previousPage", {
        get: function () {
            return this.getPreviousPage(null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MmPaginator.prototype, "lastPage", {
        get: function () {
            return this.pageCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MmPaginator.prototype, "firstPage", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    MmPaginator.prototype.isLastPage = function (page) {
        if (page === void 0) { page = null; }
        page = page === null ? this.currentPage : this._assertNumber(page, 1);
        return page === this.pageCount;
    };
    MmPaginator.prototype.isFirstPage = function (page) {
        if (page === void 0) { page = null; }
        page = page === null ? this.currentPage : this._assertNumber(page, 1);
        return page === 1;
    };
    MmPaginator.prototype.dump = function () {
        return {
            itemsTotal: this.itemsTotal,
            itemsPerPage: this.itemsPerPage,
            currentPage: this.currentPage,
            pageCount: this.pageCount,
            offsetByPage: this.getOffsetByPage(),
            isOutOfBound: this.isOutOfBounds(),
            nextPage: this.getNextPage(),
            previousPage: this.getPreviousPage(),
            isLastPage: this.isLastPage(),
            isFirstPage: this.isFirstPage(),
        };
    };
    return MmPaginator;
}());
exports.MmPaginator = MmPaginator;
