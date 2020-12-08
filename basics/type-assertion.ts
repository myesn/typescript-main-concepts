/**
 * 类型断言
 *
 * 类型断言（Type Assertion）
 */

// 语法
// 值 as 类型 or <类型>值  建议统一使用前者，因为在 react 中 <Foo> 代表的是一个 ReactNode，在 ts 中也可能表示泛型

// 类型断言的用途
// 将一个联合类型断言为其中一个类型
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}

// 将一个父类断言为更加具体的子类
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}
function isApiError(error: Error): boolean {
  // if (typeof (error as ApiError).code === 'number') {
  //   return true;
  // }
  // 如果是 JavaScript 类，能够通过 instanceof 来判断是否为某类型的实例
  // 如果是 ts 中的接口就无法使用该关键字，因为接口是一个类型，不是一个真正的值
  // 它在编译结果中会被删除，所以就无法使用 instanceof 来做运行时判断了
  if (error instanceof ApiError) {
    return true;
  }
  return false;
}
// ts 的接口无法使用 instanceof 做类型判断
interface ApiError2 extends Error {
  code: number;
}
interface HttpError2 extends Error {
  statusCode: number;
}
function isApiError2(error: Error) {
  // compile error
  // if (error instanceof ApiError2) {
  //     return true;
  // }
  // 只能使用类型断言，通过判断类型中独有的属性，区分出接口类型
  if (typeof (error as ApiError2).code === 'number') {
    return true;
  }
  return false;
}

// 将任何一个类型断言为 any
// 比如我们想在某个对象上添加一个属性，但该对象有具体的类型，那么就会编译报错
// window.foo = 1; // compile error
// 此时我们可以使用 as any 临时将 windows 断言为 any 类型
// 这样就可以解决 ts 中的类型问题，但不推荐使用，因为它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any
// 正确的做法是扩展 windows 的类型，不过如果是临时增加，as any 会更加方便
(window as any).foo = 1;

// 将 any 断言为一个具体的类型
// 举例，历史问题，导致该函数的返回值是 any
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
// 那么后续调用中，最好把结果断言成一个精确的类型，这样方便维护
const tom = getCacheData('myesn') as Cat;
tom.run();

// 类型断言的限制
// 具体来说，若 A 兼容 B，那么 A 能够被断言为 B，B也能被断言为 A
// TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系
interface Animal111 {
  name: string;
}
interface Cat11 {
  name: string;
  run(): void;
}

let tom2: Cat11 = {
  name: 'Tom',
  run: () => {
    console.log('run');
  },
};
let animal: Animal111 = tom2;
// Cat 包含了 Animal 中的所有属性，除此之外，它还有一个额外的方法 run。
// TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系，
// 而只会看它们最终的结构有什么关系——所以它与 Cat extends Animal 是等价的
interface Animal21 {
  name: string;
}
interface Cat2 extends Animal21 {
  run(): void;
}
// 那么也不难理解为什么 Cat 类型的 tom 可以赋值给 Animal 类型的 animal 了，
// 就像面向对象编程中我们可以将子类的实例赋值给类型为父类的变量
// 我们把它换成 TypeScript 中更专业的说法，即：Animal2 兼容 Cat2
// 当 Animal 兼容 Cat 时，它们就可以互相进行类型断言了
interface Animal3 {
  name: string;
}
interface Cat3 {
  name: string;
  run(): void;
}

function testAnimal(animal: Animal3) {
  return animal as Cat3;
}
function testCat(cat: Cat3) {
  return cat as Animal3;
}
// 综上所述：
// 联合类型可以被断言为其中一个类型
// 父类可以被断言为子类
// 任何类型都可以被断言为 any
// any 可以被断言为任何类型
// 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可
// 其实前四种情况都是最后一个的特例。

// 双重断言
// 即将 A 先断言为 any，然后 A 就可以被断言为任何类型了
// 但是十分不推荐，因为这种写法一般经常导致运行时错误
interface Cat4 {
  run(): void;
}
interface Fish4 {
  swim(): void;
}
function testCat4(cat: Cat4) {
  return (cat as any) as Fish4;
}

// 类型断言 vs 类型转换
// 类型断言只影响 ts 的编译，在编译结果中会被删除
function toBoolean(something: any): boolean {
  return something as boolean;
}
toBoolean(1); // 返回值为 1
// 编译结果
// function toBoolean(something) {
//   return something;
// }
// toBoolean(1); // 返回值为 1
// 所以类型断言不是类型转换，它不会真的影响到变量的类型
// 若要进行类型转换，需要直接调用类型转换的方法
// function toBoolean2(something: any): boolean {
//   return Boolean(something);
// }
// toBoolean2(1); // 返回值为 true

// 类型断言 vs 类型声明
// 区别：类型声明是比类型断言更加严格的
// 为了增加代码质量，优先使用类型声明
// const tom: Cat = any 比 const tom = any as Cat

// 类型断言 vs 泛型
// 泛型是最优的解决方案
function getCacheData2<T>(key: string): T {
  return (window as any).cache[key];
}
const tom3 = getCacheData2<Cat>('myesn');
tom3.run();
