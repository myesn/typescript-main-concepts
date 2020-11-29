/**
 * 联合类型
 *
 * 联合类型（Union Types）表示取值可以为多种类型中的一种
 * 联合类型使用 | 分隔每个类型
 * 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
 */

let a1: string | number;
a1 = 'myesn';
a1 = 1;
//a1 = true; // compile error

// 访问联合类型的属性或方法
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
// function getLength(something: string| number): number{
//   return something.length; // compile error，number 类型的变量没有 length 属性
// }

function getLength(something: string| number): string{
  return something.toString(); // 共有属性
}