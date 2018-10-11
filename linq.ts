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






import * as Exceptions from "./linq-exceptions"




declare global {
    interface Array<T> {
        asLinq(): LinqIterableBase<T>;
    }

    interface String {
        asLinq(): LinqIterableBase<string>;
    }

    interface Set<T> {
        asLinq(): LinqIterableBase<T>;
    }

    interface Map<K, V> {
        asLinq(): LinqIterableBase<KeyValuePair<K, V>>;
    }

    /* interface Object {
        asLinq(): Linq.LinqIterableBase<Linq.KeyValuePair<string, any>>;
    } */
}

Array.prototype.asLinq = function () {
    return new LinqIterableProxy(this);
}

String.prototype.asLinq = function () {
    return new LinqIterableProxy<string>(this);
}

Set.prototype.asLinq = function () {
    return new LinqIterableProxy(this);
}

Map.prototype.asLinq = function() {
    return (new LinqIterableProxy(this)).select(x => new KeyValuePair(x[0], x[1]));
}





export class Linq {
    static fromObject(source : Object) : LinqIterableBase<KeyValuePair<string, any>> {
        return Object.keys(source).asLinq().select(k => new KeyValuePair(k, (<any>source)[k]));
    }

    static fromArray<T>(source : T[]) : LinqIterableBase<T> {
        return new LinqIterableProxy(source);
    }

    static fromString(source : string) : LinqIterableBase<string> {
        return new LinqIterableProxy(source);
    }

    static fromSet<T>(source : Set<T>) : LinqIterableBase<T> {
        return new LinqIterableProxy(source);
    }

    static fromMap<K, V>(source : Map<K,V>) : LinqIterableBase<KeyValuePair<K,V>> {
        return (new LinqIterableProxy(source)).select(x => new KeyValuePair(x[0], x[1]));
    }
}


export abstract class LinqIterableBase<T> implements Iterable<T> {
    public [Symbol.iterator](): Iterator<T> { return this.getIterator(); }

    protected abstract getIterator() : Iterator<T>;



    

    protected static isObj = (x: any): boolean => x instanceof Object; // typeof x === 'object';

    protected static equals = (a: any, b: any): boolean => {
        let aIsObj = LinqIterableBase.isObj(a);
        let bIsObj = LinqIterableBase.isObj(b);
        if (aIsObj != bIsObj) return false;
        if (!aIsObj) return a === b;

        return Object.keys(a).every(
            key => (LinqIterableBase.isObj(a[key]) ? LinqIterableBase.equals(b[key], a[key]) : b[key] === a[key])
        )

            &&

            Object.keys(b).every(
                key => (LinqIterableBase.isObj(b[key]) ? LinqIterableBase.equals(a[key], b[key]) : a[key] === b[key])
            )
    }


    protected static compare = <T>(
        a: T,
        b: T,
        _keySelector: (key: T) => any,
        descending?: boolean
    ): number => {
        const sortKeyA = _keySelector(a)
        const sortKeyB = _keySelector(b)
        if (sortKeyA > sortKeyB) {
            return !descending ? 1 : -1
        } else if (sortKeyA < sortKeyB) {
            return !descending ? -1 : 1
        } else {
            return 0
        }
    }

    protected static composeComparers = <T>(
        previousComparer: (a: T, b: T) => number,
        currentComparer: (a: T, b: T) => number
    ): ((a: T, b: T) => number) => (a: T, b: T) =>
            previousComparer(a, b) || currentComparer(a, b)

    protected static keyComparer = <T>(
        _keySelector: (key: T) => any,
        descending?: boolean
    ): ((a: T, b: T) => number) => (a: T, b: T) =>
            LinqIterableBase.compare(a, b, _keySelector, descending)



    
    public foreach = (action: (item: T) => void) => {
        let iterable = this;
        let iterator = iterable[Symbol.iterator]();
        
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            action(entry.value);
    }



    

    public first = (predicate?: (x: T) => boolean) : T => {
        let iterable : LinqIterableBase<T> = this;
        if (predicate) iterable = iterable.where(predicate);
        let iterator = iterable[Symbol.iterator]();

        let entry: IteratorResult<T> = iterator.next();

        if (entry.done == true)
            throw new Exceptions.LinqNoElementsException();

        return entry.value;
    }


