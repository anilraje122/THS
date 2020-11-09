class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addTohead(val) {
    const newNode = new Node(val, this.head);
    if (!this.head) {
      this.tail = newNode;
    }
    this.head = newNode;
    this.length++;
  }
  addToTail(val) {
    const newNode = new Node(val, null);
    if (!this.tail) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
  }
  removeHead() {
    if (!this.head) {
      console.log("No nodes found");
    }
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
  }
  removeTail() {
    if (!this.tail) {
      console.log("No nodes found");
    }
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      let currentNode = this.head;
      let preTail = this.head;
      while (currentNode.next) {
        preTail = currentNode;
        currentNode = currentNode.next;
      }
      this.tail = preTail;
      this.tail.next = null;
      this.length--;
      if (!this.length) {
        this.head = null;
        this.tail = null;
      }
    }
  }
}

// output
const l1 = new LinkedList();
l1.addTohead(10);
l1.addTohead(20);
l1.addTohead(30);
l1.addTohead(40);
l1.removeHead();
console.log(l1);

const l2 = new LinkedList();
l2.addToTail(10);
l2.addToTail(20);
l2.addToTail(30);
l2.addToTail(40);
l2.removeTail();
l2.removeTail();
console.log(l2);
