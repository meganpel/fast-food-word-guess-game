var Letter = function(actualLetter) {
    this.actualLetter = actualLetter;
  
    if (actualLetter !== " ") {
      this.guessed = false;
    }
  
    this.displayLetter = function() {
      if (this.guessed === false) {
        return "_";
      } else {
        return this.actualLetter;
      }
    };
  
    this.guessLetter = function(guessedLetter) {
      if (this.actualLetter.toLowerCase() === guessedLetter) {
        this.guessed = true;
  
        return true;
      }
  
      return false;
    };
  
    this.isLetterGuessed = function() {
      return this.guessed;
    };
  };
  
  module.exports = Letter;