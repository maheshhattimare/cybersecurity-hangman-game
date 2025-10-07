const Hangman = ({ wrongGuesses }) => {
  const maxWrong = 6;

  return (
    <div className="hangman-container">
      <svg className="hangman-svg" viewBox="0 0 200 250">
        {/* Base */}
        <line
          x1="20"
          y1="230"
          x2="180"
          y2="230"
          stroke="#666"
          strokeWidth="3"
        />
        {/* Pole */}
        <line x1="50" y1="230" x2="50" y2="20" stroke="#666" strokeWidth="3" />
        {/* Top bar */}
        <line x1="50" y1="20" x2="130" y2="20" stroke="#666" strokeWidth="3" />
        {/* Rope */}
        <line x1="130" y1="20" x2="130" y2="50" stroke="#666" strokeWidth="3" />

        {/* Head */}
        {wrongGuesses >= 1 && (
          <circle
            cx="130"
            cy="70"
            r="20"
            stroke="#999"
            strokeWidth="3"
            fill="none"
          />
        )}

        {/* Body */}
        {wrongGuesses >= 2 && (
          <line
            x1="130"
            y1="90"
            x2="130"
            y2="150"
            stroke="#999"
            strokeWidth="3"
          />
        )}

        {/* Left arm */}
        {wrongGuesses >= 3 && (
          <line
            x1="130"
            y1="110"
            x2="100"
            y2="130"
            stroke="#999"
            strokeWidth="3"
          />
        )}

        {/* Right arm */}
        {wrongGuesses >= 4 && (
          <line
            x1="130"
            y1="110"
            x2="160"
            y2="130"
            stroke="#999"
            strokeWidth="3"
          />
        )}

        {/* Left leg */}
        {wrongGuesses >= 5 && (
          <line
            x1="130"
            y1="150"
            x2="110"
            y2="190"
            stroke="#999"
            strokeWidth="3"
          />
        )}

        {/* Right leg */}
        {wrongGuesses >= 6 && (
          <line
            x1="130"
            y1="150"
            x2="150"
            y2="190"
            stroke="#999"
            strokeWidth="3"
          />
        )}
      </svg>
      <div className="wrong-count">
        Mistakes: {wrongGuesses} of {maxWrong}
      </div>
    </div>
  );
};

export default Hangman;
