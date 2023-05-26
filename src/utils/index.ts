/** 泛型 和 extends */

interface IPerson {
  name: string;
}

const getName = <T extends IPerson>(arr: Array<T>) => {
  return arr.map((v) => v.name);
};

// getName([{ age: 18 }]); // error
getName([{ age: 18, name: "zhang san" }]); // 输出 [ 'zhang san' ]
getName([{ height: 180, name: "zhang san" }]); // 输出 [ 'zhang san' ]
getName([]);

/** 泛型约束 */
// 确保参数 key 一定是对象中含有的键
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let girl = {
  age: 18,
  height: 160,
  gender: "女",
};

const age = getProperty(girl, "age"); // OK
// const weight = getProperty(girl, "weight"); // error

/** 类型分配 */
// A extends B，是指类型A可以分配给类型B，而不是说类型A是类型B的子集
type student = {
  name: string;
  no: number;
};
type boy = {
  name: string;
};
type bool = boy extends student ? "yes" : "no"; // bool => 'no'

/** infer */
// 从复杂类型中提取基础类型
type Promisify<T> = T extends Promise<infer U> ? U : T;
type response = Promisify<Promise<IPerson[]>>;

/** as */

type Person = {
  name: string;
  age: number;
};

type Getters<T> = {
  // keyof 返回类型是联合类型  'name' | 'age'
  [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K];
};

type MappedPerson = Getters<IPerson>; // { getName:()=>string }

/** Record */
// 定义一个对象的 key 和 value
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
