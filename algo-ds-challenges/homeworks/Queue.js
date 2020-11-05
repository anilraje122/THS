/* Queue data strcuture and operations */

class Queue {
  // Initialize properties and methods
  constructor() {
    this.items = [];
  }

  // Insert an element into queue
  enqueue(val) {
    return this.items.push(val);
  }

  // Remove the first inserted element from queue
  dequeue() {
    return this.items.length === 0
      ? console.log("Queue underflow")
      : this.items.shift();
  }

  // Get the first inserted element
  front() {
    return this.items[0];
  }

  // Get the last inserted element
  rear() {
    return this.items[this.items.length - 1];
  }

  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // find the length od the queue
  length() {
    return this.items.length;
  }

  // traverse through all queue elements
  traverse() {
    this.items.forEach((element) => console.log(element));
  }
}

// Using enqueue method
const newQueue1 = new Queue();
console.log("\n-- Enqueue method --");
console.log(newQueue1);
newQueue1.enqueue(10);
newQueue1.enqueue(20);
newQueue1.enqueue(30);
console.log(newQueue1);

// Using dequeue method
console.log("\n-- Dequeue method --");
console.log(newQueue1);
newQueue1.dequeue();
console.log(newQueue1);

// Using front method
const newQueue2 = new Queue();
console.log("\n-- Front method --");
newQueue2.enqueue(50); // first element
newQueue2.enqueue(60);
newQueue2.enqueue(70); // last element
console.log(newQueue2);
console.log(newQueue2.front());

// Using rear method
console.log("\n-- Rear method --");
console.log(newQueue2);
console.log(newQueue2.rear());

// Using isEmpty method
console.log("\n-- isEmpty method --");
console.log(newQueue2);
console.log(newQueue2.isEmpty());
newQueue2.dequeue();
newQueue2.dequeue();
newQueue2.dequeue();
console.log(newQueue2);
console.log(newQueue2.isEmpty());

// Using length method
console.log("\n-- Length method --");
console.log(newQueue1);
console.log(newQueue1.length());

// Using traverse method
const newQueue3 = new Queue();
console.log("\n-- Traverse method --");
newQueue3.enqueue(50);
newQueue3.enqueue(60);
newQueue3.enqueue(70);
newQueue3.enqueue(80);
console.log(newQueue3);
newQueue3.traverse();
