import { BankAccount } from "./bankAccount.js"


let chosenAccountIndex = -1;

// Display the account holders of the bank account baesd on the bankAccounts list
function updateBankAccountNames() {
    const allAccounts = document.getElementById("all-accounts");
    allAccounts.lastChild.remove();

    let allNamesList = document.createElement("ul");
    allNamesList.style.listStyle = "none"
    allNamesList.style.padding = "0"; 
    bankAccounts.forEach( account => {
        const li = document.createElement('button');
        li.innerHTML = "<b>" + account.accountHolder + "</b> " + currencyFormatter.format(account.balance);
        li.onclick = function () { searchAccountName(account.accountHolder) };
        allNamesList.appendChild(li);
    });

    console.log(allNamesList);

    allAccounts.appendChild(allNamesList);
}

// Load bank account based on the name given
export function searchAccountName(name) {

    document.getElementById("account-viewer").style.display = "block";

    chosenAccountIndex = bankAccounts.findIndex( acc => acc.accountHolder == name);
    if (chosenAccountIndex == -1) {
        alert("No holder with the name " + input.value + " found.")
        input.value = "";
    }
    else {
        loadAccountData(chosenAccountIndex);
    }
}
window.searchAccountName = searchAccountName;

// Show bank data from a given bank account index

const currencyFormatter = new Intl.NumberFormat("en-UK", {style: "currency", currency: 'GBP'});
function loadAccountData(index) {
    const chosenBankAccount = bankAccounts[index];

    document.getElementById("account-name-number").innerHTML = "<b>" + chosenBankAccount.accountHolder + "</b> <i>" + chosenBankAccount.accountNumber + "</i>";
    document.getElementById("account-balance").innerHTML = currencyFormatter.format(chosenBankAccount.balance);
}

export function deposit(button) {
    
    const depositAmount = parseFloat(button.previousElementSibling.value);
    
    if (isNaN(depositAmount)) {
        alert("Invalid amount.");
        return;
    }

    bankAccounts[chosenAccountIndex].balance += depositAmount;

    /*alert(`Gave ${currencyFormatter.format(depositAmount)} to ${bankAccounts[chosenAccountIndex].accountHolder}.\nNew Balance: ${currencyFormatter.format(bankAccounts[chosenAccountIndex].balance)}`)*/
    loadAccountData(chosenAccountIndex);
    updateBankAccountNames();
}
window.deposit = deposit;

export function withdraw(button) {

    const withdrawAmount = parseFloat(button.previousElementSibling.value);

    if (isNaN(withdrawAmount)) {
        alert("Invalid amount.");
        return;
    }

    if (bankAccounts[chosenAccountIndex].balance - withdrawAmount < 0)
    {
        alert("Not enough money to withdraw.")
        return;
    }

    bankAccounts[chosenAccountIndex].balance -= withdrawAmount;
    /*alert(`Withdrew ${currencyFormatter.format(withdrawAmount)} from ${bankAccounts[chosenAccountIndex].accountHolder}.\nNew Balance: ${currencyFormatter.format(bankAccounts[chosenAccountIndex].balance)}`)*/
    loadAccountData(chosenAccountIndex);
    updateBankAccountNames();
}
window.withdraw = withdraw;

let bankAccounts = [
    new BankAccount("Sarah Spiffing", "02148830", 13520.00),
    new BankAccount("Neville Nocash", "11748272", 231.75),
    new BankAccount("Larry Luckmann", "88888888", 88888.88),
    new BankAccount("Percy Placeholder", "01234567", 8901.23),
]

updateBankAccountNames();