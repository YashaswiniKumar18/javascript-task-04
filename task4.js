//SECTION 1 – Real-Time Function Logic

//Payroll System
function calculateSalary(basicSalary, bonusPercentage) {
    const bonus = (basicSalary * bonusPercentage) / 100;
    const grossSalary = basicSalary + bonus;
    const tax = grossSalary * 0.05;
    const finalSalary = grossSalary - tax;

    console.log("Salary Breakdown:");
    console.log("Basic Salary:", basicSalary);
    console.log("Bonus:", bonus);
    console.log("Tax (5%):", tax);
    console.log("Final Salary:", finalSalary);

    return finalSalary;
}

calculateSalary(30000, 10);

//Student Result System
function generateResult(name, marksArray) {
    const total = marksArray.reduce((sum, mark) => sum + mark, 0);
    const average = total / marksArray.length;

    let grade;
    if (average >= 80) grade = "A";
    else if (average >= 60) grade = "B";
    else if (average >= 40) grade = "C";
    else grade = "Fail";

    return {
        name,
        total,
        average,
        grade
    };
}

console.log(generateResult("Rahul", [70, 80, 90]));

//SECTION 2 – Scope & Hoisting (Debugging)

//Debug This Code
function demo() {
    if (true) {
        var a = 10;
        let b = 20;
    }
    console.log(a);
    console.log(b);
}
demo();
//What will happen?
// answer-->   a prints 10,b causes ReferenceError
//Why? answer--> var is function scoped,let is block scoped
//Fixed Code
function demo() {
    let a, b;
    if (true) {
        a = 10;
        b = 20;
    }
    console.log(a);
    console.log(b);
}
demo();

//Hoisting Analysis
console.log(x);
var x = 100;

console.log(y);
let y = 200;
//Error-- Undefined Uncaught ReferenceError ReferenceError: Cannot access 'y' before initialization
   // at <anonymous> (c:\Users\Yashawini K\OneDrive\Desktop\JAVASCRIPT\JAVASCRIPT-ASSIGNMENT-4\task4.js:73:13)

   //Explanation: var is hoisted and initialized as undefined,let is hoisted but stays in temporal dead zone

//SECTION 3 – Callback & Higher Order Functions
//Order Processing System
function generateInvoice(orderId) {
    console.log("Invoice generated for Order:", orderId);
}

function processOrder(orderId, callback) {
    console.log("Order Processed:", orderId);
    callback(orderId);
}

processOrder(101, generateInvoice);

//Bank Transaction System
let balance = 5000;

function sendSMS(message) {
    console.log("SMS:", message);
}

function transaction(amount, type, callback) {
    if (type === "deposit") {
        balance += amount;
    } else if (type === "withdraw") {
        balance -= amount;
    }
    callback(`Transaction successful. Balance: ${balance}`);
}

transaction(1000, "deposit", sendSMS);

//SECTION 4 – Currying (E-Commerce)
function priceBuilder(basePrice) {
    return function (discount) {
        return function (tax) {
            const discountAmount = basePrice * (discount / 100);
            const priceAfterDiscount = basePrice - discountAmount;
            const taxAmount = priceAfterDiscount * (tax / 100);
            return priceAfterDiscount + taxAmount;
        };
    };
}

console.log(priceBuilder(2000)(15)(18));

//SECTION 5 – IIFE (Security + Encapsulation)
const companyModule = (function () {
    const companyCode = "COMP123";

    return {
        getCompanyStatus: function () {
            return "Company is Active";
        }
    };
})();

console.log(companyModule.getCompanyStatus());
// companyModule.companyCode ❌ Not accessible

//SECTION 6 – Generator (Advanced Logic)
//Unique Order ID Generator
function* orderIdGenerator() {
    let id = 1000;
    while (true) {
        yield `ORD${++id}`;
    }
}

const orderGen = orderIdGenerator();
console.log(orderGen.next().value);
console.log(orderGen.next().value);

//Coupon Spin System
function* couponGenerator() {
    yield "10% OFF";
    yield "20% OFF";
    yield "50% OFF";
    yield "No Luck";
    yield "Jackpot";
}

const spin = couponGenerator();
console.log(spin.next().value);
console.log(spin.next().value);
console.log(spin.next().value);

//SECTION 7 – Mini Project (Integrated)
const ecommerceApp = (function () {
    let cart = [];

    function addToCart(product, price) {
        cart.push({ product, price });
    }

    function calculateTotal() {
        return cart.reduce((sum, item) => sum + item.price, 0);
    }

    function applyDiscount(discount) {
        return function (total) {
            return total - (total * discount / 100);
        };
    }

    function* generateCoupon() {
        yield "10% OFF";
        yield "20% OFF";
        yield "50% OFF";
    }

    function processPayment(amount, callback) {
        callback(`Payment of ₹${amount} successful`);
    }

    return {
        addToCart,
        calculateTotal,
        applyDiscount,
        generateCoupon,
        processPayment
    };
})();

// Usage
ecommerceApp.addToCart("Mobile", 15000);
ecommerceApp.addToCart("Headset", 2000);

let total = ecommerceApp.calculateTotal();
let discountedTotal = ecommerceApp.applyDiscount(10)(total);

ecommerceApp.processPayment(discountedTotal, console.log);
