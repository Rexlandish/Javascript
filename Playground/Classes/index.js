import { execute, privateVar } from "./module.js";

class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hi! My name is ${this.name} and I'm ${this.age} years old.`)
    }
}

new Student("Cassie", 24).greet();

let verity = {
    name: "Verity",
    age: 24,
    greet: function (message) {
        console.log(`sup, im ${this.name} and ${this.age} years old wuddup. ${message}`);
    }
}

verity.greet("SUX 4 U!!!!");

execute();
console.log(privateVar);
