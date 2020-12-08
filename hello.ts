function say(person: string) {
  if (typeof person !== 'string') throw new Error('person is not a string');

  return `Hello, ${person}`;
}

const user = 'myesn';
// const user = 1; // compile error
console.log(say(user));
