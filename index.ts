import * as _ from "./global-extensions"
import * as Linq from "./linq"


//var x = new Linq<number>();

class TestClass implements TestInterface {
    /**
     *
     */


    constructor(myField? : number, myField2?: number) {
        if (myField)
            this.myField = myField;

        if (myField2)
            this.myField2 = myField2;
    }
    
    public myField: number = 0;
    public myField2: number = 0;
    public myArray: number[] = [111, 222, 333, 444];
}

class TestInterface {
    myField : number;
}


export class Tests {
    public static run() {
        let nums: number[] = [5,3,4,1,9,2,8,0,6,7];
        let testClass = new TestClass(100);
        let anys: any[] = ["ciao", 3, true, false, 0, undefined, "albero", {}, testClass, 3, 3, {}, testClass];
        let testClasses = [new TestClass(200, 8), new TestClass(100, 8), new TestClass(100, 5), new TestClass(200, 1)];
        let strings = ["ciao", "albero", "casa", "si", "no", "forse"];


     


        console.log('TEST 01: test where');

        let query01 = nums.asLinq()
            .where(x => x % 3 == 0)
            ;

        console.log(query01.toArray());


        

        console.log('TEST 02: test select');
        
        let query02 = nums.asLinq()
            .select(x => x + 5);

        console.log(query02.toArray());



        console.log('TEST 03: test ofType');
        
        let query03 = anys.asLinq()
            .ofType(TestClass);

        console.log(query03.toArray());



        console.log('TEST 04: test cast');
        
        let query04 = testClasses.asLinq()
            .cast<TestInterface>()
            .where(x => x.myField == 100);

        console.log(query04.toArray());



        let item : any;

        console.log('TEST 05: test first');
        
        item = anys.asLinq()
            .ofType(TestClass)
            .first();

        console.log(item);


        console.log('TEST 06: test first with predicate');
        
        item = nums.asLinq()
            .first(x => x === 3);

        console.log(item);



        console.log('TEST 07: test skip and take');
        
        let query07 = anys.asLinq()
            .skip(2)
            .take(3);

        console.log(query07.toArray());




        console.log('TEST 08: test aggregate no initial value');
        
        item = nums.asLinq()
            .aggregate((acc, x) => acc += x);

        console.log(item);



        console.log('TEST 09: test aggregate on objects with initial value');
        
        item = testClasses.asLinq()
            .aggregate((acc, x) => acc += x.myField, 0);

        console.log(item);




        console.log('TEST 10: test groupBy (number field)');
        
        let query10 = testClasses.asLinq()
            .groupBy(x => x.myField);

        console.log(query10.toArray());



        console.log('TEST 11: test groupBy (object)');
        
        let query11 = testClasses.asLinq()
            .groupBy(x => x);

        console.log(query11.toArray());



        console.log('TEST 12: test groupBy and aggregation functions (min, max, sum, average, count)');
        
        let query12 = nums.asLinq()
            .groupBy(x => x % 3 == 0, g => 
            {
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
        
        let query13 = testClasses.asLinq()
            .selectMany(x => x.myArray);

        console.log(query13.toArray());




        console.log('TEST 14: test distinct on several types altogheter');
        
        let query14 = anys.asLinq()
            .distinct();

        console.log(query14.toArray());




        console.log('TEST 15: test contains on object');
        
        item = anys.asLinq()
            .contains(testClass);

        console.log(item);



        console.log('TEST 16: test concat on anys');
        
        let query16 = anys.asLinq()
            .concat(nums);

        console.log(query16.toArray());




        console.log('TEST 17: test union on anys');
        
        let query17 = anys.asLinq()
            .union(nums);

        console.log(query17.toArray());




        console.log('TEST 18: test intersect on anys');
        
        let query18 = anys.asLinq()
            .intersect(nums);

        console.log(query18.toArray());




        console.log('TEST 19: test intersect on anys');
        
        let query19 = anys.asLinq()
            .except(nums);

        console.log(query19.toArray());



        console.log('TEST 20: test join on strings');
        
        let query20 = strings.asLinq()
                .join(strings, l => l.substr(0, 1), r => r.substr(0,1) , (l, r) => l.substr(0, 1).toUpperCase() + ': ' + l + ' ' + r);

        console.log(query20.toArray());




        console.log('TEST 21: test linq on string');
        
        let query21 = "che bello che è il linq".asLinq()
            .where(x => x == "c" || x == "e" || x == " " || x == "q");

        console.log(query21.toArray().join(""));




        console.log('TEST 21: test linq on object');

        let q22test = {
            albero: 99,
            casa: 33,
            computer: 1,
            macchina: 99
        };
        
        let query22 = q22test.asLinq()
            .where(x => x.value > 10)
            .where(x => x.key.indexOf("c") > -1)
            ;

        console.log(query22.toArray());



        console.log('TEST 23: test orderBy');
        
        let query23 = nums.asLinq()
            .orderBy(x => x);

        console.log(query23.toArray());




        console.log('TEST 24: test orderBy + thenBy');
        
        let query24 = testClasses.asLinq()
            .orderBy(x => x.myField)
            .thenBy(x => x.myField2)
            ;

        console.log(query24.toArray());




        console.log('TEST 25: test undefinedIfEmpty');
        
        let query25 = [].asLinq()
            .undefinedIfEmpty()
            ;

        console.log(query25.toArray());




        console.log('TEST 26: test elementAt on iterable');
        
         item = nums.asLinq()
            .where(x => x % 2 == 0)
            .elementAt(2)
            ;

        console.log(item);



        console.log('TEST 27: test elementAt on array (optimization)');
        
         item = nums.asLinq()
            .elementAt(2)
            ;

        console.log(item);





        console.log('TEST 28: test last on iterable');
        
         item = nums.asLinq()
            .where(x => x % 2 == 0)
            .last()
            ;

        console.log(item);



        console.log('TEST 29: test elementAt on array (optimization)');
        
         item = nums.asLinq()
            .last()
            ;

        console.log(item);




        console.log('TEST 30: test groupJoin');
        
        let query30 = nums.asLinq()
            .groupJoin(testClasses, l => l, r => r.myField2, (l, g) => { return {
                num: l,
                testClasses: g.toArray(),
                count: g.count()
            }; })
            ;

        console.log(query30.toArray());




        console.log('TEST 31: toObject');
        
        item = strings.asLinq()
            .toObject(x => x, x => x.length);

        console.log(item);




        console.log('TEST 32: skipWhile + takeWhile');
        
        let query32 = nums.asLinq()
            .skipWhile(x => x != 4)
            .takeWhile(x => x != 8)
            ;

        console.log(query32.toArray());



        console.log('TEST 33: sequenceEquals');
        
        item = nums.asLinq()
            .sequenceEquals(nums)
            ;

        let item2 = nums.asLinq()
            .sequenceEquals(nums.asLinq().skip(1))
            ;

        console.log('true?: ' + item + '   false?: ' + item2);




        console.log('TEST 34: reverse');
        
        let query34 = nums.asLinq()
            .reverse() 
            ;

        console.log(query34.toArray());




        console.log('TEST 35: test selectMany');
        
        let query35 = testClasses.asLinq()
            .selectMany(x => x.myArray, (o, i) => [o.myField, i]);

        console.log(query35.toArray());
    }
}