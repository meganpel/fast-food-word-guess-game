var inquirer = require('inquirer');
var Word = require('./Word.js');

var gameWords = [
  "McDonalds", "Subway", "Starbucks", "Wendys", "Burger King", "Taco Bell", "Dunkin Donuts", "Pizza Hut", "KFC", "Chick fil A", "Sonic Drive In", "Dairy Queen", "Chipotle Mexican Grill", "Panda Express", "Little Caesars", "Five Guys", "Churchs Chicken", "Zaxbys", "Steak n Shake", "Bojangles", "Culvers", "Papa Murphys", "Checkers", "Long John Silvers", "White Castle", "Del Taco", "El Pollo Loco", "Boston Market", "Krispy Kreme", "Qdoba", "In N Out Burger", "Baskin Robbins", "Tim Hortons", "Einstein Brothers Bagels"
];

var Game = function(gameWords) {
  this.gameWords = gameWords;

  this.guessesRemaining = 0;
  this.word = null;
  this.solvedPuzzle = "";

  this.startGame = function() {
    var newWord = this.gameWords[Math.floor(Math.random() * this.gameWords.length)];

    this.word = new Word(newWord);
    this.solvedPuzzle = newWord;
    this.guessesRemaining = 10;

    this.initialScreen();
  };

  this.initialScreen = function() {
    printPuzzle(this.word.getPuzzle());

    this.guessLetter();
  };

  this.youLoseScreen = function() {
    printToScreen("You lose!!!");
    printToScreen("The word was: " + this.solvedPuzzle);

    this.startGame();
  };

  this.youWinScreen = function() {
    printPuzzle(this.word.getPuzzle());
    printToScreen("CORRECT!!!");
    printToScreen("You got it right! Next word!");

    this.startGame();
  };

  this.updateGameState = function(lastGuessCorrect) {
    if (lastGuessCorrect === true) {
      if (this.word.isPuzzleSolved() === true) {
        this.youWinScreen();
      } else {
        printToScreen("CORRECT!!!");
        printPuzzle(this.word.getPuzzle());
        this.guessLetter();
      }
    } else {
      printToScreen("INCORRECT!!!");
      this.guessesRemaining--;

      if (this.guessesRemaining > 0) {
        printToScreen(this.guessesRemaining + " guesses remaining!!!");
        this.guessLetter();
      } else {
        this.youLoseScreen();
      }
    }
  };

  this.guessLetter = function() {
    var letterGuess = {
      type: 'input',
      name: 'letter',
      message: 'Guess a letter!',
      validate: function(value) {
        var validInputs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        if (validInputs.indexOf(value) !== -1) {
          return true;
        } else {
          return "Please enter a letter";
        }
      },
      filter: function(val) {
        return val.toLowerCase();
      }
    };

    inquirer.prompt(letterGuess).then(answer => {
      this.playLetter(answer.letter);
    });
  };

  this.playLetter = function(letter) {
    var guessCorrect = this.word.guessLetter(letter);

    this.updateGameState(guessCorrect);
  };
};

function printToScreen(text) {
  console.log(text + "\n");
}

function printPuzzle(puzzleText) {
  printToScreen(puzzleText.split('').join(' '));
}

printToScreen("Welcome to the Fast Food Restaurant Word Guess game!");
var game = new Game(gameWords);
game.startGame();