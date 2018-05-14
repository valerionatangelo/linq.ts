# linq.ts
## Implementation of LinQ using iterators for TypeScript

This is a full implementation of LinQ in TypeScript using iterators. 

`for-in` loops has not been used so the code can also target ES5

Many functionalities are not fully tested.

The methods `singleOrDefault`, `firstOrDefault`, `elementAtOrDefault`, `lastOrDefault`, `defaultIfEmpty` have been replaced with `singleOrUndefined`, `firstOrUndefined`, `elementAtOrUndefined`, `lastOrUndefined`, `undefinedIfEmpty` because of the language limitations.

The code extends `Array`, `Map`, `Set` and `String` prototypes with a `asLinq()` method (see examples in index.ts for more information).

There are also `Linq.fromArray`, `Linq.fromMap`, `Linq.fromSet`, `Linq.fromString` and `Linq.fromObject` methods.

A simple implementation of `List<T>` is also present.


## How to use

#### Basic usage using `asLinq()` and `toArray()`:

```typescript

import * as _ from "global-extensions"
import * as Linq from "linq"

let nums: number[] = [5,3,4,1,9,2,8,0,6,7];

let query01 = nums.asLinq()
	.where(x => x % 3 == 0)
	;

console.log(query01.toArray());

```


#### Advanced usage

Please refer to index.ts for examples on more advanced usage. This readme file might be updated in the future with more detailed tutorials.
