/**
 * 元组
 *
 * 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象
 */

// 定义一对值分别为 string 和 number 的元组
// 和 c# 中的元组类似，只是语法不同
let tom4: [string, number] = ['tom', 25];
// 当赋值或访问一个已知索引的元素时，会得到正确的类型
let tom5: [string, number];
tom5[0] = 'tom';
tom5[1] = 25;
tom5[0].slice(1);
tom5[1].toFixed(2);
// 当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项

// 越界的元素
// 添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
tom5.push('male');
//tom5.push(true); // compile error, 因为 boolean 不是 string | number 的联合类型
