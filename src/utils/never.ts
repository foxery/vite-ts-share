/** Unreachable code 检查 */

function throwError() {
    throw new Error();
}

// 手动标记上了 never 类型，那么 msg 的类型将会在空检查之后收窄为 string
// function throwError():never {
//     throw new Error();
// }

function firstChar(msg: string | undefined) {
    if (msg === undefined) {
        throwError();
    }
    // 由于编译器不知道 throwError 是一个无返回的函数，所以 throwError() 之后的代码被认为在任意情况下都是可达的，让编译器误会 msg 的类型是 string | undefined
    // let chr = msg.charAt(1) // 'msg' is possibly 'undefined'.
}

/** 类型运算 */
/** 最小因子 */
async function fetchNameWithTimeout(userId: string): Promise<string> {
    // function race<A, B>(inputs: [Promise<A>, Promise<B>]): Promise<A | B>
    // { userName: string } | never => { userName: string }
    const data = await Promise.race([
        fetchData(userId),
        timeout(3000)
    ]);
    return data.userName;
}

// never 改成 any会发生什么?
// 改成 unknown 呢？
function timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Timeout!")), ms)
    });
}

function fetchData(userId: string): Promise<{ userName: string }> {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve({ userName: 'zhang san' });
        }, 5000);
    });
}

/** 条件类型 */

// 从 T 中排除 null 和 undefined 
type NullOrUndefined = null | undefined;
type NonNullableA<T> = T extends NullOrUndefined ? never : T;
// 运算过程
// type NonNullableA<string | null>
// 联合类型被分解成多个分支单独运算
// => (string extends NullOrUndefined ? never : string) | (null extends  NullOrUndefined ? never : null)
// 多个分支得到结果，再次联合
// => string | never
// never 在联合类型运算中被消解
// => string


/** Exhaustive Check */
interface A {
    type: 'a'
}

interface B {
    type: 'b'
}

interface C {
    type: 'c'
}

// type All = A | B;
type All = A | B | C;

function handleValue(val: All) {
    switch (val.type) {
        case 'a':
            // val 此时是 A
            break;
        case 'b':
            // val 此时是 B
            break;
        default:
            // val 此时是 never
            // const exhaustiveCheck: never = val;//val此时是 C. Type 'C' is not assignable to type 'never'
            break;
    }
}