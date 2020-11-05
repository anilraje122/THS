// Double linked list

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(prev, val, next) {
  this.prev = prev;
  this.val = val;
  this.next = next;
}

// Add head node
LinkedList.prototype.addToHead = (val) => {
  let newNode = new Node(null, val, this.head);
  this.head = newNode;
};
