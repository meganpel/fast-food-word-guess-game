var Letter = require('./Letter.js');

var Word = function(word) {
  this.word = word;

  this.letters = [];

  for (var i = 0; i < word.length; i++) {
    var letter = new Letter(word[i]);

    this.letters.push(letter);
  }

  this.guessLetter = function(guessedLetter) {
    var correctGuess = false;

    for (var i = 0; i < this.letters.length; i++) {
      isCorrect = this.letters[i].guessLetter(guessedLetter);
      if (isCorrect === true) {
        correctGuess = true;
      }
    }

    return correctGuess;
  };

  this.getPuzzle = function() {
    var display = "";

    for (var i = 0; i < this.letters.length; i++) {
      display = display + this.letters[i].displayLetter();
    }

    return display;
  };

  this.isPuzzleSolved = function() {
    for (var i = 0; i < this.letters.length; i++) {
      var guessed = this.letters[i].isLetterGuessed();
      if (guessed === false) {
        return false;
      }
    }

    return true;
  };
};

module.exports = Word;