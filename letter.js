//requires
var inquirer = require('inquirer');


// letter.js  compares the user input to the chosen word
function compareWord(count, word, wordToGuess, guessLeft, correctLetter, display, restart){
    // new addition
    this.count = count;
    this.word = word;
    this.wordToGuess = wordToGuess
    this.guessLeft = guessLeft;
    this.correctLetter = correctLetter;
    this.display = display;
    this.restart = restart;
    //new addition ends here
    
    //this if checks if the count is 1. This way, the program knows when the user has guessed the entire word.
    if (count == 0){
        console.log("-----------------------------");
        console.log(display);
        console.log("-----------------------------");
        console.log(" YOU WON! \n");
        restart();
    }
    //if count is not 1 yet, then the user keeps going
    else{
        //ask the user for an input letter
        inquirer.prompt([
            {
                name: "letter",
                message: "Guess a letter: ".bgWhite
            }]).then(function(answers) {
                var letter = answers.letter;
                //changes words to lower case
                var wordLower = word.toLowerCase();
                // switch statements for the logic needed when the user inputs a letter. It is based on # of guesses left
                switch(guessLeft){
                    //case when user runs out of guesses left
                    case 1:
                        console.log("\nNO MORE ATTEMPTS, Loser!".red + '\n');
                        restart();
                    break;

                    //user still has attempts left
                    default:
                        if (correctLetter.indexOf(letter)!= -1){
                            console.log("\nLetters guessed so far: " + correctLetter);
                            console.log("-----------------------------");
                            console.log(display);
                            console.log("-----------------------------");
                            console.log("You already guessed that letter, try another one!" + '\n');
                            compareWord(count, word, wordToGuess, guessLeft, correctLetter, display,restart);
                        }
                        //checks to see if the input is in the chosen word. -1 means it's not
                        else if (wordLower.indexOf(letter) == -1 && word.indexOf(letter)== -1){
                            console.log("\nLetters guessed so far: " + correctLetter);
                            console.log("-----------------------------");
                            console.log(display);
                            guessLeft--;
                            console.log("-----------------------------");
                            console.log("INCORRECT! ".magenta + guessLeft + " guess(es) remaining".magenta + '\n');
                            compareWord(count, word, wordToGuess, guessLeft, correctLetter, display,restart);
                        }
                        //code for when the guessed letter is correct
                        else{
                            for (var i=0; i<word.length; i++){
                                if (letter == wordLower.charAt(i) || letter == word.charAt(i)){
                                    //using word.charAt(i) so that the final display shows uppercases where they belong. Housekeeping stuff.
                                    wordToGuess[i] = word.charAt(i);
                                    count--;
                                }
                                else if (letter == wordLower){
                                    wordToGuess[i] = word.charAt(i);
                                    count = 0;
                                }
                            }
                            
                            correctLetter.push(letter);
                            console.log("\nLetters guessed so far: " + correctLetter);
                            console.log("-----------------------------");
                            display = wordToGuess.join(" ");
                            //decrease count here to keep track of how many letters-to-guess are left
                            console.log(display);
                            console.log("-----------------------------");
                            console.log("GOOD GUESS, KEEP IT UP!".cyan + '\n');
                            compareWord(count, word, wordToGuess, guessLeft, correctLetter, display,restart);
                        } //else ends here
                    break; //switch ends here
                }
            }); 
    } //big else ends here

}


module.exports = compareWord;