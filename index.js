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
    //var x = new Linq<number>();
    var TestClass = /** @class */ (function () {
        /**
         *
         */
        function TestClass(myField, myField2) {
            this.myField = 0;
            this.myField2 = 0;
            this.myArray = [111, 222, 333, 444];
            if (myField)
                this.myField = myField;
            if (myField2)
                this.myField2 = myField2;
        }
        return TestClass;
    }());
    var TestInterface = /** @class */ (function () {
        function TestInterface() {
        }
        return TestInterface;
    }());
    var Tests = /** @class */ (function () {
        function Tests() {
        }
        Tests.run = function () {
            var nums = [5, 3, 4, 1, 9, 2, 8, 0, 6, 7];
            var testClass = new TestClass(100);
            var anys = ["ciao", 3, true, false, 0, undefined, "albero", {}, testClass, 3, 3, {}, testClass];
            var testClasses = [new TestClass(200, 8), new TestClass(100, 8), new TestClass(100, 5), new TestClass(200, 1)];
            var strings = ["ciao", "albero", "casa", "si", "no", "forse"];
            console.log('TEST 01: test where');
            var query01 = nums.asLinq()
                .where(function (x) { return x % 3 == 0; });
            console.log(query01.toArray());
            console.log('TEST 02: test select');
            var query02 = nums.asLinq()
                .select(function (x) { return x + 5; });
            console.log(query02.toArray());
            console.log('TEST 03: test ofType');
            var query03 = anys.asLinq()
                .ofType(TestClass);
            console.log(query03.toArray());
            console.log('TEST 04: test cast');
            var query04 = testClasses.asLinq()
                .cast()
                .where(function (x) { return x.myField == 100; });
            console.log(query04.toArray());
            var item;
            console.log('TEST 05: test first');
            item = anys.asLinq()
                .ofType(TestClass)
                .first();
            console.log(item);
            console.log('TEST 06: test first with predicate');
            item = nums.asLinq()
                .first(function (x) { return x === 3; });
            console.log(item);
            console.log('TEST 07: test skip and take');
            var query07 = anys.asLinq()
                .skip(2)
                .take(3);
            console.log(query07.toArray());
            console.log('TEST 08: test aggregate no initial value');
            item = nums.asLinq()
                .aggregate(function (acc, x) { return acc += x; });
            console.log(item);
            console.log('TEST 09: test aggregate on objects with initial value');
            item = testClasses.asLinq()
                .aggregate(function (acc, x) { return acc += x.myField; }, 0);
            console.log(item);
            console.log('TEST 10: test groupBy (number field)');
            var query10 = testClasses.asLinq()
                .groupBy(function (x) { return x.myField; });
            console.log(query10.toArray());
            console.log('TEST 11: test groupBy (object)');
            var query11 = testClasses.asLinq()
                .groupBy(function (x) { return x; });
            console.log(query11.toArray());
            console.log('TEST 12: test groupBy and aggregation functions (min, max, sum, average, count)');
            var query12 = nums.asLinq()
                .groupBy(function (x) { return x % 3 == 0; }, function (g) {
                return {
                    key: g.key ? "x % 3 == 0" : "x % 3 != 0",
                    sum: g.sum(),
                    min: g.min(),
                    max: g.max(),
                    average: g.average(),
                    count: g.count(),
                    elements: g.toArray()
                };
            });
            console.log(query12.toArray());
            console.log('TEST 13: test selectMany');
            var query13 = testClasses.asLinq()
                .selectMany(function (x) { return x.myArray; });
            console.log(query13.toArray());
            console.log('TEST 14: test distinct on several types altogheter');
            var query14 = anys.asLinq()
                .distinct();
            console.log(query14.toArray());
            console.log('TEST 15: test contains on object');
            item = anys.asLinq()
                .contains(testClass);
            console.log(item);
            console.log('TEST 16: test concat on anys');
            var query16 = anys.asLinq()
                .concat(nums);
            console.log(query16.toArray());
            console.log('TEST 17: test union on anys');
            var query17 = anys.asLinq()
                .union(nums);
            console.log(query17.toArray());
            console.log('TEST 18: test intersect on anys');
            var query18 = anys.asLinq()
                .intersect(nums);
            console.log(query18.toArray());
            console.log('TEST 19: test intersect on anys');
            var query19 = anys.asLinq()
                .except(nums);
            console.log(query19.toArray());
            console.log('TEST 20: test join on strings');
            var query20 = strings.asLinq()
                .join(strings, function (l) { return l.substr(0, 1); }, function (r) { return r.substr(0, 1); }, function (l, r) { return l.substr(0, 1).toUpperCase() + ': ' + l + ' ' + r; });
            console.log(query20.toArray());
            console.log('TEST 21: test linq on string');
            var query21 = "che bello che è il linq".asLinq()
                .where(function (x) { return x == "c" || x == "e" || x == " " || x == "q"; });
            console.log(query21.toArray().join(""));
            console.log('TEST 21: test linq on object');
            var q22test = {
                albero: 99,
                casa: 33,
                computer: 1,
                macchina: 99
            };
            var query22 = q22test.asLinq()
                .where(function (x) { return x.value > 10; })
                .where(function (x) { return x.key.indexOf("c") > -1; });
            console.log(query22.toArray());
            console.log('TEST 23: test orderBy');
            var query23 = nums.asLinq()
                .orderBy(function (x) { return x; });
            console.log(query23.toArray());
            console.log('TEST 24: test orderBy + thenBy');
            var query24 = testClasses.asLinq()
                .orderBy(function (x) { return x.myField; })
                .thenBy(function (x) { return x.myField2; });
            console.log(query24.toArray());
            console.log('TEST 25: test undefinedIfEmpty');
            var query25 = [].asLinq()
                .undefinedIfEmpty();
            console.log(query25.toArray());
            console.log('TEST 26: test elementAt on iterable');
            item = nums.asLinq()
                .where(function (x) { return x % 2 == 0; })
                .elementAt(2);
            console.log(item);
            console.log('TEST 27: test elementAt on array (optimization)');
            item = nums.asLinq()
                .elementAt(2);
            console.log(item);
            console.log('TEST 28: test last on iterable');
            item = nums.asLinq()
                .where(function (x) { return x % 2 == 0; })
                .last();
            console.log(item);
            console.log('TEST 29: test elementAt on array (optimization)');
            item = nums.asLinq()
                .last();
            console.log(item);
            console.log('TEST 30: test groupJoin');
            var query30 = nums.asLinq()
                .groupJoin(testClasses, function (l) { return l; }, function (r) { return r.myField2; }, function (l, g) {
                return {
                    num: l,
                    testClasses: g.toArray(),
                    count: g.count()
                };
            });
            console.log(query30.toArray());
            console.log('TEST 31: toObject');
            item = strings.asLinq()
                .toObject(function (x) { return x; }, function (x) { return x.length; });
            console.log(item);
            console.log('TEST 32: skipWhile + takeWhile');
            var query32 = nums.asLinq()
                .skipWhile(function (x) { return x != 4; })
                .takeWhile(function (x) { return x != 8; });
            console.log(query32.toArray());
            console.log('TEST 33: sequenceEquals');
            item = nums.asLinq()
                .sequenceEquals(nums);
            var item2 = nums.asLinq()
                .sequenceEquals(nums.asLinq().skip(1));
            console.log('true?: ' + item + '   false?: ' + item2);
            console.log('TEST 34: reverse');
            var query34 = nums.asLinq()
                .reverse();
            console.log(query34.toArray());
            console.log('TEST 35: test selectMany');
            var query35 = testClasses.asLinq()
                .selectMany(function (x) { return x.myArray; }, function (o, i) { return [o.myField, i]; });
            console.log(query35.toArray());
        };
        return Tests;
    }());
    exports.Tests = Tests;
});
