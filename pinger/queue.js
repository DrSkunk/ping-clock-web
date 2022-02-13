class Queue {
  constructor(maxLength) {
    this.maxLength = maxLength;
    this.elements = [];
  }
  enqueue(e) {
    this.elements.push(e);
    if (this.maxLength && this.length > this.maxLength) {
      this.dequeue();
    }
  }
  dequeue() {
    return this.elements.shift();
  }
  isEmpty() {
    return this.elements.length == 0;
  }
  peek() {
    return !this.isEmpty() ? this.elements[0] : undefined;
  }
  length() {
    return this.elements.length;
  }
  average() {
    if (this.length === 0) {
      return 0;
    }
    return this.elements.reduce((a, b) => a + b, 0) / this.elements.length;
  }
  clear() {
    this.elements = [];
  }
}

exports.default = Queue;
