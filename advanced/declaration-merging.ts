/**
 * 声明合并
 *
 * 如果定义了两个相同名字的函数、接口或类，那么它们灰合并成一个类型
 */

// 函数的合并
// 使用重载定义多个函数类型
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
reverse(1);
reverse('');
let b: number | string;
reverse(b);

// 接口的合并
// 接口中的属性在合并时会简单的合并到一个接口中
// 注意：合并的属性的类型必须是唯一的
// 接口中方法的合并，与函数的合并一样
interface IA {
  price: number;
  a: number;
  alert(s: string): string;
}
interface IA {
  price: number;
  // a: string; // compile error, 类型不一致
  weight: number;
  alert(s: string, n: number): string;
}
let b1: IA;
console.log(b1.price);
console.log(b1.weight);
b1.alert('');
b1.alert('', 1);

// 类的合并
// 类的合并规则和接口的合并规则一致