    public firstOrUndefined = (predicate?: (x: T) => boolean) : T | undefined => {
        let iterable : LinqIterableBase<T> = this;
        if (predicate) iterable = iterable.where(predicate);
        let iterator = iterable[Symbol.iterator]();
        
        let entry: IteratorResult<T> = iterator.next();

        if (entry.done == true)
            return undefined;

        return entry.value;
    }


    

    public single = (predicate?: (x: T) => boolean) : T => {
        let iterable : LinqIterableBase<T> = this;
        if (predicate) iterable = iterable.where(predicate);
        let iterator = iterable[Symbol.iterator]();
        
        let firstEntry: IteratorResult<T> = iterator.next();

        if (firstEntry.done == true)
            throw new Exceptions.LinqNoElementsException();

        let secondEntry: IteratorResult<T> = iterator.next();
        
        if (secondEntry.done == true)
            return firstEntry.value;

        throw new Exceptions.LinqMoreThenOneElementException();
    }



    public singleOrUndefined = (predicate?: (x: T) => boolean) : T | undefined => {
        let iterable : LinqIterableBase<T> = this;
        if (predicate) iterable = iterable.where(predicate);
        let iterator = iterable[Symbol.iterator]();
        
        let firstEntry: IteratorResult<T> = iterator.next();

        if (firstEntry.done == true)
            return undefined;

        let secondEntry: IteratorResult<T> = iterator.next();
        
        if (secondEntry.done == true)
            return firstEntry.value;

        throw new Exceptions.LinqMoreThenOneElementException();
    }



    public elementAt = (position : number) : T => {
        let iterable : LinqIterableBase<T> = this;
        
        // OPTIMIZATION FOR ARRAY AND LIST
        if (iterable instanceof LinqIterableProxy || iterable instanceof List)
        {
            let source = (iterable as any)._source; // private property
            if (source instanceof Array)
            {
                if (position > source.length - 1)
                    throw new Exceptions.LinqNotEnoughElementsException();
                else 
                    return source[position];
            }
        }

        
        let iterator = iterable[Symbol.iterator]();
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            if (position-- == 0)
                return entry.value;

        throw new Exceptions.LinqNotEnoughElementsException();
    }




    public elementAtOrUndefined = (position : number) : T | undefined => {
        let iterable : LinqIterableBase<T> = this;
        
        // OPTIMIZATION FOR ARRAY AND LIST
        if (iterable instanceof LinqIterableProxy || iterable instanceof List)
        {
            let source = (iterable as any)._source; // private property
            if (source instanceof Array)
            {
                if (position > source.length - 1)
                    return undefined;
                else 
                    return source[position];
            }
        }

        
        let iterator = iterable[Symbol.iterator]();
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            if (position-- == 0)
                return entry.value;

        return undefined;
    }


    public last = () : T => {
        let iterable : LinqIterableBase<T> = this;
        
        // OPTIMIZATION FOR ARRAY AND LIST
        if (iterable instanceof LinqIterableProxy || iterable instanceof List)
        {
            let source = (iterable as any)._source; // private property
            if (source instanceof Array)
            {
                if (source.length == 0)
                    throw new Exceptions.LinqNoElementsException();
                else 
                    return source[source.length - 1];
            }
        }
        
        
        let iterator = iterable[Symbol.iterator]();
        let firstEntry = iterator.next();
        let lastValue : T;

        if (firstEntry.done == true)
            throw new Exceptions.LinqNoElementsException();

        lastValue = firstEntry.value;

        let entry: IteratorResult<T>;
        
        while ((entry = iterator.next()).done == false) 
            lastValue = entry.value;

        return lastValue;
    }


    public lastOrUndefined = () : T | undefined => {
        let iterable : LinqIterableBase<T> = this;
        
        // OPTIMIZATION FOR ARRAY AND LIST
        if (iterable instanceof LinqIterableProxy || iterable instanceof List)
        {
            let source = (iterable as any)._source; // private property
            if (source instanceof Array)
            {
                if (source.length == 0)
                    return undefined;
                else 
                    return source[source.length - 1];
            }
        }
        
        
        let iterator = iterable[Symbol.iterator]();
        let firstEntry = iterator.next();
        let lastValue : T;

        if (firstEntry.done == true)
            return undefined;

        lastValue = firstEntry.value;

        let entry: IteratorResult<T>;
        
        while ((entry = iterator.next()).done == false) 
            lastValue = entry.value;

        return lastValue;
    }




