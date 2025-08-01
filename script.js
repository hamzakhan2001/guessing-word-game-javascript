let selectedWord = "";
let guessedLetters = [];
let wrongLetters = [];

const wordDisplay = document.getElementById("word-display");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const messageDisplay = document.getElementById("message");
const input = document.getElementById("letter-input");

async function fetchRandomWord() {
  try {
    const res = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    const data = await res.json();
    selectedWord = data[0].toLowerCase();
    displayWord();
  } catch (err) {
    messageDisplay.textContent = "Error fetching word. Try again.";
    console.error(err);
  }
}

function displayWord() {
  const display = selectedWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  wordDisplay.textContent = display;
}

function guessLetter() {
  const letter = input.value.toLowerCase();
  input.value = "";

  if (!letter || letter.length !== 1 || !letter.match(/[a-z]/)) {
    alert("Enter a valid letter!");
    return;
  }

  if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
    alert("You already guessed that letter.");
    return;
  }

  if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);
  } else {
    wrongLetters.push(letter);
  }

  updateGame();
}

function updateGame() {
  displayWord();
  wrongLettersDisplay.textContent = "Wrong letters: " + wrongLetters.join(", ");

  const wordGuessed = selectedWord.split("").every(letter => guessedLetters.includes(letter));

  if (wordGuessed) {
    messageDisplay.textContent = "🎉 Congratulations! You guessed the word!";
    disableGame();
  } else if (wrongLetters.length >= 6) {
    messageDisplay.textContent = `😢 You lost! The word was "${selectedWord}"`;
    disableGame();
  }
}

function disableGame() {
  input.disabled = true;
}

function resetGame() {
  guessedLetters = [];
  wrongLetters = [];
  messageDisplay.textContent = "";
  input.disabled = false;
  input.focus();
  fetchRandomWord();
  wrongLettersDisplay.textContent = "Wrong letters: ";
}

// Start the game with random word
fetchRandomWord();
