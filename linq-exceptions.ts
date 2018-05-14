export class LinqNoElementsException extends Error {
    constructor() { super("The iterable contains no elements"); }
}


export class LinqMoreThenOneElementException extends Error {
    constructor() { super("The iterable contains more then one element"); }
}


export class LinqNotEnoughElementsException extends Error {
    constructor() { super("The iterable does not contains enough elements"); }
}