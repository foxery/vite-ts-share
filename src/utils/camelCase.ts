// snake_case转camelCase
type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${P1}${Uppercase<P2>}${CamelCase<P3>}`
    : S;

type Camelize<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends Array<infer U>
    ? U extends {}
      ? Array<Camelize<U>>
      : T[K]
    : T[K] extends {}
    ? T[K] extends Date
      ? T[K]
      : Camelize<T[K]>
    : T[K];
};

function camelize<T>(obj: T): T extends String ? string : Camelize<T> {
  return snakeToCamel(obj as Record<string, any>);
}

function snakeToCamel(obj: Record<string, any>): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item));
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_\w/g, (m) => m[1].toUpperCase());
      acc[camelKey] = snakeToCamel(obj[key]);
      return acc;
    }, {} as Record<string, any>);
  }
  return obj;
}

const my = {
  my_name: "zhang san",
  my_age: 18,
};

my.my_age;
my.my_name;

const me = camelize({
  my_name: "zhang san",
  my_age: 18,
});

console.log(me);
