/**
 * 类与接口
 *
 * 接口(Interfaces)可以用于对 对象的形状(Shape) 进行描述
 * 本文介绍接口的另一个用途，对类的一部分行为进行抽象
 */

// 类实现接口
// 实现（implements）是面向对象中的一个重要概念。
// 一般来说，一个类只能继承自另一个类，但是可以实现多个接口。
// 不同类之间共有的特性，可以将其提取成接口（interfaces），用 implements 关键字来实现。
interface Alarm {
  alert(): void;
}
interface Light {
  on(): void;
  off(): void;
}
// 接口继承接口
interface LightableAlarm extends Alarm {
  on(): void;
  off(): void;
}
class Door {}
class SecurityDoor extends Door implements Alarm {
  alert(): void {
    alert('door bibi');
  }
}
// 一个类可以实现多个接口
class Car implements Alarm, Light {
  on(): void {
    throw new Error('Method not implemented.');
  }
  off(): void {
    throw new Error('Method not implemented.');
  }
  alert(): void {
    alert('car bibi');
  }
}
let car1: Alarm = new Car();

// 接口继承类(只会继承它的实例属性和实例方法)
// 常见的面向对象语言中，接口是不能继承类的，但在 ts 中却可以
// 因为在声明 class Point 时，除了会创建一个名为 Point 的类之外，
// 同时也创建了一个名为 Point 的类型（实例的类型）
// 所以我们既可以将 Point 当做一个类来用，也可以当作一个类型来用（使用 : Point 表示参数的类型）
// 所以 接口继承类 和 接口继承接口 没有什么本质的区别
class Point {
  constructor(public x: number, public y: number) {}
}
// 声明 Point 时，实际也会声明一个类型，类似于 interface PointInstanceType （如下）
// PointInstanceType 只是一个名称，可以随意改，意思就是说 Point 类的实例的类型
// 值得注意的是，PointInstanceType 相比于 Point，缺少了 constructor 方法，
// 这是因为声明 Point 类时创建的 Point 类型是不包含构造函数的。另外，除了构造函数是不包含的，
// 静态属性或静态方法也是不包含的（实例的类型当然不应该包括构造函数、静态属性或静态方法）。
// 换句话说，声明 Point 类时创建的 Point 类型只包含其中的实例属性和实例方法
interface PointInstanceType {
  x: number;
  y: number;
}
// 继承的实际上是类 Point 的实例的类型
// 等价于 interface Point3d extends PointInstanceType
interface Point3d extends Point {
  z: number;
}
let point3d: Point3d = { x: 1, y: 2, z: 3 };
