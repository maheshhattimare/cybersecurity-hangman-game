const QuestionCard = ({
  word,
  hint,
  guessedLetters,
  currentQuestion,
  totalQuestions,
}) => {
  const displayWord = word.split("").map((char) => {
    if (char === " ") {
      return " ";
    }
    return guessedLetters.includes(char) ? char : "_";
  });

  return (
    <div className="question-card">
      <div className="question-number">
        Question {currentQuestion} of {totalQuestions}
      </div>
      <div className="word-display">
        {displayWord.map((char, index) => (
          <span key={index} className={char === " " ? "space" : "letter"}>
            {char}
          </span>
        ))}
      </div>
      <div className="hint">
        <span className="hint-label">Hint:</span> {hint}
      </div>
    </div>
  );
};

export default QuestionCard;
