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
        define(["require", "exports", "./linq-exceptions"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                var iterable = _this;
                var iterator = iterable[Symbol.iterator]();
                var entry;
                while ((entry = iterator.next()).done == false)
                    action(entry.value);
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
                var iterator = iterable[Symbol.iterator]();
                var entry;
                while ((entry = iterator.next()).done == false)
                    if (position-- == 0)
                        return entry.value;
                throw new Exceptions.LinqNotEnoughElementsException();
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
                var iterator = iterable[Symbol.iterator]();
                var entry;
                while ((entry = iterator.next()).done == false)
                    if (position-- == 0)
                        return entry.value;
                return undefined;
            };
            this.last = function () {
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
                var iterator = iterable[Symbol.iterator]();
                var firstEntry = iterator.next();
                var lastValue;
                if (firstEntry.done == true)
                    throw new Exceptions.LinqNoElementsException();
                lastValue = firstEntry.value;
                var entry;
                while ((entry = iterator.next()).done == false)
                    lastValue = entry.value;
                return lastValue;
            };
            this.lastOrUndefined = function () {
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
                var iterator = iterable[Symbol.iterator]();
                var firstEntry = iterator.next();
                var lastValue;
                if (firstEntry.done == true)
                    return undefined;
                lastValue = firstEntry.value;
                var entry;
                while ((entry = iterator.next()).done == false)
                    lastValue = entry.value;
                return lastValue;
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
                var currAcc;
                if (initialAccumulator)
                    currAcc = initialAccumulator;
                var iterable = _this;
                var iterator = iterable[Symbol.iterator]();
                var entry = iterator.next();
                if (initialAccumulator === undefined) {
                    if (entry.done)
                        return undefined;
                    else
                        currAcc = entry.value;
                }
                else {
                    if (entry.done == false)
                        currAcc = accumulatorFunc(initialAccumulator, entry.value);
                }
                while ((entry = iterator.next()).done == false)
                    currAcc = accumulatorFunc(currAcc, entry.value);
                return currAcc;
            };
            //public toArray = () : T[] => Array.from(this);
            this.toArray = function () {
                var result = [];
                var iterable = _this;
                var iterator = iterable[Symbol.iterator]();
                var entry;
                while ((entry = iterator.next()).done == false)
                    result.push(entry.value);
                return result;
            };
            this.toObject = function (keySelector, valueSelector) {
                var result = {};
                var iterable = _this;
                var iterator = iterable[Symbol.iterator]();
                var entry;
                while ((entry = iterator.next()).done == false)
                    result[keySelector(entry.value)] = valueSelector(entry.value);
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
                var iterable = _this;
                var iterator = iterable[Symbol.iterator]();
                var entry;
                if (predicate === undefined)
                    predicate = function (x) { return true; };
                while ((entry = iterator.next()).done == false)
                    if (predicate(entry.value))
                        return true;
            };
            this.all = function (predicate) { return !_this.any(function (x) { return !predicate(x); }); };
            this.contains = function (element) { return _this.any(function (x) { return LinqIterableBase.equals(x, element); }); };
            this.sum = function (selector) {
                var iterable = _this;
                var iterator = iterable[Symbol.iterator]();
                if (selector === undefined)
                    selector = function (x) { return x; };
                var result = 0;
                var entry;
                while ((entry = iterator.next()).done == false)
                    result += selector(entry.value);
                return result;
            };
            this.min = function (selector) {
                var iterable = _this;
                var iterator = iterable[Symbol.iterator]();
                if (selector === undefined)
                    selector = function (x) { return x; };
                var result = undefined;
                var entry;
                while ((entry = iterator.next()).done == false) {
                    var n = selector(entry.value);
                    if (result === undefined || result > n)
                        result = n;
                }
                return result;
            };
            this.max = function (selector) {
                var iterable = _this;
                var iterator = iterable[Symbol.iterator]();
                if (selector === undefined)
                    selector = function (x) { return x; };
                var result = undefined;
                var entry;
                while ((entry = iterator.next()).done == false) {
                    var n = selector(entry.value);
                    if (result === undefined || result < n)
                        result = n;
                }
                return result;
            };
            this.count = function (predicate) {
                var iterable = _this;
                if (predicate !== undefined)
                    iterable = iterable.where(predicate);
                var iterator = iterable[Symbol.iterator]();
                var result = 0;
                var entry;
                while ((entry = iterator.next()).done == false)
                    result++;
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
            var iterator, entry, innerIterable, innerIterator, innerEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.finalSelector == undefined)
                            this.finalSelector = function (outer, inner) { return inner; };
                        iterator = this.source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 5];
                        innerIterable = new LinqIterableProxy(this.selector(entry.value));
                        innerIterator = innerIterable[Symbol.iterator]();
                        innerEntry = void 0;
                        _a.label = 2;
                    case 2:
                        if (!((innerEntry = innerIterator.next()).done == false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.finalSelector(entry.value, innerEntry.value)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 2];
                    case 4: return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
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
            var leftIterator, leftEntry, rightIterator, rightEntry, leftKey, rightKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        leftIterator = this._leftSource[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((leftEntry = leftIterator.next()).done == false)) return [3 /*break*/, 6];
                        rightIterator = this._rightSource[Symbol.iterator]();
                        rightEntry = void 0;
                        _a.label = 2;
                    case 2:
                        if (!((rightEntry = rightIterator.next()).done == false)) return [3 /*break*/, 5];
                        leftKey = this._leftKeySelector(leftEntry.value);
                        rightKey = this._rightKeySelector(rightEntry.value);
                        if (!LinqIterableBase.equals(leftKey, rightKey)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._finalSelector(leftEntry.value, rightEntry.value)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
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
            var groupedRight, tmp, leftIterator, leftEntry, _loop_1, this_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupedRight = new LinqIterableProxy(this._rightSource).groupBy(this._rightKeySelector);
                        tmp = groupedRight.toArray();
                        leftIterator = this._leftSource[Symbol.iterator]();
                        _loop_1 = function () {
                            var leftKey, rightGroup;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        leftKey = this_1._leftKeySelector(leftEntry.value);
                                        rightGroup = groupedRight.singleOrUndefined(function (x) { return LinqIterableBase.equals(x.key, leftKey); });
                                        if (rightGroup === undefined)
                                            rightGroup = new LinqGrouping(leftKey, []);
                                        return [4 /*yield*/, this_1._finalSelector(leftEntry.value, rightGroup)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!((leftEntry = leftIterator.next()).done == false)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
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
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = this.source1[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry.value];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        iterator = this.source2[Symbol.iterator]();
                        _a.label = 4;
                    case 4:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 6];
                        return [4 /*yield*/, entry.value];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 6: return [2 /*return*/];
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
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = this._source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 5];
                        if (!(--this._count >= 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry.value];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/];
                    case 4: return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
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
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = this._source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 5];
                        if (!this._predicate(entry.value)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry.value];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/];
                    case 4: return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
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
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = this._source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 4];
                        if (!(--this._count < 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry.value];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
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
            var doSkip, iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doSkip = true;
                        iterator = this._source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 6];
                        if (!!doSkip) return [3 /*break*/, 3];
                        return [4 /*yield*/, entry.value];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!!this._predicate(entry.value)) return [3 /*break*/, 5];
                        doSkip = false;
                        return [4 /*yield*/, entry.value];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
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
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = this.source[Symbol.iterator]();
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
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = this.source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 4];
                        if (!(entry.value instanceof this.type)) return [3 /*break*/, 3];
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
            var index, iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = 0;
                        iterator = this.source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.selector(entry.value, index++)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
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
            var iterator, entry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = this.source[Symbol.iterator]();
                        _a.label = 1;
                    case 1:
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 4];
                        if (!this.predicate(entry.value)) return [3 /*break*/, 3];
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
            var iterator, firstEntry, entry;
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
                        if (!((entry = iterator.next()).done == false)) return [3 /*break*/, 6];
                        return [4 /*yield*/, entry.value];
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
            enumerable: true,
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
            enumerable: true,
            configurable: true
        });
        ;
        return LinqGrouping;
    }(List));
    exports.LinqGrouping = LinqGrouping;
});
