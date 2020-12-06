/**
 * 内置对象(Standard built-in objects)
 * JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。
 * 内置对象是指根据标准在全局作用域（Global）上存在的对象。
 * 这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。
 */

// ECMAScript 的内置对象
// 标准提供的内置对象有：Boolean、Error、Date、RegExp 等
// 更多的内置对象，可以查看 MDN 的文档：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
// 他们的定义文件，在 TypeScript 核心库中：https://github.com/Microsoft/TypeScript/tree/master/src/lib

// DOM 和 BOM 的内置对象
// Document、HTMLElement、Event、NodeList 等
// 它们的定义同样在 ts core lib 中：https://github.com/Microsoft/TypeScript/tree/master/src/lib

// TypeScript 核心库的定义文件
// TypeScript 核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。
// 注意，TypeScript 核心库的定义中不包含 Node.js 部分

// 用 TypeScript 写 Node.js
// Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：
// npm install @types/node --save-dev