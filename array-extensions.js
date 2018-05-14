(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "linq"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Linq = require("linq");
    Array.prototype.asLinq = function () {
        return new Linq.LinqIterable(this);
    };
});
/*

class Grouping<TKey, TValue> extends Array<TValue>
{
    constructor(key: TKey) {
        super();

        Object.defineProperty(this, "key", {
            get: function () {
                return (this as any)._key;
            },
            enumerable: false,
            configurable: false

        });
        this._key = key;
    }

   
    private _key: TKey;
    public get key(): TKey { return this._key };
}



declare global {
    interface Array<T> {
        //asLinq(): Linq<T>;
        select<TResult>(selector: (x: T) => TResult): Array<TResult>;

        where(predicate: (x: T) => boolean): Array<T>;

        ofType<TResult>(type: { new(): TResult }): Array<TResult>;

        cast<TResult>(): Array<TResult>;

        first() : T;
        first(predicate?: (x: T) => boolean): T;

        firstOrUndefined() : T | undefined;
        firstOrUndefined(predicate?: (x: T) => boolean): T | undefined;

        single() : T;
        single(predicate?: (x: T) => boolean): T;

        singleOrUndefined() : T | undefined;
        singleOrUndefined(predicate?: (x: T) => boolean): T | undefined;

        take(num: number): Array<T>;

        aggregate<TAcc>(
            initialValue: TAcc,
            accumulator: (acc: TAcc, value: T, index?: number) => TAcc,
        ): TAcc;

        groupBy<TKey>(keySelector: (x: T) => TKey): Array<Grouping<TKey, T>>;
        groupBy<TKey, TResult>(keySelector: (x: T) => TKey, valueSelector?: (group : Grouping<TKey, T>) => TResult) : Array<TResult>;
        
        sum() : number;
        sum(selector?: (x: T) => number) : number;

        avg() : number | undefined;
        avg(selector?: (x: T) => number) : number | undefined;

        min() : number | undefined;
        min(selector?: (x: T) => number) : number | undefined;

        max() : number | undefined;
        max(selector?: (x: T) => number) : number | undefined;

        selectMany<TResult>(selector: (x: T) => Array<TResult>): Array<TResult>;

        distinct(): Array<T>;

        linqJoin<TRight, TLeftKey, TRightKey, TResult>(
            rightArray : Array<TRight>,
            leftKeySelector : (item: T) => TLeftKey,
            rightKeySelector : (item: TRight) => TRightKey,
            finalSelector : (leftItem : T, rightItem : TRight) => TResult
        ) : Array<TResult>;

        any() : boolean;
        any(predicate?: (x: T) => boolean) : boolean;
        
        all(predicate: (x: T) => boolean) : boolean;

        contains(x: T) : boolean;
        //last /orUndefined
        //elementAt / orUnd
        //groupJoin ??
        //orderBy / descending
    }
}


const __linqIsObj = (x: any): boolean => typeof x === 'object';

const __linqEquals = (a: any, b: any): boolean => {
    let aIsObj = __linqIsObj(a);
    let bIsObj = __linqIsObj(b);
    if (aIsObj != bIsObj) return false;
    if (!aIsObj) return a === b;

    return Object.keys(a).every(
        key => (__linqIsObj(a[key]) ? __linqEquals(b[key], a[key]) : b[key] === a[key])
    )
}


Array.prototype.select = Array.prototype.map;
Array.prototype.where = Array.prototype.filter;


Array.prototype.ofType = function (type: { new() : any }) {
    return this.where(x => x instanceof type);
}

Array.prototype.cast = function () { return this; }


Array.prototype.first = function (predicate?: (x: any) => boolean) {
    let filtered = this;
    if (predicate) filtered = this.where(predicate);

    if (filtered.length == 0)
        throw new Error("The array contains no elements");

    return filtered[0];
}

Array.prototype.firstOrUndefined = function (predicate?: (x: any) => boolean) {
    let filtered = this;
    if (predicate) filtered = this.where(predicate);

    if (filtered.length == 0)
        return undefined;

    return filtered[0];
}


Array.prototype.single = function (predicate?: (x: any) => boolean) {
    let filtered = this;
    if (predicate) filtered = this.where(predicate);

    if (filtered.length > 1)
        throw new Error("The array contains more then one element");

    return filtered.first();
}

Array.prototype.singleOrUndefined = function (predicate?: (x: any) => boolean) {
    let filtered = this;
    if (predicate) filtered = this.where(predicate);
    
    if (filtered.length > 1)
        throw new Error("The array contains more then one element");

    return filtered.firstOrUndefined();
}


Array.prototype.take = function (num) {
    num = Math.min(num, this.length);
    let tmp = [];

    for (var i = 0; i < num; i++)
        tmp.push(this[i]);

    return tmp;
}


Array.prototype.aggregate = function (initialValue, accumulator) {
    let currAcc = initialValue;
    for (var i = 0; i < this.length; i++)
        currAcc = accumulator(currAcc, this[i], i);
    return currAcc;
}



Array.prototype.groupBy = function (keySelector: (x:any) => any, valueSelector? : (x:any) => any) : Array<any> {
    let result = this.aggregate(
        [],

        (ac, v) =>
        {
            let group = ac.singleOrUndefined(x => __linqEquals(x.key, keySelector(v)));  // TODO

            if (group)
                group.push(v);

            else {
                group = new Grouping(keySelector(v));
                group.push(v);
                ac.push(group);
            }

            return ac;
        }

    );

    if (valueSelector)
        result = result.select(valueSelector);

    return result;
}



Array.prototype.sum = function(selector?: (x: any) => number) : number{
    let sel : (x: any) => number = selector;
    if (!sel)
        sel = (x => x);

    let s = 0;
    for (var i = 0; i < this.length; i++)
        s += sel(this[i]) as number;

    return s;
}

Array.prototype.avg = function(selector?: (x: any) => number) : number | undefined {
    if (this.length == 0) return undefined;

    return this.sum(selector) / this.length;
}

Array.prototype.min = function(selector?: (x: any) => number) {
    if (this.length == 0)
        return undefined;

    let sel : (x: any) => any = selector;
    if (!sel)
        sel = (x => x);

    let min = undefined;
    for (var i = 0; i < this.length; i++)
        if (min === undefined || sel(this[i]) < min)
            min = sel(this[i]);

    return min;
}


Array.prototype.max = function(selector?: (x: any) => number) {
    if (this.length == 0)
        return undefined;

    let sel : (x: any) => any = selector;
    if (!sel)
        sel = (x => x);

    let max = undefined;
    for (var i = 0; i < this.length; i++)
        if (max === undefined || sel(this[i]) > max)
            max = sel(this[i]);

    return max;
}


Array.prototype.selectMany =  function(selector: (x : any) => Array<any>): Array<any> {
    let result = [];
    for (var i=0; i<this.length; i++)
    {
        let innerArray = selector(this[i]);

        for (var j=0; j<innerArray.length; j++)
            result.push(innerArray[j]);
    }

    return result;
}


Array.prototype.distinct = function() {
    return this.groupBy(x => x, x => x.key);
}


Array.prototype.linqJoin = function (rightArray : Array<any>, leftKeySelector : (x: any) => any, rightKeySelector: (x: any) => any, finalSelector: (l: any, r: any) => any) : Array<any> {
    let result = [];

    for (var i=0; i<this.length; i++)
    {
        for (var j=0; j<rightArray.length; j++)
        {
            let leftKey = leftKeySelector(this[i]);
            let rightKey = rightKeySelector(rightArray[j]);

            if (__linqEquals(leftKey, rightKey)) result.push(finalSelector(this[i], rightArray[j]));
        }
    }

    return result;
}

Array.prototype.any = function (predicate?: (x: any) => boolean) : boolean {
    for (var i=0; i<this.length; i++)
        if (!predicate || predicate(this[i]))
            return true;
    
    return false;
}


Array.prototype.all = function (predicate: (x: any) => boolean) : boolean {
    return !this.any(x => !predicate(x));
}


Array.prototype.contains = function(value : any) : boolean {
    return this.any(x => __linqEquals(x, value));
}

export { };


/*
export class Linq<T> extends Array<T>
{
    private constructor(items?: Array<T>) {
        super(...items);
    }

    static create<T>() : Linq<T> {
        return Object.create(Linq.prototype);
    }

    public select : <TResult>(selector : (x : T) => TResult) => Linq<TResult> = selector =>{
        return this.map(selector).asLinq();
    }
}
*/
