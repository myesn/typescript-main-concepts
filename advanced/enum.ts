/**
 * 枚举
 *
 * 枚举（Enum）类型用于取值被限定在一定范围内的场景
 */

// 使用 enum 关键字定义
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
enum Days {
  Sun, // 0
  Mon, // 1
  Tue, // 2
  Wed, // 3
  Thu, // 4
  Fri, // 5
  Sat = 111, // 手动赋值
  A, // 未手动赋值的项会接着上一个项递增, 112
  B, // 113
}
// 枚举的编译结果
// var Days;
// (function (Days) {
//     Days[Days["Sun"] = 0] = "Sun";
//     Days[Days["Mon"] = 1] = "Mon";
//     Days[Days["Tue"] = 2] = "Tue";
//     Days[Days["Wed"] = 3] = "Wed";
//     Days[Days["Thu"] = 4] = "Thu";
//     Days[Days["Fri"] = 5] = "Fri";
//     Days[Days["Sat"] = 6] = "Sat";
// })(Days || (Days = {}));
console.log(Days['Sun'] === 0); // true
console.log(Days['Mon'] === 1); // true
console.log(Days['Tue'] === 2); // true
console.log(Days['Sat'] === 6); // true

console.log(Days[0] === 'Sun'); // true
console.log(Days[1] === 'Mon'); // true
console.log(Days[2] === 'Tue'); // true
console.log(Days[6] === 'Sat'); // true

// 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
enum Days2 {
  Sun = 3,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days2['Sun'] === 3); // true
console.log(Days2['Wed'] === 3); // true
console.log(Days2[3] === 'Sun'); // false
console.log(Days2[3] === 'Wed'); // true

//手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)
enum Days3 {
  Sun = 7,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat = <any>'S',
}
// 枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1
enum Days4 {
  Sun = 7,
  Mon = 1.5,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
console.log(Days4['Sun'] === 7); // true
console.log(Days4['Mon'] === 1.5); // true
console.log(Days4['Tue'] === 2.5); // true
console.log(Days4['Sat'] === 6.5); // true

// 常数项和计算所得项
// 枚举项有两种类型：常数项(constant member)和计算所得项(computed member)
// 上面的例子都是常数项
// 典型的计算所得项的例子
// 'blue'.length 就是一个计算所得项
enum Color {
  red,
  read = red, // 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
  Blue = 'blue'.length,
  //A // compile error, 如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
}

// 常数枚举 使用 const enum 定义的枚举类型
// 常数枚举与普通枚举的区别：它会在编译阶段被删除，并且不能包含计算成员
const enum Directions2 {
  Up,
  Down,
}
let directions2 = [Directions2.Up, Directions2.Down];
// 编译结果
// 如果包含了计算所得项成员，那么会在编译阶段报错
//var directions2 = [0 /* Up */, 1 /* Down */];

// 外部枚举(Ambient Enums) 是使用 declare enum 定义的枚举类型
// declare 定义的类型仅用于编译时的检查，在编译结果中会被删除
// 外部枚举与声明语句一样，常出现在声明文件中
declare enum Directions3 { // declare const enum Directions3 {
  Up,
  Down,
}
// 也可以同时使用 declare 和 const
let directions3 = [Directions3.Up];
// 编译结果
// let directions3 = [0 /* Up */]
