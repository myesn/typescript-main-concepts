/**
 * 类
 *
 * 传统方式中，js 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，迎来了 class
 * ts 除了实现所有 ES6 中类的功能外，还添加了一些新的用法
 */

// 类的概念
// 类 Class, 对象 Object, 面对对象 OOP, 封装 Encapsulation, 继承 Inheritance, 多态 Polymorphism,
// 存取器 getter & setter, 修饰符 Modifiers, 抽象类 Abstract Class, 接口 Interfaces

// ES6 中类的用法 http://es6.ruanyifeng.com/#docs/class
// 属性和方法
// 使用 class 定义类，使用 constructor 定义构造函数，通过 new 生成新实例，会自动调用 constructor
class Animal2 {
  public name;

  constructor(name) {
    this.name = name;
  }

  say() {
    return `animal`;
  }
}
let a2 = new Animal2('jf');
console.log(a2.say());

// 类的继承
// 使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数
class Cat extends Animal2 {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }

  say() {
    return 'cat' + super.say(); // 调用父类的 say()
  }
}

// 存取器
// 使用 getter 和 setter 可以改变属性的赋值和读取行为
class Animal3 {
  constructor(name) {
    this.name = name;
  }

  get name() {
    return 'dd';
  }
  set name(value) {
    console.log(`setter: ${value}`);
  }
}
let a3 = new Animal3('giao'); // setter: giao
a3.name = 'aa'; // setter: aa
console.log(a3.name); // dd

// 静态方法
// 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用
class Animal4 {
  static isAnimal(a: any): boolean {
    return a instanceof Animal4;
  }
}
let a4 = new Animal4();
Animal4.isAnimal(a4);
// a4.isAnimal(a4); // compile error

// ES7 中类的用法
// 实例属性
// ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义
class Animal5 {
  name = 'a';

  constructor() {}
}
let a5 = new Animal5();
console.log(a5.name); // a

// 静态属性
// ES7 提案中，可以使用 static 定义一个静态属性
class Animal6 {
  static num = 42;

  constructor() {}
}
console.log(Animal6.num);

// TypeScript 中类的用法
// TypeScript 可以使用三种访问修饰符(Access Modifiers)
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中是允许被访问的
class Animal7 {
  public name;
  private age;
  protected nick;
  public constructor(name, age, nick) {
    // public 是属性和方法（包括构造函数）默认的访问修饰符
    // private constructor 表示该类不允许被继承或者实例化，
    // protected constructor 表示该类只允许被继承
    this.name = name;
    this.age = age;
    this.nick = nick;
  }
}
class Cat5 extends Animal7 {
  constructor(name, age, nick) {
    super(name, age, nick);
    console.log(super.name);
    // console.log(super.age); // compile error, private 只有声明类可以访问
    console.log(super.nick);

    console.log(this.name);
    // console.log(this.age); // compile error, private 只有声明类可以访问
    console.log(this.nick);
  }
}
let a7 = new Animal7(1, 2, 3);
console.log(a7.name); // 公共属性，外部可以访问
// a7.age // compile error, 私有属性外部无法访问，只有声明类可以访问
// a7.nick // compile error，内部属性外部无法访问，只有声明类和子类可以访问

// 参数属性
// 修饰符和 readonly 还可以使用在构造函数参数中，
// 等同于类中定义该属性同时给该属性赋值，使代码更简洁
class Animal8 {
  // public name: string;
  // 这里的 public 不可省略，它是一种语法
  public constructor(public name) {
    // this.name = name;
  }
}
let a8 = new Animal8(1);
console.log(a8.name);

// readonly
// 只读属性关键字，只允许出现在属性声明、索引签名、构造函数中
class Animal9 {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}
let a9 = new Animal9(1);
// a9.name = 1; // compile error, 无法对只读属性赋值
class Animal10 {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
let a10 = new Animal10(1);
// a10.name = 1; // compile error, 无法对只读属性赋值

// 抽象类
// abstract 用于定义抽象类和其中的抽象方法
// 抽象类不允许被实例化
abstract class Animal11 {
  constructor(public name) {}

  public abstract say();
}

class Cat6 extends Animal11 {
  public eat() {}

  public say() {} // 子类必须实现 abstract class 父类的方法
}
var c6 = new Cat6(1);
c6.name;

// 类的类型
class Animal12 {
  name: string; // 默认访问修饰符是 public，所以外部可以访问

  constructor(name: string) {
    this.name = name;
  }

  say(): string {
    return 'hello, ' + this.name;
  }
}
let a12: Animal12 = new Animal12('af');
a12.name;