    public undefinedIfEmpty = () : LinqIterableBase<T | undefined> => new LinqUndefinedIfEmptyIterable(this);
        

    public sequenceEquals : {
        (otherIterable : Iterable<T>) : boolean
        (array : Array<T>) : boolean
    } = (otherIterable : Iterable<T>) : boolean =>
    {
        let iterable1 : LinqIterableBase<T> = this;
        let iterator1 = iterable1[Symbol.iterator]();
        let entry1: IteratorResult<T>;

        let iterable2 : LinqIterableBase<T> = new LinqIterableProxy(otherIterable);
        let iterator2 = iterable2[Symbol.iterator]();
        let entry2: IteratorResult<T>;


        do {
            entry1 = iterator1.next();
            entry2 = iterator2.next();

            if (entry1.done != entry2.done) return false;
            if (entry1.done && entry2.done) return true;
            if (!LinqIterableBase.equals(entry1.value, entry2.value)) return false;
        } while (true);
    }
    
    public aggregate : {
        <TAcc>(accumulatorFunc: (a : TAcc, x : T) => TAcc, initialAccumulator : TAcc) : TAcc | undefined
        (accumulatorFunc: (acc : T, x : T) => T) : T | undefined
     } = (accumulatorFunc: (acc : any, x : T) => any, initialAccumulator? : any) : any =>
     {
        let currAcc : any;

        if (initialAccumulator)
            currAcc = initialAccumulator;

        let iterable : LinqIterableBase<T> = this;
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

        return currAcc;
    }



     //public toArray = () : T[] => Array.from(this);

     public toArray = () : T[] => {
        let result : T[] = [];

        let iterable : LinqIterableBase<T> = this;
        let iterator = iterable[Symbol.iterator]();
        let entry: IteratorResult<T>;
        
        while ((entry = iterator.next()).done == false) 
            result.push(entry.value);

        return result;
    }


    public toObject = <TValue>(keySelector : (x : T) => string, valueSelector: (x : T) => TValue) : {} => {
        let result = {};

        let iterable : LinqIterableBase<T> = this;
        let iterator = iterable[Symbol.iterator]();
        let entry: IteratorResult<T>;
        
        while ((entry = iterator.next()).done == false) 
            (result as any)[keySelector(entry.value)] = valueSelector(entry.value);

        return result;
    }


    public toList = () : List<T> => {
        return new List<T>(this);
    }



    

    public where = (predicate: (x: T) => boolean) : LinqIterableBase<T>  => new LinqWhereIterable(this, predicate); 

    public select = <TResult>(selector: (x: T, i?: number) => TResult)  : LinqIterableBase<TResult> => new LinqSelectIterable(this, selector);

    public ofType = <TResult>(type: { new(): TResult }) : LinqIterableBase<TResult> => new LinqOfTypeIterable(this, type);

    public cast = <TResult>()  : LinqIterableBase<TResult> => new LinqCastIterable<T, TResult>(this);

    public take = (count : number) : LinqIterableBase<T> => new LinqTakeIterable(this, count);

    public takeWhile = (predicate : (x : T) => boolean) : LinqIterableBase<T> => new LinqTakeWhileIterable(this, predicate);

    public skip = (count : number) : LinqIterableBase<T> => new LinqSkipIterable(this, count);

    public skipWhile = (predicate : (x : T) => boolean) : LinqIterableBase<T> => new LinqSkipWhileIterable(this, predicate);

    public orderBy = <TKey>(keySelector : (x : T) => TKey) : LinqOrderByIterable<T> => new LinqOrderByIterable(this, LinqIterableBase.keyComparer(keySelector, false));

    public orderByDescending = <TKey>(keySelector : (x : T) => TKey) : LinqOrderByIterable<T> => new LinqOrderByIterable(this, LinqIterableBase.keyComparer(keySelector, true));

    public reverse = () : LinqIterableBase<T> => new LinqReverseIterable(this);



