function say(person:string){
  if(typeof person !== 'string')
    throw new Error("person is not a string");

  return `Hello, ${person}`;
}

const user = 'myesn';
//const user = 1; // 编译不通过，IDE也会有错误的波浪线提示
console.log(say(user));