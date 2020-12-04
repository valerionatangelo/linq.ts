var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    exports.LinqNotEnoughElementsException = exports.LinqMoreThenOneElementException = exports.LinqNoElementsException = void 0;
    var LinqNoElementsException = /** @class */ (function (_super) {
        __extends(LinqNoElementsException, _super);
        function LinqNoElementsException() {
            return _super.call(this, "The iterable contains no elements") || this;
        }
        return LinqNoElementsException;
    }(Error));
    exports.LinqNoElementsException = LinqNoElementsException;
    var LinqMoreThenOneElementException = /** @class */ (function (_super) {
        __extends(LinqMoreThenOneElementException, _super);
        function LinqMoreThenOneElementException() {
            return _super.call(this, "The iterable contains more then one element") || this;
        }
        return LinqMoreThenOneElementException;
    }(Error));
    exports.LinqMoreThenOneElementException = LinqMoreThenOneElementException;
    var LinqNotEnoughElementsException = /** @class */ (function (_super) {
        __extends(LinqNotEnoughElementsException, _super);
        function LinqNotEnoughElementsException() {
            return _super.call(this, "The iterable does not contains enough elements") || this;
        }
        return LinqNotEnoughElementsException;
    }(Error));
    exports.LinqNotEnoughElementsException = LinqNotEnoughElementsException;
});