    public selectMany : {
        <TResult>(selector : (x : T) => Iterable<TResult>) : LinqIterableBase<TResult>
        <TCollection, TResult>(selector : (x : T) => Iterable<TCollection>, finalSelector : (x : T, collection : TCollection) => TResult) : LinqIterableBase<TResult>
    } = <TCollection, TResult>(selector : (x : T) => Iterable<TCollection>, finalSelector? : (x : T, collection : TCollection) => TResult) : LinqIterableBase<TResult> => new LinqSelectManyIterable(this, selector, finalSelector);
    
    
    

    
    public join : {
        //overload 1
        <TRight, TLeftKey, TRightKey, TResult>(
            rightIterable : Iterable<TRight>
            , leftKeySelector : (item: T) => TLeftKey
            , rightKeySelector : (item: TRight) => TRightKey
            , finalSelector : (leftItem : T, rightItem : TRight) => TResult
        ) : LinqIterableBase<TResult>

        //overload 2
        <TRight, TLeftKey, TRightKey, TResult>(
            rightArray : TRight[]
            , leftKeySelector : (item: T) => TLeftKey
            , rightKeySelector : (item: TRight) => TRightKey
            , finalSelector : (leftItem : T, rightItem : TRight) => TResult
        ) : LinqIterableBase<TResult>
    } = <TRight, TLeftKey, TRightKey, TResult>(
        rightIterable : Iterable<TRight>
        , leftKeySelector : (item: T) => TLeftKey
        , rightKeySelector : (item: TRight) => TRightKey
        , finalSelector : (leftItem : T, rightItem : TRight) => TResult
    ) : LinqIterableBase<TResult> => new LinqJoinIterable(this, rightIterable, leftKeySelector, rightKeySelector, finalSelector);




    public groupJoin : {
        //overload 1
        <TRight, TLeftKey, TRightKey, TResult>(
            rightIterable : Iterable<TRight>
            , leftKeySelector : (item: T) => TLeftKey
            , rightKeySelector : (item: TRight) => TRightKey
            , finalSelector : (leftItem : T, rightGroup : LinqGrouping<TRightKey, TRight>) => TResult
        ) : LinqIterableBase<TResult>

        // overload 2
        <TRight, TLeftKey, TRightKey, TResult>(
            rightArray : TRight[]
            , leftKeySelector : (item: T) => TLeftKey
            , rightKeySelector : (item: TRight) => TRightKey
            , finalSelector : (leftItem : T, rightGroup : LinqGrouping<TRightKey, TRight>) => TResult
        ) : LinqIterableBase<TResult>
    } = <TRight, TLeftKey, TRightKey, TResult>(
        rightIterable : Iterable<TRight>
        , leftKeySelector : (item: T) => TLeftKey
        , rightKeySelector : (item: TRight) => TRightKey
        , finalSelector : (leftItem : T, rightGroup : LinqGrouping<TRightKey, TRight>) => TResult
    ) : LinqIterableBase<TResult> => new LinqGroupJoinIterable(this, rightIterable, leftKeySelector, rightKeySelector, finalSelector);



    
    public concat : {
        (otherIterable : Iterable<T>) : LinqIterableBase<T>
        (array : T[]) : LinqIterableBase<T>
    } = (otherIterable : Iterable<T>) : LinqIterableBase<T> => new LinqConcatIterable(this, otherIterable);


    public union : {
        (otherIterable : Iterable<T>) : LinqIterableBase<T>
        (array : T[]) : LinqIterableBase<T>
    } = (otherIterable : Iterable<T>) : LinqIterableBase<T> => (new LinqConcatIterable(this, otherIterable)).distinct();



    public intersect : {
        (otherIterable : Iterable<T>) : LinqIterableBase<T>
        (array : T[]) : LinqIterableBase<T>
    } = (otherIterable : Iterable<T>) : LinqIterableBase<T> => this.where(x => (new LinqIterableProxy(otherIterable).contains(x)));



    public except : {
        (otherIterable : Iterable<T>) : LinqIterableBase<T>
        (array : T[]) : LinqIterableBase<T>
    } = (otherIterable : Iterable<T>) : LinqIterableBase<T> => this.where(x => !(new LinqIterableProxy(otherIterable).contains(x)));


    
    
    public groupBy: {
        <TKey, TValue>(keySelector: (x: T) => TKey, valueSelector: (group : LinqGrouping<TKey, T>) => TValue) : LinqIterableBase<TValue>
        <TKey>(keySelector: (x: T) => TKey): LinqIterableBase<LinqGrouping<TKey, T>>
     } = <TKey>(keySelector: (x: T) => TKey, valueSelector?: (group : LinqGrouping<TKey, T>) => any) : LinqIterableBase<any> =>
     {
        if (!valueSelector) valueSelector = x => x;
        
        return new LinqGroupByIterable(this, keySelector, valueSelector);
     }



