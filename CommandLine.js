const readline = require("readline"); // Library to get js input (Built into NodeJS)

module.exports = class CommandLine {
  // Static method tied to the Class to ask questions
  static ask(question) {
    // For the CLI
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // ReadLine format:
    // rl.question(question, (answer) => {
    // Do something to the answer
    // rl.close()
    // })

    // Returns a new promise
    return new Promise((resolve) => {
      rl.question(`${question} `, (answer) => {
        resolve(answer);
        rl.close();
      });
    });
  }

  static print(text) {
    console.log(text);
  }
};
