
let header = createDiv("header",document.body, "Hangman Christmas Edition");

let mainArea = document.createElement("div");
mainArea.className = "main";
document.body.appendChild(mainArea);

let playAgain = createDiv("play-again",mainArea, "Press play to play again");
let playBtn = createDiv("play-btn",mainArea, "Play", play);
let footer = createDiv("footer", document.body, "Copyright " + '\251' + " 2022 Linn Johannson" );


function play() { 

    const wordsArray = [
    "baking",
    "bells",
    "candy", 
    "carols",
    "christmas", 
    "cookies",
    "eggnog",
    "elf",
    "gift", 
    "gingerbread",
    "mistletoe",
    "porrige", 
    "reindeer",
    "santa", 
    "stocking",
    ];

    let chosenWord = (wordsArray[Math.floor(Math.random() * wordsArray.length)]);
    let feedback = "Guess the Christmas word";
    let correctLetters = [];
    let inCorrectLetters = [];
    let gussesLeft = 10;
    let numberPattern = /^[0-9]$/;
    let endAlert = chosenWord.toUpperCase() + "\n" + "\nPress the Play-button to play again";

    while (gussesLeft > 0 && !hasWon()){    
        let guess = prompt (feedback + "\nYou have " + gussesLeft + " guesses left" + "\n" + displayWord() + "\nEnter a letter :");

        if (guess !== null) {
            guess = guess.toLowerCase();
        } else {
            showPlayAgain();
            return;
        }

        if (correctLetters.includes(guess) || inCorrectLetters.includes(guess)) {
            feedback = "You have already tried that letter";
        } else if (guess.length != 1 || numberPattern.test(guess)) { 
            feedback = "Write only ONE letter NOT two and NOT a number";
        } else {
            if (isCorrectLetter(guess)) {
            correctLetters.push(guess);
            feedback = "Good job! Letter is found!";
            } else {
                inCorrectLetters.push(guess);
                feedback = "That letter is not in the word";
                gussesLeft--;
            }
        }
    }

    if (hasWon()) {
        alert("Congrats! You have won!" + "\nYou found " + endAlert);
        } else {
            alert("You lost! \nThe correct word was " + endAlert);
        }
    
    function hasWon() {
        return !displayWord().includes("_"); 
    }

    function isCorrectLetter(singleLetter) {
        return chosenWord.includes(singleLetter);   
    } 

    function displayWord(){
        let wordToDisplay = "";

        for (let i = 0; i < chosenWord.length; i++) {
            const LetterToCheck = chosenWord.charAt(i);
            if (correctLetters.includes(LetterToCheck)) {
                wordToDisplay += LetterToCheck;
            } else {
                wordToDisplay += "_";
            }
            wordToDisplay += " ";
        }
        return wordToDisplay.toUpperCase();
    }
}

function createDiv(className, appendElement, text, functionClick) {
    let div = document.createElement("div");
    div.textContent = text;
    div.id = className;
    div.className = className;
    appendElement.appendChild(div).addEventListener("click", functionClick);
}

function showPlayAgain() {
    let playAgain = document.getElementById("play-again");
    playAgain.classList.add("active");
}
