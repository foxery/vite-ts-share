/** any unknown 区别 */

function format1(value: any) {
    value.toFixed(2); // dangerous
}

function format2(value: unknown) {
    // value.toFixed(2); // 'value' is of type 'unknown'

    // 需要收窄类型范围，例如：

    // 1、类型断言 —— 执行时可能错误
    (value as Number).toFixed(2);

    // 2、类型守卫 —— 确保正常执行
    if (typeof value === 'number') {
        // 推断出类型: number
        value.toFixed(2);
    }

    // 3、类型断言函数，抛出错误 —— 确保正常执行
    assertIsNumber(value);
    value.toFixed(2);
}


/** 类型断言函数，抛出错误 */
function assertIsNumber(arg: unknown): asserts arg is Number {
    if (!(arg instanceof Number)) {
        throw new TypeError('Not a Number: ' + arg);
    }
}

/** never */

// 异常
function err(msg: string): never { // OK
    throw new Error(msg);
}

// 死循环
function loopForever(): never { // OK
    while (true) { };
}

declare const n: never;
let num2: number = 4;
let str = 'a';

num2 = n;// OK
// num2 = str;// error

/** never 与 null/undefined */

let a: null = n; // OK
let b: undefined = n; // OK

let ne: never;

// ne = null; // error
// ne = undefined; // error

declare const an: any;
// ne = an; // error

ne = n; // OK