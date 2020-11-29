/**
 * 任意值
 *
 * 任意值（Any）用来表示允许赋值为任意类型
 */

// 什么是任意值类型
// 如果一个普通类型，在赋值过程中改变类型是不被允许的
let myFavoriteNumber: string = 'myesn';
//myFavoriteNumber = 7; // 编译报错
// 但如果是 any 类型，则允许被赋值为任意类型
let myFavoriteNumber2: any = 'myesn';
myFavoriteNumber2 = 7;

// 任意值的属性和方法
// 在任意值上访问任何属性都是允许的
// 可以认为，声明一个变量为任意值后，对它的任何操作，返回内容的类型都是任意值
let anyThing:any = 'hello';
console.log(anyThing.myName);
// 也允许调用任何方法
anyThing.setName('myesn');

// 未声明类型的变量
// 变量如果在声明的时候未指定其类型，那么它会被识别未任意值类型
let something;
something = 'myesn';

