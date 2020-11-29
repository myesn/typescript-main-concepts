/**
 * 原始数据类型
 * 
 * https://www.typescriptlang.org/docs/handbook/basic-types.html
 * JavaScipt 类型分为原始数据类型（Primitive data types）和对象类型（Object types）
 * 原始数据类型包括：boolean、number、string、null、undefined、Symbol（ES6）、BitInt（ES6）
 */

// 布尔值
// boolean 是原始(primitive)类型，Boolean 是包装对象，二者不相等，应该尽可能的使用原始类型
let isDone: boolean = false;
//let createdByNewBoolean: boolean = new Boolean(1);// new Boolean(1) or Boolean(1)

// 数值
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// 二进制和八进制，最后会被编译为十进制数字
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010; // 10
// ES6 中的八进制表示法
let octalLiteral: number = 0o744; // 484
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

// 字符串
let myName: string = 'myesn';
let myAge: number = 2;
// 模板字符串
let sentence: string = `Hello, name: ${myName} age: ${myAge + 1}`;

// 空值
// 用 void 表示没有任何返回值的函数
function alertName(): void {
  alert(1);
}
// 声明一个 void 类型的变量没有什么用，只能赋值为 undefined or null
let unusable: void = undefined;

// Null 和 Undefined
// 与 void 的区别是， null 和 undefined 是所有类型的子类型
// 也就是说任何类型都可以赋值为 null 和 undefined
let u: undefined = undefined;
let n: null = null;
let num: number = u || n;
//let num: number = unusable; // 不能将 void 赋值给所有类型
