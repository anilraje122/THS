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

const ll = new LinkedList();

// outputs
ll.addToHead(10);
ll.addToHead(20);
ll.addToHead(30);
ll.addToHead(40);
ll.removeHead();
ll.addToHead(50);
ll.addToHead(60);
ll.removeTail();
ll.removeHead();
console.log(ll);
