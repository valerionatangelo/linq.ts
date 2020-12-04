/*

aggregate(): fatto con 2 overload
all(): fatto
any(): fatto con due overload
average(): fatto con due overload
cast<T>() fatto
concat(): fatto
contains(): fatto
count(): fatto
distinct(): fatto (da ottimizzare forse)
elementAt(): fatto
elementAtOrUndefined(): fatto
except(): fatto
first(): fatto con due overload
firstOrUndefined: fatto con due overload
forEach(): fatto
groupBy(): fatto con due overload
groupJoin(): fatto
intersect(): fatto
join(): fatto
last(): fatto
lastOrUndefined(): fatto
max(): fatto con due overload
min(): fatto con due overload
ofType(): fatto
orderBy(): fatto
orderByDescending(): fatto
reverse() : fatto
select(): fatto
selectMany(): fatto (manca un overload)
sequenceEquals(): fatto
single(): fatto con due overload
singleOrUndefined(): fatto con due overload
skip(): fatto
skipWhile(): fatto
sum(): fatto con due overload
take(): fatto
takeWhile(): fatto
thenBy(): fatto
thenByDescending(): fatto
toArray(): fatto
toObject(): fatto
toList(): fatto
undefinedIfEmpty(): fatto
union(): fatto
where(): fatto


In più fatto:
- Array<T>.asLinq()
- List<T>


*/
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./linq-exceptions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinqGrouping = exports.List = exports.LinqUndefinedIfEmptyIterable = exports.LinqOrderByIterable = exports.LinqWhereIterable = exports.LinqSelectIterable = exports.LinqOfTypeIterable = exports.LinqCastIterable = exports.LinqSkipWhileIterable = exports.LinqSkipIterable = exports.LinqTakeWhileIterable = exports.LinqTakeIterable = exports.LinqReverseIterable = exports.LinqConcatIterable = exports.LinqGroupJoinIterable = exports.LinqJoinIterable = exports.LinqSelectManyIterable = exports.LinqGroupByIterable = exports.KeyValuePair = exports.LinqIterableProxy = exports.LinqIterableBase = exports.Linq = void 0;
    var Exceptions = require("./linq-exceptions");
    Array.prototype.asLinq = function () {
        return new LinqIterableProxy(this);
    };
    String.prototype.asLinq = function () {
        return new LinqIterableProxy(this);
    };
    Set.prototype.asLinq = function () {
        return new LinqIterableProxy(this);
    };
    Map.prototype.asLinq = function () {
        return (new LinqIterableProxy(this)).select(function (x) { return new KeyValuePair(x[0], x[1]); });
    };
    var Linq = /** @class */ (function () {
        function Linq() {
        }
        Linq.fromObject = function (source) {
            return Object.keys(source).asLinq().select(function (k) { return new KeyValuePair(k, source[k]); });
        };
        Linq.fromArray = function (source) {
            return new LinqIterableProxy(source);
        };
        Linq.fromString = function (source) {
            return new LinqIterableProxy(source);
        };
        Linq.fromSet = function (source) {
            return new LinqIterableProxy(source);
        };
        Linq.fromMap = function (source) {
            return (new LinqIterableProxy(source)).select(function (x) { return new KeyValuePair(x[0], x[1]); });
        };
        return Linq;
    }());
    exports.Linq = Linq;
    var LinqIterableBase = /** @class */ (function () {
        function LinqIterableBase() {
            var _this = this;
            this.foreach = function (action) {
                var e_1, _a;
                var iterable = _this;
                try {
                    for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                        var entry = iterable_1_1.value;
                        action(entry);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                /*let iterator = iterable[Symbol.iterator]();
                let entry: IteratorResult<T>;
                while ((entry = iterator.next()).done == false)
                    action(entry.value);*/
            };
            this.first = function (predicate) {
                var iterable = _this;
                if (predicate)
                    iterable = iterable.where(predicate);
                var iterator = iterable[Symbol.iterator]();
                var entry = iterator.next();
                if (entry.done == true)
                    throw new Exceptions.LinqNoElementsException();
                return entry.value;
            };
            this.firstOrUndefined = function (predicate) {
                var iterable = _this;
                if (predicate)
                    iterable = iterable.where(predicate);
                var iterator = iterable[Symbol.iterator]();
                var entry = iterator.next();
                if (entry.done == true)
                    return undefined;
                return entry.value;
            };
            this.single = function (predicate) {
                var iterable = _this;
                if (predicate)
                    iterable = iterable.where(predicate);
                var iterator = iterable[Symbol.iterator]();
                var firstEntry = iterator.next();
                if (firstEntry.done == true)
                    throw new Exceptions.LinqNoElementsException();
                var secondEntry = iterator.next();
                if (secondEntry.done == true)
                    return firstEntry.value;
                throw new Exceptions.LinqMoreThenOneElementException();
            };
            this.singleOrUndefined = function (predicate) {
                var iterable = _this;
                if (predicate)
                    iterable = iterable.where(predicate);
                var iterator = iterable[Symbol.iterator]();
                var firstEntry = iterator.next();
                if (firstEntry.done == true)
                    return undefined;
                var secondEntry = iterator.next();
                if (secondEntry.done == true)
                    return firstEntry.value;
                throw new Exceptions.LinqMoreThenOneElementException();
            };
            this.elementAt = function (position) {
                var e_2, _a;
                var iterable = _this;
                // OPTIMIZATION FOR ARRAY AND LIST
                if (iterable instanceof LinqIterableProxy || iterable instanceof List) {
                    var source = iterable._source; // private property
                    if (source instanceof Array) {
                        if (position > source.length - 1)
                            throw new Exceptions.LinqNotEnoughElementsException();
                        else
                            return source[position];
                    }
                }
                if (position < 0)
                    return undefined; // exception??
                if (position > 0)
                    iterable = iterable.skip(position);
                try {
                    for (var iterable_2 = __values(iterable), iterable_2_1 = iterable_2.next(); !iterable_2_1.done; iterable_2_1 = iterable_2.next()) {
                        var entry = iterable_2_1.value;
                        return entry;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (iterable_2_1 && !iterable_2_1.done && (_a = iterable_2.return)) _a.call(iterable_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                throw new Exceptions.LinqNotEnoughElementsException();
                /*
                let iterator = iterable[Symbol.iterator]();
                let entry: IteratorResult<T>;
                while ((entry = iterator.next()).done == false)
                    if (position-- == 0)
                        return entry.value;
        
                throw new Exceptions.LinqNotEnoughElementsException();
                */
            };
            this.elementAtOrUndefined = function (position) {
                var iterable = _this;
                // OPTIMIZATION FOR ARRAY AND LIST
                if (iterable instanceof LinqIterableProxy || iterable instanceof List) {
                    var source = iterable._source; // private property
                    if (source instanceof Array) {
                        if (position > source.length - 1)
                            return undefined;
                        else
                            return source[position];
                    }
                }
                if (position < 0)
                    return undefined; // exception??
                if (position > 0)
                    iterable = iterable.skip(position);
                return iterable.firstOrUndefined();
                /*
                let iterator = iterable[Symbol.iterator]();
                let entry: IteratorResult<T>;
                while ((entry = iterator.next()).done == false)
                    if (position-- == 0)
                        return entry.value;
        
                return undefined;*/
            };
            this.last = function () {
                var e_3, _a;
                var iterable = _this;
                // OPTIMIZATION FOR ARRAY AND LIST
                if (iterable instanceof LinqIterableProxy || iterable instanceof List) {
                    var source = iterable._source; // private property
                    if (source instanceof Array) {
                        if (source.length == 0)
                            throw new Exceptions.LinqNoElementsException();
                        else
                            return source[source.length - 1];
                    }
                }
                var lastValue = undefined;
                var count = 0;
                try {
                    for (var iterable_3 = __values(iterable), iterable_3_1 = iterable_3.next(); !iterable_3_1.done; iterable_3_1 = iterable_3.next()) {
                        var entry = iterable_3_1.value;
                        count++;
                        lastValue = entry;
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (iterable_3_1 && !iterable_3_1.done && (_a = iterable_3.return)) _a.call(iterable_3);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                if (count == 0)
                    throw new Exceptions.LinqNoElementsException();
                return lastValue;
                /*
                let iterator = iterable[Symbol.iterator]();
                let firstEntry = iterator.next();
                let lastValue : T;
        
                if (firstEntry.done == true)
                    throw new Exceptions.LinqNoElementsException();
        
                lastValue = firstEntry.value;
        
                let entry: IteratorResult<T>;
                
                while ((entry = iterator.next()).done == false)
                    lastValue = entry.value;
        
                return lastValue;*/
            };
            this.lastOrUndefined = function () {
                var e_4, _a;
                var iterable = _this;
                // OPTIMIZATION FOR ARRAY AND LIST
                if (iterable instanceof LinqIterableProxy || iterable instanceof List) {
                    var source = iterable._source; // private property
                    if (source instanceof Array) {
                        if (source.length == 0)
                            return undefined;
                        else
                            return source[source.length - 1];
                    }
                }
                var lastValue = undefined;
                try {
                    for (var iterable_4 = __values(iterable), iterable_4_1 = iterable_4.next(); !iterable_4_1.done; iterable_4_1 = iterable_4.next()) {
                        var entry = iterable_4_1.value;
                        lastValue = entry;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (iterable_4_1 && !iterable_4_1.done && (_a = iterable_4.return)) _a.call(iterable_4);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return lastValue;
                /*
                let iterator = iterable[Symbol.iterator]();
                let firstEntry = iterator.next();
                let lastValue : T;
        
                if (firstEntry.done == true)
                    return undefined;
        
                lastValue = firstEntry.value;
        
                let entry: IteratorResult<T>;
                
                while ((entry = iterator.next()).done == false)
                    lastValue = entry.value;
        
                return lastValue;*/
            };
            this.undefinedIfEmpty = function () { return new LinqUndefinedIfEmptyIterable(_this); };
            this.sequenceEquals = function (otherIterable) {
                var iterable1 = _this;
                var iterator1 = iterable1[Symbol.iterator]();
                var entry1;
                var iterable2 = new LinqIterableProxy(otherIterable);
                var iterator2 = iterable2[Symbol.iterator]();
                var entry2;
                do {
                    entry1 = iterator1.next();
                    entry2 = iterator2.next();
                    if (entry1.done != entry2.done)
                        return false;
                    if (entry1.done && entry2.done)
                        return true;
                    if (!LinqIterableBase.equals(entry1.value, entry2.value))
                        return false;
                } while (true);
            };
            this.aggregate = function (accumulatorFunc, initialAccumulator) {
                var e_5, _a;
                var currAcc;
                if (initialAccumulator !== undefined)
                    currAcc = initialAccumulator;
                var iterable = _this;
                try {
                    for (var iterable_5 = __values(iterable), iterable_5_1 = iterable_5.next(); !iterable_5_1.done; iterable_5_1 = iterable_5.next()) {
                        var entry = iterable_5_1.value;
                        currAcc = accumulatorFunc(currAcc, entry);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (iterable_5_1 && !iterable_5_1.done && (_a = iterable_5.return)) _a.call(iterable_5);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                return currAcc;
                /*
                let iterator = iterable[Symbol.iterator]();
        
                let entry: IteratorResult<T> = iterator.next();
        
                if (initialAccumulator === undefined)
                {
                    if (entry.done)
                        return undefined;
                    else
                        currAcc = entry.value;
                }
        
                else
                {
                    if (entry.done == false)
                        currAcc = accumulatorFunc(initialAccumulator, entry.value);
                }
        
        
                
        
        
                while ((entry = iterator.next()).done == false)
                    currAcc = accumulatorFunc(currAcc, entry.value);
        
                return currAcc;*/
            };
            //public toArray = () : T[] => Array.from(this);
            this.toArray = function () {
                var e_6, _a;
                var result = [];
                var iterable = _this;
                try {
                    for (var iterable_6 = __values(iterable), iterable_6_1 = iterable_6.next(); !iterable_6_1.done; iterable_6_1 = iterable_6.next()) {
                        var entry = iterable_6_1.value;
                        result.push(entry);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (iterable_6_1 && !iterable_6_1.done && (_a = iterable_6.return)) _a.call(iterable_6);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                /*let iterator = iterable[Symbol.iterator]();
                let entry: IteratorResult<T>;
                
                while ((entry = iterator.next()).done == false)
                    result.push(entry.value);*/
                return result;
            };
            this.toObject = function (keySelector, valueSelector) {
                var e_7, _a;
                var result = {};
                var iterable = _this;
                try {
                    for (var iterable_7 = __values(iterable), iterable_7_1 = iterable_7.next(); !iterable_7_1.done; iterable_7_1 = iterable_7.next()) {
                        var entry = iterable_7_1.value;
                        result[keySelector(entry)] = valueSelector(entry);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (iterable_7_1 && !iterable_7_1.done && (_a = iterable_7.return)) _a.call(iterable_7);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                /*let iterator = iterable[Symbol.iterator]();
                let entry: IteratorResult<T>;
                
                while ((entry = iterator.next()).done == false)
                    (result as any)[keySelector(entry.value)] = valueSelector(entry.value);*/
                return result;
            };
            this.toList = function () {
                return new List(_this);
            };
            this.where = function (predicate) { return new LinqWhereIterable(_this, predicate); };
            this.select = function (selector) { return new LinqSelectIterable(_this, selector); };
            this.ofType = function (type) { return new LinqOfTypeIterable(_this, type); };
            this.cast = function () { return new LinqCastIterable(_this); };
            this.take = function (count) { return new LinqTakeIterable(_this, count); };
            this.takeWhile = function (predicate) { return new LinqTakeWhileIterable(_this, predicate); };
            this.skip = function (count) { return new LinqSkipIterable(_this, count); };
            this.skipWhile = function (predicate) { return new LinqSkipWhileIterable(_this, predicate); };
            this.orderBy = function (keySelector) { return new LinqOrderByIterable(_this, LinqIterableBase.keyComparer(keySelector, false)); };
            this.orderByDescending = function (keySelector) { return new LinqOrderByIterable(_this, LinqIterableBase.keyComparer(keySelector, true)); };
            this.reverse = function () { return new LinqReverseIterable(_this); };
            this.selectMany = function (selector, finalSelector) { return new LinqSelectManyIterable(_this, selector, finalSelector); };
            this.join = function (rightIterable, leftKeySelector, rightKeySelector, finalSelector) { return new LinqJoinIterable(_this, rightIterable, leftKeySelector, rightKeySelector, finalSelector); };
            this.groupJoin = function (rightIterable, leftKeySelector, rightKeySelector, finalSelector) { return new LinqGroupJoinIterable(_this, rightIterable, leftKeySelector, rightKeySelector, finalSelector); };
            this.concat = function (otherIterable) { return new LinqConcatIterable(_this, otherIterable); };
            this.union = function (otherIterable) { return (new LinqConcatIterable(_this, otherIterable)).distinct(); };
            this.intersect = function (otherIterable) { return _this.where(function (x) { return (new LinqIterableProxy(otherIterable).contains(x)); }); };
            this.except = function (otherIterable) { return _this.where(function (x) { return !(new LinqIterableProxy(otherIterable).contains(x)); }); };
            this.groupBy = function (keySelector, valueSelector) {
                if (!valueSelector)
                    valueSelector = function (x) { return x; };
                return new LinqGroupByIterable(_this, keySelector, valueSelector);
            };
            this.any = function (predicate) {
                var e_8, _a;
                var iterable = _this;
                if (predicate === undefined)
                    predicate = function (x) { return true; };
                try {
                    for (var iterable_8 = __values(iterable), iterable_8_1 = iterable_8.next(); !iterable_8_1.done; iterable_8_1 = iterable_8.next()) {
                        var entry = iterable_8_1.value;
                        if (predicate(entry))
                            return true;
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (iterable_8_1 && !iterable_8_1.done && (_a = iterable_8.return)) _a.call(iterable_8);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                return false;
                /*
                let iterator = iterable[Symbol.iterator]();
                let entry: IteratorResult<T>;
                
                while ((entry = iterator.next()).done == false)
                    if (predicate(entry.value))
                        return true;*/
            };
            this.all = function (predicate) { return !_this.any(function (x) { return !predicate(x); }); };
            this.contains = function (element) { return _this.any(function (x) { return LinqIterableBase.equals(x, element); }); };
            this.sum = function (selector) {
                var e_9, _a;
                var iterable = _this;
                if (selector === undefined)
                    selector = function (x) { return x; };
                var result = 0;
                try {
                    for (var iterable_9 = __values(iterable), iterable_9_1 = iterable_9.next(); !iterable_9_1.done; iterable_9_1 = iterable_9.next()) {
                        var entry = iterable_9_1.value;
                        var n = selector(entry);
                        if (n !== undefined)
                            result += n;
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (iterable_9_1 && !iterable_9_1.done && (_a = iterable_9.return)) _a.call(iterable_9);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
                /*
            let iterator = iterable[Symbol.iterator]();
               let entry: IteratorResult<T>;
               while ((entry = iterator.next()).done == false)
                   result += selector(entry.value);
                */
                return result;
            };
            this.min = function (selector) {
                var iterable = _this;
                if (selector === undefined)
                    selector = function (x) { return x; };
                var result = undefined;
                for (var entry in iterable) {
                    var n = selector(entry); // compiler bug
                    if (result === undefined || result > n)
                        result = n;
                }
                /*
                let iterator = iterable[Symbol.iterator]();
                let entry: IteratorResult<T>;
                while ((entry = iterator.next()).done == false)
                    {
                        let n = selector(entry.value);
                        if (result === undefined || result > n)
                            result = n;
                    }*/
                return result;
            };
            this.max = function (selector) {
                var iterable = _this;
                if (selector === undefined)
                    selector = function (x) { return x; };
                var result = undefined;
                for (var entry in iterable) {
                    var n = selector(entry); // compiler bug
                    if (result === undefined || result < n)
                        result = n;
                }
                /*let iterator = iterable[Symbol.iterator]();
                let entry: IteratorResult<T>;
                while ((entry = iterator.next()).done == false)
                {
                    let n = selector(entry.value);
                    if (result === undefined || result < n)
                        result = n;
                }*/
                return result;
            };
            this.count = function (predicate) {
                var e_10, _a;
                var iterable = _this;
                if (predicate !== undefined)
                    iterable = iterable.where(predicate);
                var result = 0;
                try {
                    for (var iterable_10 = __values(iterable), iterable_10_1 = iterable_10.next(); !iterable_10_1.done; iterable_10_1 = iterable_10.next()) {
                        var entry = iterable_10_1.value;
                        result++;
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (iterable_10_1 && !iterable_10_1.done && (_a = iterable_10.return)) _a.call(iterable_10);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
                /*
                let iterator = iterable[Symbol.iterator]();
                let entry: IteratorResult<T>;
                while ((entry = iterator.next()).done == false)
                    result++;*/
                return result;
            };
            this.average = function (selector) {
                var count = _this.count();
                if (count == 0)
                    return undefined;
                if (selector === undefined)
                    selector = function (x) { return x; };
                var sum = _this.sum(selector);
                return sum / count;
            };
            this.distinct = function () { return new LinqGroupByIterable(_this, function (x) { return x; }, function (g) { return g.first(); }); };
        }
        LinqIterableBase.prototype[Symbol.iterator] = function () { return this.getIterator(); };
        LinqIterableBase.isObj = function (x) { return x instanceof Object; }; // typeof x === 'object';
        LinqIterableBase.equals = function (a, b) {
            var aIsObj = LinqIterableBase.isObj(a);
            var bIsObj = LinqIterableBase.isObj(b);
            if (aIsObj != bIsObj)
                return false;
            if (!aIsObj)
                return a === b;
            return Object.keys(a).every(function (key) { return (LinqIterableBase.isObj(a[key]) ? LinqIterableBase.equals(b[key], a[key]) : b[key] === a[key]); })
                &&
                    Object.keys(b).every(function (key) { return (LinqIterableBase.isObj(b[key]) ? LinqIterableBase.equals(a[key], b[key]) : a[key] === b[key]); });
        };
        LinqIterableBase.compare = function (a, b, _keySelector, descending) {
            var sortKeyA = _keySelector(a);
            var sortKeyB = _keySelector(b);
            if (sortKeyA > sortKeyB) {
                return !descending ? 1 : -1;
            }
            else if (sortKeyA < sortKeyB) {
                return !descending ? -1 : 1;
            }
            else {
                return 0;
            }
        };
        LinqIterableBase.composeComparers = function (previousComparer, currentComparer) { return function (a, b) {
            return previousComparer(a, b) || currentComparer(a, b);
        }; };
        LinqIterableBase.keyComparer = function (_keySelector, descending) { return function (a, b) {
            return LinqIterableBase.compare(a, b, _keySelector, descending);
        }; };
        return LinqIterableBase;
    }());
    exports.LinqIterableBase = LinqIterableBase;
    var LinqIterableProxy = /** @class */ (function (_super) {
        __extends(LinqIterableProxy, _super);
        function LinqIterableProxy(_source) {
            if (_source === void 0) { _source = new Array(); }
            var _this = _super.call(this) || this;
            _this._source = _source;
            return _this;
        }
        LinqIterableProxy.prototype.getIterator = function () {
            return this._source[Symbol.iterator]();
        };
        return LinqIterableProxy;
    }(LinqIterableBase));
    exports.LinqIterableProxy = LinqIterableProxy;
    var KeyValuePair = /** @class */ (function () {
        function KeyValuePair(key, value) {
            this.key = key;
            this.value = value;
        }
        return KeyValuePair;
    }());
    exports.KeyValuePair = KeyValuePair;
    var LinqGroupByIterable = /** @class */ (function (_super) {
        __extends(LinqGroupByIterable, _super);
        function LinqGroupByIterable(source, keySelector, valueSelector) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.keySelector = keySelector;
            _this.valueSelector = valueSelector;
            return _this;
        }
        LinqGroupByIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqGroupByIterable.prototype.algo = function () {
            //access private member
            var _this = this;
            var result = new LinqIterableProxy(this.source).aggregate(function (acc, v) {
                var group = new LinqIterableProxy(acc).singleOrUndefined(function (x) { return LinqIterableBase.equals(x.key, _this.keySelector(v)); });
                if (group !== undefined)
                    group.elements.push(v);
                else {
                    var groupData = new Array();
                    groupData.push(v);
                    acc.add(new LinqGrouping(_this.keySelector(v), groupData));
                }
                return acc;
            }, new List());
            return result.select(this.valueSelector)[Symbol.iterator]();
        };
        return LinqGroupByIterable;
    }(LinqIterableBase));
    exports.LinqGroupByIterable = LinqGroupByIterable;
    var LinqSelectManyIterable = /** @class */ (function (_super) {
        __extends(LinqSelectManyIterable, _super);
        function LinqSelectManyIterable(source, selector, finalSelector) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.selector = selector;
            _this.finalSelector = finalSelector;
            return _this;
        }
        LinqSelectManyIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqSelectManyIterable.prototype.algo = function () {
            var _a, _b, entry, _c, _d, innerEntry, e_11_1, e_12_1;
            var e_12, _e, e_11, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (this.finalSelector == undefined)
                            this.finalSelector = function (outer, inner) { return inner; };
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 12, 13, 14]);
                        _a = __values(this.source), _b = _a.next();
                        _g.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 11];
                        entry = _b.value;
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 8, 9, 10]);
                        _c = (e_11 = void 0, __values(this.selector(entry))), _d = _c.next();
                        _g.label = 4;
                    case 4:
                        if (!!_d.done) return [3 /*break*/, 7];
                        innerEntry = _d.value;
                        return [4 /*yield*/, this.finalSelector(entry, innerEntry)];
                    case 5:
                        _g.sent();
                        _g.label = 6;
                    case 6:
                        _d = _c.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_11_1 = _g.sent();
                        e_11 = { error: e_11_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                        }
                        finally { if (e_11) throw e_11.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_12_1 = _g.sent();
                        e_12 = { error: e_12_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_12) throw e_12.error; }
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        };
        return LinqSelectManyIterable;
    }(LinqIterableBase));
    exports.LinqSelectManyIterable = LinqSelectManyIterable;
    var LinqJoinIterable = /** @class */ (function (_super) {
        __extends(LinqJoinIterable, _super);
        function LinqJoinIterable(_leftSource, _rightSource, _leftKeySelector, _rightKeySelector, _finalSelector) {
            var _this = _super.call(this) || this;
            _this._leftSource = _leftSource;
            _this._rightSource = _rightSource;
            _this._leftKeySelector = _leftKeySelector;
            _this._rightKeySelector = _rightKeySelector;
            _this._finalSelector = _finalSelector;
            return _this;
        }
        LinqJoinIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqJoinIterable.prototype.algo = function () {
            var _a, _b, leftEntry, _c, _d, rightEntry, leftKey, rightKey, e_13_1, e_14_1;
            var e_14, _e, e_13, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 11, 12, 13]);
                        _a = __values(this._leftSource), _b = _a.next();
                        _g.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 10];
                        leftEntry = _b.value;
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 7, 8, 9]);
                        _c = (e_13 = void 0, __values(this._rightSource)), _d = _c.next();
                        _g.label = 3;
                    case 3:
                        if (!!_d.done) return [3 /*break*/, 6];
                        rightEntry = _d.value;
                        leftKey = this._leftKeySelector(leftEntry);
                        rightKey = this._rightKeySelector(rightEntry);
                        if (!LinqIterableBase.equals(leftKey, rightKey)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._finalSelector(leftEntry, rightEntry)];
                    case 4:
                        _g.sent();
                        _g.label = 5;
                    case 5:
                        _d = _c.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_13_1 = _g.sent();
                        e_13 = { error: e_13_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                        }
                        finally { if (e_13) throw e_13.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_14_1 = _g.sent();
                        e_14 = { error: e_14_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_14) throw e_14.error; }
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        };
        return LinqJoinIterable;
    }(LinqIterableBase));
    exports.LinqJoinIterable = LinqJoinIterable;
    var LinqGroupJoinIterable = /** @class */ (function (_super) {
        __extends(LinqGroupJoinIterable, _super);
        function LinqGroupJoinIterable(_leftSource, _rightSource, _leftKeySelector, _rightKeySelector, _finalSelector) {
            var _this = _super.call(this) || this;
            _this._leftSource = _leftSource;
            _this._rightSource = _rightSource;
            _this._leftKeySelector = _leftKeySelector;
            _this._rightKeySelector = _rightKeySelector;
            _this._finalSelector = _finalSelector;
            return _this;
        }
        LinqGroupJoinIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqGroupJoinIterable.prototype.algo = function () {
            var groupedRight, tmp, _loop_1, this_1, _a, _b, leftEntry, e_15_1;
            var e_15, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        groupedRight = new LinqIterableProxy(this._rightSource).groupBy(this._rightKeySelector);
                        tmp = groupedRight.toArray();
                        _loop_1 = function (leftEntry) {
                            var leftKey, rightGroup;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        leftKey = this_1._leftKeySelector(leftEntry);
                                        rightGroup = groupedRight.singleOrUndefined(function (x) { return LinqIterableBase.equals(x.key, leftKey); });
                                        if (rightGroup === undefined)
                                            rightGroup = new LinqGrouping(leftKey, []);
                                        return [4 /*yield*/, this_1._finalSelector(leftEntry, rightGroup)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        _a = __values(this._leftSource), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        leftEntry = _b.value;
                        return [5 /*yield**/, _loop_1(leftEntry)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_15_1 = _d.sent();
                        e_15 = { error: e_15_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_15) throw e_15.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        };
        return LinqGroupJoinIterable;
    }(LinqIterableBase));
    exports.LinqGroupJoinIterable = LinqGroupJoinIterable;
    var LinqConcatIterable = /** @class */ (function (_super) {
        __extends(LinqConcatIterable, _super);
        function LinqConcatIterable(source1, source2) {
            var _this = _super.call(this) || this;
            _this.source1 = source1;
            _this.source2 = source2;
            return _this;
        }
        LinqConcatIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqConcatIterable.prototype.algo = function () {
            var _a, _b, entry, e_16_1, _c, _d, entry, e_17_1;
            var e_16, _e, e_17, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 5, 6, 7]);
                        _a = __values(this.source1), _b = _a.next();
                        _g.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        entry = _b.value;
                        return [4 /*yield*/, entry];
                    case 2:
                        _g.sent();
                        _g.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_16_1 = _g.sent();
                        e_16 = { error: e_16_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_16) throw e_16.error; }
                        return [7 /*endfinally*/];
                    case 7:
                        _g.trys.push([7, 12, 13, 14]);
                        _c = __values(this.source2), _d = _c.next();
                        _g.label = 8;
                    case 8:
                        if (!!_d.done) return [3 /*break*/, 11];
                        entry = _d.value;
                        return [4 /*yield*/, entry];
                    case 9:
                        _g.sent();
                        _g.label = 10;
                    case 10:
                        _d = _c.next();
                        return [3 /*break*/, 8];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_17_1 = _g.sent();
                        e_17 = { error: e_17_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                        }
                        finally { if (e_17) throw e_17.error; }
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        };
        return LinqConcatIterable;
    }(LinqIterableBase));
    exports.LinqConcatIterable = LinqConcatIterable;
    var LinqReverseIterable = /** @class */ (function (_super) {
        __extends(LinqReverseIterable, _super);
        function LinqReverseIterable(_source) {
            var _this = _super.call(this) || this;
            _this._source = _source;
            return _this;
        }
        LinqReverseIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqReverseIterable.prototype.algo = function () {
            var array;
            var iterable = this._source;
            // OPTIMIZATION FOR ARRAY AND LIST
            if (iterable instanceof LinqIterableProxy || iterable instanceof List) {
                var source = iterable._source; // private property
                if (source instanceof Array)
                    array = source;
            }
            else
                array = new LinqIterableProxy(this._source).toArray();
            array.reverse();
            return (new LinqIterableProxy(array))[Symbol.iterator]();
        };
        return LinqReverseIterable;
    }(LinqIterableBase));
    exports.LinqReverseIterable = LinqReverseIterable;
    var LinqTakeIterable = /** @class */ (function (_super) {
        __extends(LinqTakeIterable, _super);
        function LinqTakeIterable(_source, _count) {
            var _this = _super.call(this) || this;
            _this._source = _source;
            _this._count = _count;
            return _this;
        }
        LinqTakeIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqTakeIterable.prototype.algo = function () {
            var _a, _b, entry, e_18_1;
            var e_18, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this._source), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        entry = _b.value;
                        if (!((--this._count) >= 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_18_1 = _d.sent();
                        e_18 = { error: e_18_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_18) throw e_18.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        };
        return LinqTakeIterable;
    }(LinqIterableBase));
    exports.LinqTakeIterable = LinqTakeIterable;
    var LinqTakeWhileIterable = /** @class */ (function (_super) {
        __extends(LinqTakeWhileIterable, _super);
        function LinqTakeWhileIterable(_source, _predicate) {
            var _this = _super.call(this) || this;
            _this._source = _source;
            _this._predicate = _predicate;
            return _this;
        }
        LinqTakeWhileIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqTakeWhileIterable.prototype.algo = function () {
            var _a, _b, entry, e_19_1;
            var e_19, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this._source), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        entry = _b.value;
                        if (!this._predicate(entry))
                            return [2 /*return*/];
                        return [4 /*yield*/, entry];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_19_1 = _d.sent();
                        e_19 = { error: e_19_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_19) throw e_19.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        };
        return LinqTakeWhileIterable;
    }(LinqIterableBase));
    exports.LinqTakeWhileIterable = LinqTakeWhileIterable;
    var LinqSkipIterable = /** @class */ (function (_super) {
        __extends(LinqSkipIterable, _super);
        function LinqSkipIterable(_source, _count) {
            var _this = _super.call(this) || this;
            _this._source = _source;
            _this._count = _count;
            return _this;
        }
        LinqSkipIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqSkipIterable.prototype.algo = function () {
            var _a, _b, entry, e_20_1;
            var e_20, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this._source), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        entry = _b.value;
                        if (!((--this._count) < 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_20_1 = _d.sent();
                        e_20 = { error: e_20_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_20) throw e_20.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        };
        return LinqSkipIterable;
    }(LinqIterableBase));
    exports.LinqSkipIterable = LinqSkipIterable;
    var LinqSkipWhileIterable = /** @class */ (function (_super) {
        __extends(LinqSkipWhileIterable, _super);
        function LinqSkipWhileIterable(_source, _predicate) {
            var _this = _super.call(this) || this;
            _this._source = _source;
            _this._predicate = _predicate;
            return _this;
        }
        LinqSkipWhileIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqSkipWhileIterable.prototype.algo = function () {
            var doSkip, _a, _b, entry, e_21_1;
            var e_21, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        doSkip = true;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, 9, 10]);
                        _a = __values(this._source), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 7];
                        entry = _b.value;
                        if (!!doSkip) return [3 /*break*/, 4];
                        return [4 /*yield*/, entry];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!!this._predicate(entry)) return [3 /*break*/, 6];
                        doSkip = false;
                        return [4 /*yield*/, entry];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_21_1 = _d.sent();
                        e_21 = { error: e_21_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_21) throw e_21.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        };
        return LinqSkipWhileIterable;
    }(LinqIterableBase));
    exports.LinqSkipWhileIterable = LinqSkipWhileIterable;
    var LinqCastIterable = /** @class */ (function (_super) {
        __extends(LinqCastIterable, _super);
        function LinqCastIterable(source) {
            var _this = _super.call(this) || this;
            _this.source = source;
            return _this;
        }
        LinqCastIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqCastIterable.prototype.algo = function () {
            var _a, _b, entry, e_22_1;
            var e_22, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.source), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        entry = _b.value;
                        return [4 /*yield*/, entry];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_22_1 = _d.sent();
                        e_22 = { error: e_22_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_22) throw e_22.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        };
        return LinqCastIterable;
    }(LinqIterableBase));
    exports.LinqCastIterable = LinqCastIterable;
    var LinqOfTypeIterable = /** @class */ (function (_super) {
        __extends(LinqOfTypeIterable, _super);
        function LinqOfTypeIterable(source, type) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.type = type;
            return _this;
        }
        LinqOfTypeIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqOfTypeIterable.prototype.algo = function () {
            var _a, _b, entry, e_23_1;
            var e_23, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.source), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        entry = _b.value;
                        if (!(entry instanceof this.type)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_23_1 = _d.sent();
                        e_23 = { error: e_23_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_23) throw e_23.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        };
        return LinqOfTypeIterable;
    }(LinqIterableBase));
    exports.LinqOfTypeIterable = LinqOfTypeIterable;
    var LinqSelectIterable = /** @class */ (function (_super) {
        __extends(LinqSelectIterable, _super);
        function LinqSelectIterable(source, selector) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.selector = selector;
            return _this;
        }
        LinqSelectIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqSelectIterable.prototype.algo = function () {
            var _a, _b, entry, e_24_1;
            var e_24, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.source), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        entry = _b.value;
                        return [4 /*yield*/, this.selector(entry)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_24_1 = _d.sent();
                        e_24 = { error: e_24_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_24) throw e_24.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        };
        return LinqSelectIterable;
    }(LinqIterableBase));
    exports.LinqSelectIterable = LinqSelectIterable;
    var LinqWhereIterable = /** @class */ (function (_super) {
        __extends(LinqWhereIterable, _super);
        function LinqWhereIterable(source, predicate) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.predicate = predicate;
            return _this;
        }
        LinqWhereIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqWhereIterable.prototype.algo = function () {
            var _a, _b, entry, e_25_1;
            var e_25, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 7]);
                        _a = __values(this.source), _b = _a.next();
                        _d.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        entry = _b.value;
                        if (!this.predicate(entry)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_25_1 = _d.sent();
                        e_25 = { error: e_25_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_25) throw e_25.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        };
        return LinqWhereIterable;
    }(LinqIterableBase));
    exports.LinqWhereIterable = LinqWhereIterable;
    var LinqOrderByIterable = /** @class */ (function (_super) {
        __extends(LinqOrderByIterable, _super);
        function LinqOrderByIterable(source, comparer) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.comparer = comparer;
            return _this;
        }
        LinqOrderByIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqOrderByIterable.prototype.algo = function () {
            var proxy = new LinqIterableProxy(this.source);
            var array = proxy.toArray();
            var sortedArray = array.sort(this.comparer);
            return (new LinqIterableProxy(sortedArray))[Symbol.iterator]();
        };
        LinqOrderByIterable.prototype.thenBy = function (keySelector) {
            return new LinqOrderByIterable(this, LinqIterableBase.composeComparers(this.comparer, LinqIterableBase.keyComparer(keySelector, false)));
        };
        LinqOrderByIterable.prototype.thenByDescending = function (keySelector) {
            return new LinqOrderByIterable(this, LinqIterableBase.composeComparers(this.comparer, LinqIterableBase.keyComparer(keySelector, true)));
        };
        return LinqOrderByIterable;
    }(LinqIterableBase));
    exports.LinqOrderByIterable = LinqOrderByIterable;
    var LinqUndefinedIfEmptyIterable = /** @class */ (function (_super) {
        __extends(LinqUndefinedIfEmptyIterable, _super);
        function LinqUndefinedIfEmptyIterable(source) {
            var _this = _super.call(this) || this;
            _this.source = source;
            return _this;
        }
        LinqUndefinedIfEmptyIterable.prototype.getIterator = function () {
            return this.algo();
        };
        LinqUndefinedIfEmptyIterable.prototype.algo = function () {
            var iterator, firstEntry, entry, entry_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = this.source[Symbol.iterator]();
                        firstEntry = iterator.next();
                        if (!firstEntry.done) return [3 /*break*/, 2];
                        return [4 /*yield*/, undefined];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, firstEntry.value];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!true) return [3 /*break*/, 6];
                        entry_1 = iterator.next();
                        if (entry_1.done)
                            return [3 /*break*/, 6];
                        return [4 /*yield*/, entry_1.value];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 6: return [2 /*return*/];
                }
            });
        };
        return LinqUndefinedIfEmptyIterable;
    }(LinqIterableBase));
    exports.LinqUndefinedIfEmptyIterable = LinqUndefinedIfEmptyIterable;
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(source) {
            if (source === void 0) { source = new Array(); }
            var _this = _super.call(this, source instanceof Array ? source : new LinqIterableProxy(source).toArray()) || this;
            _this.add = function (item) { _this.elements.push(item); };
            _this.clear = function () { _this._source = new Array(); };
            _this.remove = function (item) {
                var index = _this.indexOf(item);
                _this.removeAt(index);
            };
            _this.indexOf = function (item) {
                var indexOrDefault = _this
                    .select(function (x, i) { return { x: x, i: i }; })
                    .firstOrUndefined(function (x) { return LinqIterableBase.equals(x.x, item); });
                if (indexOrDefault === undefined)
                    return -1;
                return indexOrDefault.i;
            };
            _this.removeAt = function (index) {
                _this.elements.splice(index, 1);
            };
            return _this;
        }
        Object.defineProperty(List.prototype, "elements", {
            get: function () { return this._source; },
            enumerable: false,
            configurable: true
        });
        List.prototype.insert = function (index, item) {
            this.elements.splice(index, 0, item);
        };
        return List;
    }(LinqIterableProxy));
    exports.List = List;
    var LinqGrouping = /** @class */ (function (_super) {
        __extends(LinqGrouping, _super);
        function LinqGrouping(key, elements) {
            if (elements === void 0) { elements = []; }
            var _this = _super.call(this, elements) || this;
            _this._key = key;
            return _this;
        }
        LinqGrouping.prototype.getIterator = function () {
            return this.elements[Symbol.iterator]();
        };
        Object.defineProperty(LinqGrouping.prototype, "key", {
            get: function () { return this._key; },
            enumerable: false,
            configurable: true
        });
        ;
        return LinqGrouping;
    }(List));
    exports.LinqGrouping = LinqGrouping;
});
