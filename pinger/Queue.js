export default class Queue {
  constructor(maxLength) {
    this.maxLength = maxLength || 0;
    this.elements = [];
  }
  enqueue(e) {
    this.elements.push(e);
    if (this.length > this.maxLength) {
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
}