     public any : {
        () : boolean
        (predicate: (x: T) => boolean) : boolean
    } = (predicate?: (x: T) => boolean) : boolean => {
        let iterable : Iterable<T> = this;
        let iterator = iterable[Symbol.iterator]();
        let entry: IteratorResult<T>;
        if (predicate === undefined) predicate = x => true;
        while ((entry = iterator.next()).done == false) 
            if (predicate(entry.value))
                return true;
    }
     

    public all = (predicate: (x: T) => boolean) : boolean =>  !this.any(x => !predicate(x));
     
    public contains = (element : T) : boolean => this.any(x => LinqIterableBase.equals(x, element));

    
    public sum : {
        () : number
        (selector : (x: T) => number) : number
   } = (selector?: (x: T) => number) : number => {
       let iterable : LinqIterableBase<T> = this;
       let iterator = iterable[Symbol.iterator]();

       if (selector === undefined) selector = x => (x as any) as number;
       let result : number = 0;

       let entry: IteratorResult<T>;
       while ((entry = iterator.next()).done == false) 
           result += selector(entry.value);

       return result;
   }



   
   public min : {
        () : number | undefined
        (selector : (x: T) => number) : number | undefined
    } = (selector?: (x: T) => number) : number | undefined => {
    let iterable : LinqIterableBase<T> = this;
    let iterator = iterable[Symbol.iterator]();

    if (selector === undefined) selector = x => (x as any) as number;
    let result : number | undefined = undefined;

    let entry: IteratorResult<T>;
    while ((entry = iterator.next()).done == false) 
        {
            let n = selector(entry.value);
            if (result === undefined || result > n)
                result = n;
        }

    return result;
    }



    public max : {
        () : number | undefined
        (selector : (x: T) => number) : number | undefined
    } = (selector?: (x: T) => number) : number | undefined => {
        let iterable : LinqIterableBase<T> = this;
        let iterator = iterable[Symbol.iterator]();

        if (selector === undefined) selector = x => (x as any) as number;
        let result : number | undefined = undefined;

        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
        {
            let n = selector(entry.value);
            if (result === undefined || result < n)
                result = n;
        }

        return result;
    }


    public count : {
        () : number
        (predicate : (x: T) => boolean) : number
    } = (predicate?: (x: T) => boolean) : number => {
        let iterable : LinqIterableBase<T> = this;
        if (predicate !== undefined) iterable = iterable.where(predicate);
        let iterator = iterable[Symbol.iterator]();

        let result : number = 0;

        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            result++;

        return result;
    }


    public average : {
        () : number | undefined
        (selector : (x: T) => number) : number | undefined
    } = (selector?: (x: T) => number) : number | undefined => {
        var count = this.count();
        if (count == 0) return undefined;

        if (selector === undefined) selector = x => (x as any) as number;

        var sum = this.sum(selector);

        return sum / count;
    }


    public distinct = () : LinqIterableBase<T> => new LinqGroupByIterable(this, x => x, g => g.first());

}



export class LinqIterableProxy<T> extends LinqIterableBase<T> {
    constructor(protected _source : Iterable<T> = new Array<T>()) 
    { 
        super();
    }
    
    protected getIterator() : Iterator<T> {
        return this._source[Symbol.iterator]();
    }
}




export class KeyValuePair<TKey, TValue> {
    constructor(public key : TKey, public value : TValue) { }
}








export class LinqGroupByIterable<TSource, TKey, TValue> extends LinqIterableBase<TValue> {
    constructor(
        private source: Iterable<TSource>
        , private keySelector: (x: TSource) => TKey
        , private valueSelector: (group : LinqGrouping<TKey, TSource>) => TValue
    ) {
        super();
    }

    protected getIterator(): Iterator<TValue> {
        return this.algo();
    }

