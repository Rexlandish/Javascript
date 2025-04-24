export class BankAccount {
    constructor(accountHolder, accountNumber, balance) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    
    deposit(amount) {
        balance += amount;
        console.log(`Deposited ${amount}. New balance: ${balance}`);
    }

    widthdraw(amount) {
        balance -= amount;
        console.log(`Withdrew ${amount}. New balance: ${balance}`);
    }

    checkBalance() {
        return this.balance;
    }
}