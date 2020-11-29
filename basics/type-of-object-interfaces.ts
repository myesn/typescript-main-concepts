/**
 * 对象的类型 接口
 *
 * 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
 * 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
 * TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述
 *
 * 可选属性：可选属性的含义是该属性可以不存在
 * 任意属性：需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
 * 只读属性：只能在创建时赋值(只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候)
 */

interface Person {
  name: string;
  //age?: number; // 可选属性（可选属性的含义是该属性可以不存在）
  [propName: string]: string; // 任意属性，允许有任意的属性（任意属性取 string 类型的值，这里定义类型后，确定属性和可选属性的类型都必须是它的类型的子集，所以，这里不能再声明 age 了）
}

interface Person2 {
  readonly id: number; // 只读属性
  name: string;
  age?: number;
  [propName: string]: string | number; // 一个接口中只能定义一个任意属性，通过联合类型定义多个类型
}

// 定义的变量比接口少/多了一些属性是不允许的
// 赋值的时候，变量的形状必须和接口的形状保持一致
let myesn: Person = {
  name: 'myesn',
  //age: 2, // 可选属性
  //gender: 'male', // 不允许添加未定义的属性
  gender: 'male', // 任意属性 gender
  // a: 1, // 任意属性 a
  // b: 2, // 任意属性 b
};

let myesn2: Person2 = {
  id: 1,
  name: 'myesn',
  age: 1,
  aa: '1',
  aaa: 1,
};
// 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
// let myesn3: Person2 = {  // compile error，缺少 id 属性的赋值
//   name: 'myesn',
//   age: 1,
//   aa: '1',
//   aaa: 1,
// };
// myesn3.id = 1;// compile error，只读属性只能在创建时赋值