    private algo() : Iterator<TValue> {


        //access private member
        
        type TmpAcc = LinqGrouping<TKey, TSource>;

        
        let result = new LinqIterableProxy(this.source).aggregate<List<TmpAcc>>(
            (acc : List<TmpAcc>, v : TSource) => 
            {
                let group = new LinqIterableProxy(acc).singleOrUndefined(x => LinqIterableBase.equals(x.key, this.keySelector(v))); 
    
                if (group !== undefined)
                    group.elements.push(v);
    
                else {
                    let groupData = new Array<TSource>();
                    groupData.push(v);
                    acc.add(new LinqGrouping(this.keySelector(v), groupData));
                }
    
                return acc;
            }
            
            
            , new List<TmpAcc>()
    
        );
    
        return result.select(this.valueSelector)[Symbol.iterator]();
    }
}


export class LinqSelectManyIterable<T, TCollection, TResult> extends LinqIterableBase<TResult> {
    constructor(
        private source: Iterable<T>
        , private selector: (x : T) => Iterable<TCollection>
        , private finalSelector? : (x : T, collection : TCollection) => TResult
    ) {
        super();
    }

    protected getIterator(): Iterator<TResult> {
        return this.algo();
    }

    private * algo() {
        if (this.finalSelector == undefined) this.finalSelector = (outer, inner) => (inner as any) as TResult;

        let iterator = this.source[Symbol.iterator]();
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
        {
            let innerIterable = new LinqIterableProxy(this.selector(entry.value));
            let innerIterator = innerIterable[Symbol.iterator]();
            let innerEntry: IteratorResult<TCollection>;

            while ((innerEntry = innerIterator.next()).done == false) 
                yield this.finalSelector(entry.value, innerEntry.value);
        }


         /*
        for (let entry of source)
            for (let innerEntry of selector(entry))
                yield innerEntry;
        */
    }
}



export class LinqJoinIterable<TLeft, TRight, TLeftKey, TRightKey, TResult> extends LinqIterableBase<TResult> {
    constructor(
        private _leftSource: Iterable<TLeft>
        , private _rightSource: Iterable<TRight>
        , private _leftKeySelector : (item: TLeft) => TLeftKey
        , private _rightKeySelector : (item: TRight) => TRightKey
        , private _finalSelector : (leftItem : TLeft, rightItem : TRight) => TResult
    ) {
        super();
    }

    protected getIterator(): Iterator<TResult> {
        return this.algo();
    }

    private * algo() {
       
        let leftIterator = this._leftSource[Symbol.iterator]();
        let leftEntry: IteratorResult<TLeft>;
        while ((leftEntry = leftIterator.next()).done == false)
        {
            let rightIterator = this._rightSource[Symbol.iterator]();
            let rightEntry: IteratorResult<TRight>;
            while ((rightEntry = rightIterator.next()).done == false)
            {

                let leftKey = this._leftKeySelector(leftEntry.value);
                let rightKey = this._rightKeySelector(rightEntry.value);

                if (LinqIterableBase.equals(leftKey, rightKey)) yield this._finalSelector(leftEntry.value, rightEntry.value);

            } 
        } 


    }
}





export class LinqGroupJoinIterable<TLeft, TRight, TLeftKey, TRightKey, TResult> extends LinqIterableBase<TResult> {
    constructor(
        private _leftSource: Iterable<TLeft>
        , private _rightSource: Iterable<TRight>
        , private _leftKeySelector : (item: TLeft) => TLeftKey
        , private _rightKeySelector : (item: TRight) => TRightKey
        , private _finalSelector : (leftItem : TLeft, rightItem : LinqGrouping<TRightKey, TRight>) => TResult
    ) {
        super();
    }

    protected getIterator(): Iterator<TResult> {
        return this.algo();
    }

    private * algo() {
        let groupedRight = new LinqIterableProxy(this._rightSource).groupBy(this._rightKeySelector);
        let tmp = groupedRight.toArray();
       
        let leftIterator = this._leftSource[Symbol.iterator]();
        let leftEntry: IteratorResult<TLeft>;
        while ((leftEntry = leftIterator.next()).done == false)
        {
            let leftKey = this._leftKeySelector(leftEntry.value);

            let rightGroup = groupedRight.singleOrUndefined(x =>LinqIterableBase.equals(x.key, leftKey));

            if (rightGroup === undefined)
                rightGroup = new LinqGrouping((leftKey as any) as TRightKey, [] as Array<TRight>);

            yield this._finalSelector(leftEntry.value, rightGroup);

        } 


    }
}



export class LinqConcatIterable<T> extends LinqIterableBase<T> {
   
