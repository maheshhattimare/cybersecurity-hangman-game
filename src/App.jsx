import { useState, useEffect } from "react";
import Hangman from "./components/Hangman";
import Keyboard from "./components/Keyboard";
import QuestionCard from "./components/QuestionCard";
import { questions } from "./data/questions";
import "./App.css";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [showResult, setShowResult] = useState(false);

  const maxWrong = 6;
  const currentQuestion = questions[currentQuestionIndex];
  const word = currentQuestion.word.toUpperCase();
  const wordLetters = word.replace(/\s/g, "").split("");

  const isWordGuessed = wordLetters.every((letter) =>
    guessedLetters.includes(letter)
  );

  const isGameLost = wrongGuesses >= maxWrong;

  useEffect(() => {
    if (isWordGuessed && gameState === "playing") {
      setGameState("won");
      setScore(score + 1);
      setShowResult(true);
    } else if (isGameLost && gameState === "playing") {
      setGameState("lost");
      setShowResult(true);
    }
  }, [isWordGuessed, isGameLost, gameState, score]);

  const handleLetterClick = (letter) => {
    if (gameState !== "playing") return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!wordLetters.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setGuessedLetters([]);
      setWrongGuesses(0);
      setGameState("playing");
      setShowResult(false);
    } else {
      setGameState("finished");
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setScore(0);
    setGameState("playing");
    setShowResult(false);
  };

  if (gameState === "finished") {
    return (
      <div className="app">
        <div className="final-screen">
          <h2>Game Over</h2>
          <div className="final-score">
            You got {score} out of {questions.length} correct
          </div>
          <p className="final-message">
            {score === questions.length
              ? "Perfect! You know your cybersecurity basics."
              : score >= questions.length / 2
              ? "Not bad! Keep learning about online safety."
              : "Practice makes perfect. Try again!"}
          </p>
          <button className="restart-btn" onClick={handleRestart}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Cybersecurity Hangman</h1>
        <div className="score">
          Score: {score} / {questions.length}
        </div>
      </header>

      <div className="game-container">
        <div className="left-section">
          <Hangman wrongGuesses={wrongGuesses} />
        </div>

        <div className="right-section">
          <QuestionCard
            word={word}
            hint={currentQuestion.hint}
            guessedLetters={guessedLetters}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />

          {showResult && (
            <div className={`result-message ${gameState}`}>
              {gameState === "won" ? (
                <>
                  <div className="result-title">Correct!</div>
                  <div className="result-feedback">
                    {currentQuestion.feedback}
                  </div>
                </>
              ) : (
                <>
                  <div className="result-title">The answer was: {word}</div>
                  <div className="result-feedback">
                    {currentQuestion.feedback}
                  </div>
                </>
              )}
              <button className="next-btn" onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1
                  ? "Next Question"
                  : "Finish"}
              </button>
            </div>
          )}

          {!showResult && (
            <Keyboard
              usedLetters={guessedLetters}
              onLetterClick={handleLetterClick}
              disabled={gameState !== "playing"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
