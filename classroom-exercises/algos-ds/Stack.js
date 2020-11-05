class Stack {
  constructor() {
    // Initialize empty stack
    this.items = [];
  }

  // push new element into stack
  push(value) {
    this.items.push(value);
  }

  // pop an element from stack
  pop() {
    return this.items.length === 0 ? "Stack Underflow" : this.items.pop();
  }

  // peek an element
  peek() {
    return this.items[this.items.length - 1];
  }

  // length of stack
  length() {
    return this.items.length;
  }

  // traverse the stack and print all elements
  traverse() {
    this.items.forEach((element) => console.log(element));
  }

  // search is pending
  search() {}
}

// push
const newStack = new Stack();
console.log(newStack);
newStack.push(22);
newStack.push(33);
newStack.push(44);
newStack.push(44);
console.log(newStack);

// pop
console.log(newStack.pop());
console.log(newStack.pop());
// console.log(newStack.pop());
// console.log(newStack.pop());
// console.log(newStack.pop());
console.log(newStack);

// peek
console.log(newStack.peek());

// length
console.log(newStack.length());

// traverse
console.log("traverse : ");
newStack.traverse();

// search is pending
