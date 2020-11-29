/**
 * 函数的类型
 *
 * 函数是 JavaScript 中的一等公民
 */

// 函数声明，常见的有两种：
// 函数声明（Function Declaration）
function sum2() {}
// 函数表达式（Function Expression）
let sum3 = function () {};
let sum4 = () => {};

// ts 函数，约束输入和输出
function sum5(x: number, y: number): number {
  return x + y;
}
sum5(1, 2);
//sum5(1, 2, 3); // compile error，调用时必须匹配函数签名
//sum5(1); // compile error，调用时必须匹配函数签名

// ts function expression
let mySum = function (x: number): number {
  return x;
};
// in fact，上面的代码只对等号右侧的匿名函数进行了类型定义，
// 而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。
// 如果需要我们手动给 mySum 添加类型，则应该是这样
// 注意左边是 ts 中的 => 是函数类型的定义方式，而不是 ES6 中的 => 箭头函数
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
let mySum2: (x: number) => number = function (x: number): number {
  return x;
};

// 用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean;
}
// 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变
let mySearch: SearchFunc;
mySearch = (source: string, subString: string) => true;

// 可选参数，用 ? 表示可选的参数
// 需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let name2 = buildName('my', 'esn');
let name3 = buildName('myesn');

// 参数默认值
// 在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数
// 此时就不受「可选参数必须接在必需参数后面」的限制了
function buildName2(firstName: string, lastName: string = 'esn') {
  return firstName + ' ' + lastName;
}
let name4 = buildName2('my', 'esn');
let name5 = buildName2('my');

// 剩余参数
// ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）
// 注意，rest 参数只能是最后一个参数，关于 rest 参数，可以参考 ES6 中的 rest 参数
function push(array, ...items) {
  items.forEach((item) => array.push(item));
}
let a11: any[] = [];
push(a11, 1, 2, 3);

function pushts(array: any[], ...items: any[]) {
  items.forEach((item) => array.push(item));
}
let a11ts = [];
push(a11ts, 1, 2, 3);

// 重载
// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
// 输出反转输入的值，联合类型版本
// 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串
// 即单一职责
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}

// 我们重复定义了多次函数 reverse2，前两次是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到只有前两个提示
// 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
// 即前面两个函数定义的顺序，会影响重载后的匹配顺序
function reverse2(x: string): string;
function reverse2(x: number): number;
function reverse2(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
