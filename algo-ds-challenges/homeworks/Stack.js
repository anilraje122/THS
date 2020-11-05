/* Stack data strcuture and operations */

class Stack {
  // Initialize properties and methods
  constructor() {
    this.items = [];
  }

  // Insert an element into stack
  push(val) {
    return this.items.push(val);
  }

  // Remove the last inserted element from stack
  pop() {
    return this.items.length === 0
      ? "Stack underflow"
      : this.items.pop(this.items.length - 1);
  }

  // Get the last inserted element or element at the top
  peek() {
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty or not
  isEmpty() {
    return this.items.length === 0;
  }

  // Traverse through all elements
  traverse() {
    this.items.forEach((element) => console.log(element));
  }

  // Find the length of the stack
  length() {
    return this.items.length;
  }

  // Search for an element
  search(input) {
    for (let i = 0; i < this.items.length; i++) {
      return input === this.items[i];
    }
  }
}

// Using push method
const newStack1 = new Stack();
console.log("\n-- Push method --");
console.log(newStack1);
newStack1.push(10);
newStack1.push(20);
console.log(newStack1);

// Using pop method
const newStack2 = new Stack();
console.log("\n-- Pop method --");
newStack2.push(50);
newStack2.push(60);
newStack2.push(70);
console.log(newStack2);
newStack2.pop();
console.log(newStack2);

// Using pop method
const newStack3 = new Stack();
console.log("\n-- Peek method --");
newStack3.push(80);
newStack3.push(90);
newStack3.push(100);
console.log(newStack3.peek());

// Using isEmpty method
const newStack4 = new Stack();
console.log("\n-- isEmpty method --");
newStack4.push(80);
console.log(newStack4.isEmpty());
newStack4.pop();
console.log(newStack4.isEmpty());

// Using traverse method
const newStack5 = new Stack();
console.log("\n-- isEmpty method --");
newStack5.push(25);
newStack5.push(35);
newStack5.push(45);
newStack5.push(55);
console.log(newStack5);
newStack5.traverse();

// Using length method
console.log("\n-- length method --");
console.log(newStack5);
console.log(newStack5.length());

// Using search method
const newStack6 = new Stack();
console.log("\n-- search method --");
newStack6.push(25);
newStack6.push(35);
newStack6.push(45);
newStack6.push(55);
console.log(newStack6);
console.log(newStack6.search(10));
console.log(newStack6.search(25));