    constructor(
        private source1: Iterable<T>
        , private source2: Iterable<T>
    ) {
        super();
    }

    protected getIterator(): Iterator<T> {
        return this.algo();
    }

    private * algo() {


        let iterator = this.source1[Symbol.iterator]();
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            yield entry.value;

        iterator = this.source2[Symbol.iterator]();
        while ((entry = iterator.next()).done == false) 
            yield entry.value;


         /*
        for (let entry of source1)
            yield entry;

        for (let entry of source2)
            yield entry;
        */
    }
}

export class LinqReverseIterable<T> extends LinqIterableBase<T> {
    
    constructor(
        private _source: Iterable<T>
    ) {
        super();
    }

    protected getIterator(): Iterator<T> {
        return this.algo();
    }

    private algo() : Iterator<T> {
        let array : T[];
        let iterable = this._source;

        // OPTIMIZATION FOR ARRAY AND LIST
        if (iterable instanceof LinqIterableProxy || iterable instanceof List)
        {
            let source = (iterable as any)._source; // private property
            if (source instanceof Array)
                array = source;
        }
        else
            array = new LinqIterableProxy(this._source).toArray();

        
        array.reverse();

        return (new LinqIterableProxy(array))[Symbol.iterator]();
    }
}





export class LinqTakeIterable<T> extends LinqIterableBase<T> {
    
    constructor(
        private _source: Iterable<T>
        , private _count : number
    ) {
        super();
    }

    protected getIterator(): Iterator<T> {
        return this.algo();
    }

    private * algo() : IterableIterator<T> {
        let iterator = this._source[Symbol.iterator]();
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            if (--this._count >= 0)
                yield entry.value;
            else
                return;
    }
}


export class LinqTakeWhileIterable<T> extends LinqIterableBase<T> {
    
    constructor(
        private _source: Iterable<T>
        , private _predicate: (x : T) => boolean
    ) {
        super();
    }

    protected getIterator(): Iterator<T> {
        return this.algo();
    }

    private * algo() : IterableIterator<T> {
        let iterator = this._source[Symbol.iterator]();
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            if (this._predicate(entry.value))
                yield entry.value;
            else
                return;
    }
}


export class LinqSkipIterable<T> extends LinqIterableBase<T> {
   
    constructor(
        private _source: Iterable<T>
        , private _count : number
    ) {
        super();
    }

    protected getIterator(): Iterator<T> {
        return this.algo();
    }

    private * algo() {
        let iterator = this._source[Symbol.iterator]();
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            if (--this._count < 0)
                yield entry.value;
    }
}



export class LinqSkipWhileIterable<T> extends LinqIterableBase<T> {
   
    constructor(
        private _source: Iterable<T>
        , private _predicate: (x : T) => boolean
    ) {
        super();
    }

    protected getIterator(): Iterator<T> {
        return this.algo();
    }

    private * algo() {
        let doSkip = true;

        let iterator = this._source[Symbol.iterator]();
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            if (!doSkip)
                yield entry.value;
            else
            {
                if (!this._predicate(entry.value))
                {
                    doSkip = false;
                    yield entry.value;
                }
            }
    }
}




export class LinqCastIterable<TSource, TResult> extends LinqIterableBase<TResult> {
    
    constructor(
        private source: Iterable<TSource>
    ) {
        super();
    }

    protected getIterator(): Iterator<TResult> {
        return this.algo();
    }

    private * algo(): Iterator<TResult> {


        let iterator = this.source[Symbol.iterator]();
        let entry: IteratorResult<TSource>;
        while ((entry = iterator.next()).done == false) 
            yield (entry.value as any) as TResult;
        

        /*
        for (let entry of source)
            yield (entry.value as any) as TResult;
        */
    }
}




export class LinqOfTypeIterable<TSource, TResult> extends LinqIterableBase<TResult> {
    
    constructor(
        private source: Iterable<TSource>
        , private type: { new(): TResult }
    ) {
        super();
    }


    protected getIterator(): Iterator<TResult> {
        return this.algo();
    }

    private * algo(): IterableIterator<TResult> {
        let iterator = this.source[Symbol.iterator]();
        let entry: IteratorResult<TSource>;
        while ((entry = iterator.next()).done == false) 
            if (entry.value instanceof this.type)
                yield entry.value as TResult;
        

        /*
        for (let entry of source)
              if (entry.value instanceof type)
                    yield entry as TResult;
        */
    }
}


