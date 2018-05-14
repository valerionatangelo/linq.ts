// / //<reference path="Linq2.d.ts" >
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
    declare global {
        interface Array<T> {
            aasLinq() : LinqIterable<T>;
        }
    }
    
    Array.prototype.aasLinq = function() {
        return new LinqIterable(this);
    }
    */
    var LinqIterable = /** @class */ (function () {
        function LinqIterable(source) {
            var _this = this;
            this.source = source;
            this.toArray = function () { return Array.from(_this); };
            this.where = function (predicate) { return new LinqWhereIterable(_this.source, predicate); };
            this.select = function (selector) { return new LinqSelectIterable(_this.source, selector); };
            this.ofType = function (type) { return new LinqOfTypeIterable(_this.source, type); };
            this.cast = function () { return new LinqCastIterable(_this.source); };
        }
        LinqIterable.prototype[Symbol.iterator] = function () {
            return this.source[Symbol.iterator]();
        };
        /* public static initialize() {
             Array.prototype.asLinq = function() {
                 return new LinqIterable(this);
             }
         }*/
        LinqIterable.foreach = function (iterable, action) {
            var iterator = iterable[Symbol.iterator]();
            /*
                    do {
                        iterator.
                    }*/
        };
        return LinqIterable;
    }());
    exports.LinqIterable = LinqIterable;
    var LinqCastIterable = /** @class */ (function (_super) {
        __extends(LinqCastIterable, _super);
        function LinqCastIterable(source) {
            return _super.call(this, LinqCastIterable.algo(source)) || this;
        }
        LinqCastIterable.algo = function (source) {
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry.value];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        };
        return LinqCastIterable;
    }(LinqIterable));
    exports.LinqCastIterable = LinqCastIterable;
    var LinqOfTypeIterable = /** @class */ (function (_super) {
        __extends(LinqOfTypeIterable, _super);
        function LinqOfTypeIterable(source, type) {
            return _super.call(this, LinqOfTypeIterable.algo(source, type)) || this;
        }
        LinqOfTypeIterable.algo = function (source, type) {
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 4];
                        if (!(entry.value instanceof type)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry.value];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        };
        return LinqOfTypeIterable;
    }(LinqIterable));
    exports.LinqOfTypeIterable = LinqOfTypeIterable;
    var LinqSelectIterable = /** @class */ (function (_super) {
        __extends(LinqSelectIterable, _super);
        function LinqSelectIterable(source, selector) {
            return _super.call(this, LinqSelectIterable.algo(source, selector)) || this;
        }
        LinqSelectIterable.algo = function (source, selector) {
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, selector(entry.value)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        };
        return LinqSelectIterable;
    }(LinqIterable));
    exports.LinqSelectIterable = LinqSelectIterable;
    var LinqWhereIterable = /** @class */ (function (_super) {
        __extends(LinqWhereIterable, _super);
        function LinqWhereIterable(source, predicate) {
            return _super.call(this, LinqWhereIterable.algo(source, predicate)) || this;
        }
        LinqWhereIterable.algo = function (source, predicate) {
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 4];
                        if (!predicate(entry.value)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry.value];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        };
        return LinqWhereIterable;
    }(LinqIterable));
    exports.LinqWhereIterable = LinqWhereIterable;
});
