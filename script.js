const Account = require("./Account");
const CommandLine = require("./CommandLine");

async function main() {
  const accountName = await CommandLine.ask(
    "Which account would you like to access?:"
  );

  // Check if this account exists
  let account = await Account.find(accountName);

  // If no account exists, ask if create account
  if (account == null) {
    await promptCreateAccount(accountName);
  } else {
    doWhatNext(account);
  }
}

async function promptCreateAccount(accountName) {
  const reply = await CommandLine.ask(
    "No account found. Create new account? [Y/N]:"
  );

  if (reply === "Y") {
    const accountCreated = await Account.save(accountName);
    doWhatNext(accountCreated);
  }
}

async function doWhatNext(account) {
  let reply = "";
  do {
    reply = await CommandLine.ask(
      "\nMenu:\n1. View Account Balance\n2. Withdraw\n3. Deposit\n4. End\nWhat would you like to do?"
    );
    switch (reply) {
      // View Balance
      case "1":
        displayBalance(account);
        break;

      // Withdraw
      case "2":
        const withdrawAmount = await CommandLine.ask(
          "How much would you like to withdraw? $"
        );
        account.withdraw(withdrawAmount);
        displayBalance(account);
        break;

      // Deposit
      case "3":
        const depositAmount = await CommandLine.ask(
          "How much would you like to deposit? $"
        );
        account.deposit(depositAmount);
        displayBalance(account);
        break;

      // Exit
      case "4":
        CommandLine.print("Bye-Bye");
        break;
    }
  } while (reply != "4");
}

function displayBalance(account) {
  CommandLine.print(`You have $${account.balance} in your account`);
}

main();
