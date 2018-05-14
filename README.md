# linq.ts
## Implementation of LinQ using iterators for TypeScript

This is an implementation of LinQ in TypeScript using iterators. 

`for-in` loops has not been used so the code can also target ES5

Many functionalities are not fully tested


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


