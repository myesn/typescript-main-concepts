/**
 * 泛型
 *
 * 泛型(Generics)是指在定义函数、接口或类时，不预先指定具体的类型，
 * 而在使用时再指定类型的一种特性
 */

// 实现函数 createArray，创建指定长度的数组，同时为每一项填充默认值
// 数组中每一项都是 value 的类型
function createArray<T>(length: number, value: T): Array<T> {
  let result = [];

  for (let i = 0; i < length; i++) {
    result[i] = value;
  }

  return result;
}
createArray<string>(3, '');
createArray(3, '');
createArray<number>(3, 0);
createArray(3, 0);

// 多个类型参数
// 输出交换输入的元组
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

// 泛型约束 使用 extends 关键字约束泛型类型
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(args: T): T {
  console.log(args.length);
  return args;
}
loggingIdentity('');
// loggingIdentity(7); // compile error, number 类型不符合 Lengthwise 类型，即没有 length 属性
// 多个类型参数之间也可以互相约束
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });

// 泛型接口
// 使用接口的方式来定义一个函数需要符合的形状
// interface SearchFunc2 {
//   (source: string, subString: string): boolean;
// }
// let mySearch2: SearchFunc2;
// mySearch2 = function (source: string, subString: string) {
//   return source.search(subString) !== -1;
// };
interface CreateArrayFunc2 {
  <T>(length: number, value: T): Array<T>;
}
let createArray2: CreateArrayFunc2;
createArray2 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};
createArray2(3, '');
// 可以把泛型参数提前到接口名上
interface CreateArrayFunc3<T> {
  (length: number, value: T): Array<T>;
}
// 使用泛型接口时，需要定义泛型的类型
let createArray3: CreateArrayFunc3<any>;
createArray3 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};
createArray3(3, '');

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;

// 泛型参数的默认类型
// ts 2.3 以后，可以为泛型中的类型参数指定默认类型
// 当使用泛型时没有再代码中直接指定类型参数，从实际指参数中也无法推测出时，默认类型就会起作用
function createArray4<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
