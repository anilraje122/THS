class Conversion {
  constructor() {
    this.array = [];
    this.output = "";
    this.precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "^": 3,
    };
  }

  isEmpty() {
    return this.array.length === 0;
  }

  peek() {
    return this.array[this.array.length - 1];
  }

  pop() {
    return this.array.length > 0 ? this.array.pop() : false;
  }

  push(val) {
    this.array.push(val);
  }

  isOperator(val) {
    return val in this.precedence ? true : false;
  }

  notGreater(val) {
    return this.precedence[val] <= this.precedence[this.peek()];
  }

  infixToPostfix(infixExp) {
    infixExp.split("").forEach((i) => {
      // if the character is an operand
      if (!this.isOperator(i)) {
        // this.output.push(i);
        this.output += i;
      }
      // if the character is "("
      else if (i === "(") {
        this.array.push(i);
      }
      // if the character is ")", pop it from stack and push it to output until "(" is found
      else if (i === ")") {
        while (!this.isEmpty() && this.peek !== "(") {
          let tmp = this.pop();
          // this.output.push(tmp);
          this.output += tmp;
        }
        if (!this.isEmpty() && this.peek() !== "(") {
          return -1;
        } else {
          this.pop();
        }
      }
      // if the character is an operator
      else {
        while (!this.isEmpty() && this.notGreater(i)) {
          let tmp = this.pop();
          // this.output.push(tmp);
          this.output += tmp;
        }
        this.push(i);
      }
    });
    while (!this.isEmpty()) {
      let tmp = this.pop();
      // this.output.push(tmp);
      this.output += tmp;
    }
    console.log(this.output);
  }
}

const newCon = new Conversion();
newCon.infixToPostfix("a+b*(c^d-e)^(f+g*h)-i");
