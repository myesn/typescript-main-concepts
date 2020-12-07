/**
 * 字符串字面量类型
 *
 * 字符串字面量类型用来约束取值只能是某几个字符串中的一个
 */

// 类型别名 与 字符串字面量类型 都是使用 type 进行定义
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do ...
}

handleEvent(document.getElementById('hello'), 'scroll');
//handleEvent(document.getElementById('world'), 'doubleclick'); // compile error
