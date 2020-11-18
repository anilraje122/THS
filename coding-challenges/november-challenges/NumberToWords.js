/* 
Implement number to words conversion
Eg:
Input : 500
Output : Five hundered only
*/

NumToWord = (input) => {
  let len = input.length;
  const num = Number(input);
  const single_digits = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const double_digits = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens_mulitple = [
    "",
    "",
    "twenty",
    "thirty",
    "fourty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const tens_power = ["hundred", "thousand"];

  if (len === 0) {
    return console.log("Empty input!");
  }
  if (len > 4) {
    return console.log("Length must be 4 or less");
  }
  if (!Number.isInteger(num)) {
    return console.log("Input is not a valid number!");
  }

  let op = "";

  if (len === 1) {
    return (op = single_digits[input[0]]);
  }

  if (len === 2) {
    return (op = findTwoDigit(
      input,
      len,
      single_digits,
      double_digits,
      tens_mulitple,
      op
    ));
  }

  if (len === 3) {
    let lastTwoDigits = input.substring(1);
    console.log(lastTwoDigits);
    op =
      single_digits[input[0]] +
      " " +
      tens_power[0] +
      " " +
      findTwoDigit(
        lastTwoDigits,
        len,
        single_digits,
        double_digits,
        tens_mulitple,
        op
      );
  }

  console.log(op);
};

findTwoDigit = (
  input,
  len,
  single_digits,
  double_digits,
  tens_mulitple,
  op
) => {
  if (len === 2 && input[0] == 0) {
    return (op += single_digits[input[1]]);
  }

  if (len === 2 && input[0] == 1) {
    return (op += double_digits[input[1]]);
  }

  if (len === 2 && input[0] > 1) {
    if (input[1] == 0) {
      return (op += tens_mulitple[input[0]] + " ");
    }
    return (op += tens_mulitple[input[0]] + " " + single_digits[input[1]]);
  }
};

console.log(NumToWord("1"));
console.log(NumToWord("09"));
console.log(NumToWord("11"));
console.log(NumToWord("99"));
console.log(NumToWord("50"));
console.log(NumToWord("41"));
console.log(NumToWord("32"));
console.log(NumToWord("30"));
console.log(NumToWord("302"));
