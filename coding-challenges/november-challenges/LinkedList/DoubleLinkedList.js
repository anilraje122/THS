class Node {
  constructor(prev, val, next) {
    this.prev = prev;
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  addToHead(val) {
    const newNode = new Node(null, val, this.head);
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
  }
  addToTail(val) {
    const newNode = new Node(this.tail, val, null);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = -newNode;
  }
  removeHead() {
    if (!this.head) {
      return console.log("No nodes found");
    }
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
  }
  removeTail() {
    if (!this.tail) {
      return console.log("No nodes found");
    }
    if (!this.tail.prev) {
      this.head = null;
      this.prev = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
  }
}

const l1 = new LinkedList();

// outputs
l1.addToHead(10);
l1.addToHead(20);
l1.addToHead(30);
l1.removeHead();
l1.addToTail(40);
l1.addToTail(50);
l1.removeTail();

console.log(l1);
