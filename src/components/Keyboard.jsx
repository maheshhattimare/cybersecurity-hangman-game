const Keyboard = ({ usedLetters, onLetterClick, disabled }) => {
  const rows = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split(""),
  ];

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => {
            const isUsed = usedLetters.includes(letter);
            return (
              <button
                key={letter}
                className={`key ${isUsed ? "used" : ""}`}
                onClick={() => onLetterClick(letter)}
                disabled={isUsed || disabled}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
