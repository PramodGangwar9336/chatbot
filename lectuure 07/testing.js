// Fixed JavaScript code

let a = 10;
let b = "20";

function addNumber(x, y) {
    let result = x + y;
    return result;
}

// Convert b to a number for addition
// console.log("Sum is: " + addNumber(a, Number(b)));

// Use strict equality (===) and convert b to number
if (a === Number(b)) {
    // console.log("Both are equal");
}

for (let i = 0; i <= 5; i++) {
    // console.log(i);
}

// c was not defined, removed to prevent ReferenceError