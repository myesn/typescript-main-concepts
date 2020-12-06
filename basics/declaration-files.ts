/**
 * 声明文件
 *
 * 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
 *
 * 新语法索引：
 * declare var              声明全局变量
 * declare function         声明全局方法
 * declare class            声明全局类
 * declare enum             声明全局枚举类型
 * declare namespace        声明（含有子属性的）全局对象
 * interface 和 type        声明全局类型
 * export                   导出变量
 * export namespace         导出（含有子属性的）对象
 * export default           ES6 默认导出
 * export =                 commonjs 导出模块
 * export as namespace      UMD 库声明全局变量
 * declare global           扩展全局变量
 * declare module           扩展模块
 * /// <reference />        三斜线指令
 */

// 什么是声明语句
// 比如在 TypeScript 中，通过 <script> 标签引入了非 TypeScript 的普通 JS 库，比如jQuery，
// 然后我们使用 $/jQuery 时，是无法编译通过的，因为 ts 编译器不知道 $/JQuery 是什么，
//$('$foo'); or jQuery('#foo') // compile error
// 那么我们就需要使用 declare var 来定义它的类型
// declare var 并没有真正的定义一个变量，只是定义了全局变量 $/jQuery 的类型
// 仅用于 tsc 编译时的检查，在编译结果中会被删除
declare var $: (selector: string) => any;
declare var jQuery: (selector: string) => any;
$('#foo');
jQuery('#foo');
// 编译结果
// $('#foo');
// jQuery('#foo');

// 什么是声明文件
// 把声明语句置于独立文件（jQuery.d.ts）中
// 声明文件必须以 .d.ts 为后缀
// src/jQuery.d.ts
declare var $: (selector: string) => any;
declare var jQuery: (selector: string) => any;
// src/index.ts
$('#foo');
jQuery('#foo');
// 一般来说，ts 会解析项目中所有的 *.ts 文件，也包含 .d.ts 结尾的文件
// 所以将 jQuery.d.ts 放到项目中时，其他所有的 *.ts 文件就都可以获得 jQuery 的类型定义
// 如果仍无法解析，可以检查 tsconfig.json 中的 files、include、exclude 配置，确保其包含了 .d.ts 文件
// /path/to/project
// ├── src
// |  ├── index.ts
// |  └── jQuery.d.ts
// └── tsconfig.json
// 上诉写法，不适用于通过模块导入的方式使用第三方库

// 第三方声明文件
// github.com/DefinitelyTyped/DefinitelyTyped
// 社区已经为流行的普通 js 库定义好了 ts type，jQuery 当然也在其中
// 我们可以直接下载下来使用，但推荐使用 @types 统一管理第三库的声明文件（即上面说的社区定义）
// @types 使用方式：yarn add @types/jquery --dev

// 书写声明文件
// 当第三方库没有提供声明文件时，我们就需要自己动手了。上面的方式只是入门级的认知，实际书写是比较复杂的事情
// 在不同的场景下，声明文件的内容和使用方式会有所区别
// 库的使用场景主要有以下几种：
// 全局变量：通过 <script> 标签引入第三方库，注入全局变量
// npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
// UMD 库：即可以通过 <script> 标签引入，又可以通过 import 导入
// 直接扩展全局变量：通过 <script> 标签引入后，改变一个全局变量的结构
// 在 npm 包或 UMD 库中扩展全局变量：引入 npm 包或 UMD 库后，改变一个全局变量的结构
// 模块插件：通过 <script> 或 import 导入后，改变另一个模块的结构

// 全局变量
// declare var 定义一个全局变量的类型，与其类似的，还有 declare let 和 declare const
// src/jQuery.d.ts
declare let jQuery2: (selector: string) => any;
// src/index.ts
jQuery2('#foo');
// 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
jQuery2 = function (selector) {
  return document.querySelector(selector);
};
// 而当使用 const 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了
// 一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let
// 注意：声明语句中只能定义类型，不能再声明语句中定义具体的实现

// declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义
// src/jQuery.d.ts
declare function jQuery3(selector: string): any;
// 在函数类型的声明语句中，函数重载也是支持的
declare function jQuery3(domReadyCallback: () => any): any;
// src/index.ts
jQuery3('#foo');
jQuery3(function () {
  alert(1);
});

// declare class 当全局变量是一个类的时候，用 declare class 来定义它的类型
// src/Animal.d.ts
// 同样的，declare class 语句也只能用于定义类型，不能定义具体的实现
declare class Animal {
  name: string;
  constructor(name: string);
  sayHi(): string;
}
// src/index.ts
let cat = new Animal('Tom');

// declare enum 定义的枚举类型也称作外部枚举(Ambient Enums)
// src/Directions.d.ts
// 与其他全局变量的类型声明一致，declare enum 仅用来定义类型，而不是具体的值
// 该文件仅用于编译时的检查，声明文件里的内容在编译结果中会被删除
declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}
// src/index.ts
let directions = [Directions.Up, Directions.Down];

// declare namespace 是 ts 早期时为了解决模块化而创造的关键字
// 没有 ES6 的时候，ts提供了一种模块化方案，使用 module 关键字表示内部模块。
// 但由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module
// 随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案，
// 所以我们不需要再学习 namespace 的使用了，它已经被淘汰了，但是在声明文件中，declare namespace
// 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性
// src/jQuery.d.ts
// 注意在 declare namespace 内部，可以直接使用 function ajax 来声明函数，而不是使用 declare function ajax。
// 类似的，也可以使用 const，class，enum 等语句
declare namespace jQuery4 {
  function ajax(url: string, settings?: any): void;
  const a: string;
  const enum s {
    a,
    b,
  }
  class Event {
    a: string;
    blur(eventType: any): void;
  }
}
// src/index.ts
jQuery4.ajax('/a');
jQuery4.a;
jQuery4.s.a;
let event2 = new jQuery4.Event();
event2.a;
event2.blur(1);
// 嵌套的命名空间
// 如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型
// src/AB.d.ts
declare namespace AB {
  function ajax(): void;
  namespace fn {
    function extend(): void;
  }
}
// src/index.ts
AB.ajax();
AB.fn.extend();
// 假如 AB 下仅有 fn 这一个属性，则可以不需要嵌套 namespace
// src/DD.d.ts
declare namespace DD.fn {
  function extend(object: any): void;
}
// src/index.ts
DD.fn.extend({});

// interface 和 type 声明一个全局的接口或类型
// src/User.d.ts
interface User {
  name: string;
  type?: 'a' | 'b';
}
declare namespace UserOperator {
  function add(user: User): void;
}
// src/index.ts
let user2: User = {
  name: 'myesn',
  type: 'a',
};
UserOperator.add(user2);
// 防止命名冲突
// src/User.d.ts

declare namespace UserOperator2 {
  interface User2 {
    name: string;
    type?: 'a' | 'b';
  }
  function add(user: User2): void;
}
// src/index.ts
let user3: UserOperator2.User2 = {
  name: 'myesn',
  type: 'a',
};

// 声明合并
// 假如某个对象既是一个函数，又是一个对象（拥有子属性）
// 那么可以组合多个声明语句，它们会不冲突的合并起来
// src/Organization.d.ts
declare function Organization(selector: string): any;
declare namespace Organization {
  function remove(): void;
}
// src/index.ts
Organization('a');
Organization.remove();

// npm 包
// npm 包的声明文件主要有以下几种语法：
// export 导出变量
// export namespace 导出（含有子属性的）对象
// export default ES6 默认导出
// export = commonjs 导出模块
// 目录结构
// /path/to/project
// ├── src
// |  └── index.ts
// ├── types
// |  └── foo
// |     └── index.d.ts
// └── tsconfig.json
// tsconfig.json 内容
// {
//   "compilerOptions": {
//       "module": "commonjs",
//       "baseUrl": "./",
//       "paths": {
//           "*": ["types/*"]
//       }
//   }
// }