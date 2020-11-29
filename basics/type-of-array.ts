/**
 * 数组的类型
 *
 * 在 TypeScript 中，数组类型有多种定义方式，比较灵活
 */

// 「类型 + 方括号」表示法
let fibonacci: number[] = [1, 2]; // 项中不允许出现 number 以外类型的值
//fibonacci.push(1, '1'); // compile error，数组方法的参数也会被约束

// 数组泛型
let fibonacci2: Array<number> = [1, 2];

// 用接口表示数组(也可以叫做类数组)
interface NumberArray {
  [indffdaex: number]: number | string; // 只有一个索引，索引属性名可以随便写（约束索引的类型为数字），这种写法是任意属性的写法
}
let fibonacci3: NumberArray = [1, 2, '1'];

// 类数组
// 类数组（Array-like Object）不是数组类型，比如 arguments
function sum() {
  //let args: number[] = arguments; // compile errro

  // arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口
  let args: {
    [index: number]: number; // 约束索引类型为数字
    length: number; // 约束拥有该属性
    callee: Function; // 约束拥有该属性
  } = arguments;

  // in fact，常用的类数组都有自己的接口定义，如 IArguments，NodeList，HTMLCollection
  // 这些被称为内置对象(standard built-in objects)
  let args2: IArguments = arguments;
  // 其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是
  // interface IArguments {
  //   [index: number]: any;
  //   length: number;
  //   callee: Function;
  // }
}

// any 在数组中的应用，即数组中允许出现任意类型
let list: any[] = [1, '1', true, {}, []];