export class LinqSelectIterable<TSource, TResult> extends LinqIterableBase<TResult> {
    constructor(
        private source: Iterable<TSource>
        , private selector: (x: TSource, i?: number) => TResult
    ) {
        super();
    }

    protected  getIterator(): Iterator<TResult> {
        return this.algo();
    }

    private * algo(): IterableIterator<TResult> {
        let index = 0;
        let iterator = this.source[Symbol.iterator]();
        let entry: IteratorResult<TSource>;
        while ((entry = iterator.next()).done == false) 
            yield this.selector(entry.value, index++);
        

        /*for (let entry of source)
               yield selector(entry);*/
    }
}



export class LinqWhereIterable<T> extends LinqIterableBase<T> {
    
    constructor(
        private source: Iterable<T>
        , private predicate: (x: T) => boolean
    ) {
        super();
    }

    protected getIterator(): Iterator<T> {
        return this.algo();
    }

    private * algo(): IterableIterator<T> {
        let iterator = this.source[Symbol.iterator]();
        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            if (this.predicate(entry.value))
                yield entry.value;
        

        /*for (let entry of source)
                if (predicate(entry))
                    yield entry;*/
    }

}



export class LinqOrderByIterable<T> extends LinqIterableBase<T> {
    
    constructor(
        private source: Iterable<T>
        , private comparer : (a: T, b: T) => number
    ) {
        super();
    }

    protected getIterator(): Iterator<T> {
        return this.algo();
    }

    private algo(): Iterator<T> {
        let proxy = new LinqIterableProxy(this.source);
        let array = proxy.toArray();

        let sortedArray = array.sort(this.comparer);

        return (new LinqIterableProxy(sortedArray))[Symbol.iterator]();
    }


    public thenBy<TKey>(keySelector : (x : T) => TKey) : LinqOrderByIterable<T> {
        return new LinqOrderByIterable(this, LinqIterableBase.composeComparers(this.comparer, LinqIterableBase.keyComparer(keySelector, false)));
    }

    public thenByDescending<TKey>(keySelector : (x : T) => TKey) : LinqOrderByIterable<T> {
        return new LinqOrderByIterable(this, LinqIterableBase.composeComparers(this.comparer, LinqIterableBase.keyComparer(keySelector, true)));
    }

}


export class LinqUndefinedIfEmptyIterable<T> extends LinqIterableBase<T | undefined> {
    
    constructor(
        private source: Iterable<T>
    ) {
        super();
    }

    protected getIterator(): Iterator<T | undefined> {
        return this.algo();
    }

    private * algo(): IterableIterator<T | undefined> {
        let iterator = this.source[Symbol.iterator]();
        
        let firstEntry = iterator.next();
        if (firstEntry.done)
        {
            yield undefined;
            return;
        }
        else
            yield firstEntry.value;

        let entry: IteratorResult<T>;
        while ((entry = iterator.next()).done == false) 
            yield entry.value;
    }

}


export class List<T> extends LinqIterableProxy<T> {
    constructor(source : Iterable<T> = new Array<T>()) {
        super(source instanceof Array ? source : new LinqIterableProxy(source).toArray());
    }

    public get elements() : T[] { return this._source as T[]; }

    public add = (item : T) : void =>  { this.elements.push(item); }

    public clear = () : void => { this._source = new Array<T>(); }

    public remove = (item : T) : void => {
        var index = this.indexOf(item);
        this.removeAt(index);
    }
    
    public indexOf = (item : T) : number => {
        var indexOrDefault = this
            .select((x, i) => { return  { x: x, i: i }; })
            .firstOrUndefined(x => LinqIterableBase.equals(x.x, item) );

        if (indexOrDefault === undefined)
            return -1;

        return indexOrDefault.i;
    }
    
    public insert(index: number, item : T) {
        this.elements.splice(index, 0, item);
    }

    
    public removeAt = (index : number) : void => {
        this.elements.splice(index, 1);
    }
}


export class LinqGrouping<TKey, TValue> extends List<TValue> {
    
    constructor(key : TKey, elements : TValue[] = []) {
        super(elements);
        this._key = key;
    }

    protected getIterator() : Iterator<TValue> {
        return this.elements[Symbol.iterator]();
    }

    private _key: TKey;
    public get key(): TKey { return this._key };
}




