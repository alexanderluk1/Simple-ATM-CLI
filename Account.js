const FileSystem = require("./FileSystem");
const CommandLine = require("./CommandLine");

// Accounts require: Balance, view, withdraw, deposit
module.exports = class Account {
  constructor(name) {
    this.#name = name;
  }

  // Private Variables we don't want outside to access
  #name;
  #balance;

  get name() {
    return this.#name;
  }

  get balance() {
    return this.#balance;
  }

  get filePath() {
    return `accounts/${this.#name}.txt`;
  }

  withdraw(amount) {
    // Checks if there is enough money to withdraw
    if (this.#balance < amount) {
      CommandLine.print("\nBalance not enough for withdrawal");
    } else {
      this.#balance -= amount;
      Account.save(this.#name, this.#balance);
      CommandLine.print("\nWithdraw success");
    }
  }

  deposit(amount) {
    this.#balance += parseFloat(amount);
    CommandLine.print("\nDeposit success");
    Account.save(this.#name, this.#balance);
  }

  // This will retrieve data from `accounts/username.txt` &
  // load the balance into the #balance variable
  async #load() {
    this.#balance = parseFloat(await FileSystem.read(this.filePath));
    console.log(this.#balance);
  }

  // Find Stored Account
  static async find(accountName) {
    const account = new Account(accountName);
    try {
      await account.#load(); // If this works, return an existing account
      return account;
    } catch (e) {
      return; // Else, return nothing
    }
  }

  static async save(accountName, amount = 0) {
    const account = new Account(accountName);
    account.#balance = await FileSystem.write(account.filePath, amount);
    return account;
  }
};
