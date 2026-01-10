import { createSignal, createEffect, onCleanup, Show, For } from 'solid-js';
import { categories, categoryKeys, getCategoryWords, shuffleArray } from './words';
import {
  initAudio,
  playCountdownTick,
  playSuccessSound,
  playSkipSound,
  playRoundEndSound,
  playWinSound
} from './audio';

const ROUND_DURATION = 60; // seconds
const ROUNDS_TO_WIN = 7;
const POINTS_PER_CORRECT = 2;
const SKIP_PENALTY = 1;

function App() {
  // Game state
  const [gamePhase, setGamePhase] = createSignal('setup'); // setup, ready, playing, roundEnd, gameOver
  const [team1Name, setTeam1Name] = createSignal('Team 1');
  const [team2Name, setTeam2Name] = createSignal('Team 2');
  const [selectedCategory, setSelectedCategory] = createSignal('food');

  // Round state
  const [timeRemaining, setTimeRemaining] = createSignal(ROUND_DURATION);
  const [currentTeam, setCurrentTeam] = createSignal(1); // 1 or 2
  const [team1RoundScore, setTeam1RoundScore] = createSignal(0);
  const [team2RoundScore, setTeam2RoundScore] = createSignal(0);

  // Overall game state
  const [team1Rounds, setTeam1Rounds] = createSignal(0);
  const [team2Rounds, setTeam2Rounds] = createSignal(0);
  const [roundNumber, setRoundNumber] = createSignal(1);

  // Word state
  const [availableWords, setAvailableWords] = createSignal([]);
  const [currentWordIndex, setCurrentWordIndex] = createSignal(0);

  // Timer interval reference
  let timerInterval = null;

  // Get current word
  const currentWord = () => availableWords()[currentWordIndex()] || '';

  // Get current team name
  const currentTeamName = () => currentTeam() === 1 ? team1Name() : team2Name();

  // Get current category info
  const currentCategoryInfo = () => categories[selectedCategory()];

  // Get urgency level based on time remaining
  const urgencyLevel = () => {
    const time = timeRemaining();
    if (time <= 10) return 'critical';
    if (time <= 30) return 'high';
    if (time <= 60) return 'medium';
    return 'low';
  };

  // Initialize words for a new round
  function initializeWords() {
    const words = getCategoryWords(selectedCategory());
    setAvailableWords(shuffleArray(words));
    setCurrentWordIndex(0);
  }

  // Start the game (go to ready phase)
  function startGame() {
    initializeWords();
    setTeam1RoundScore(0);
    setTeam2RoundScore(0);
    setTeam1Rounds(0);
    setTeam2Rounds(0);
    setRoundNumber(1);
    setCurrentTeam(1);
    setTimeRemaining(ROUND_DURATION);
    setGamePhase('ready');
  }

  // Start the round (begin countdown)
  function startRound() {
    initAudio(); // Enable audio on user interaction
    setGamePhase('playing');
    startTimer();
  }

  // Start the timer
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        if (newTime > 0) {
          playCountdownTick(newTime, ROUND_DURATION);
        }
        if (newTime <= 0) {
          endRound();
          return 0;
        }
        return newTime;
      });
    }, 1000);
  }

  // Stop the timer
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // Handle correct guess
  function handleCorrect() {
    playSuccessSound();

    if (currentTeam() === 1) {
      setTeam1RoundScore(prev => prev + POINTS_PER_CORRECT);
    } else {
      setTeam2RoundScore(prev => prev + POINTS_PER_CORRECT);
    }

    // Switch to next team
    switchTeam();
    nextWord();
  }

  // Handle skip
  function handleSkip() {
    playSkipSound();

    if (currentTeam() === 1) {
      setTeam1RoundScore(prev => prev - SKIP_PENALTY);
    } else {
      setTeam2RoundScore(prev => prev - SKIP_PENALTY);
    }

    nextWord();
  }

  // Switch to next team
  function switchTeam() {
    setCurrentTeam(prev => prev === 1 ? 2 : 1);
  }

  // Move to next word
  function nextWord() {
    setCurrentWordIndex(prev => {
      const next = prev + 1;
      if (next >= availableWords().length) {
        // Reshuffle if we run out
        setAvailableWords(shuffleArray(wordList));
        return 0;
      }
      return next;
    });
  }

  // End the current round
  function endRound() {
    stopTimer();
    playRoundEndSound();

    const t1Score = team1RoundScore();
    const t2Score = team2RoundScore();

    // Determine round winner
    if (t1Score > t2Score && t1Score > 0) {
      setTeam1Rounds(prev => prev + 1);
    } else if (t2Score > t1Score && t2Score > 0) {
      setTeam2Rounds(prev => prev + 1);
    } else if (t1Score === t2Score && t1Score > 0) {
      // Tie with positive scores - both get a point
      setTeam1Rounds(prev => prev + 1);
      setTeam2Rounds(prev => prev + 1);
    }
    // If both have 0 or less, no points awarded

    setGamePhase('roundEnd');
  }

  // Check for game winner
  function checkGameWinner() {
    const t1 = team1Rounds();
    const t2 = team2Rounds();

    if (t1 >= ROUNDS_TO_WIN && t1 > t2) {
      return 1;
    }
    if (t2 >= ROUNDS_TO_WIN && t2 > t1) {
      return 2;
    }
    return null;
  }

  // Start next round (go to ready phase)
  function startNextRound() {
    const winner = checkGameWinner();
    if (winner) {
      playWinSound();
      setGamePhase('gameOver');
      return;
    }

    setRoundNumber(prev => prev + 1);
    setTeam1RoundScore(0);
    setTeam2RoundScore(0);
    setTimeRemaining(ROUND_DURATION);
    setCurrentTeam(1);
    initializeWords();
    setGamePhase('ready');
  }

  // Reset to setup
  function resetGame() {
    stopTimer();
    setGamePhase('setup');
    setTeam1Name('Team 1');
    setTeam2Name('Team 2');
  }

  // Format time as MM:SS
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Get winner name
  function getWinnerName() {
    const winner = checkGameWinner();
    if (winner === 1) return team1Name();
    if (winner === 2) return team2Name();
    return '';
  }

  // Cleanup on unmount
  onCleanup(() => {
    stopTimer();
  });

  return (
    <div class="app">
      <header class="header">
        <h1>WordRush</h1>
        <p class="subtitle">Team Word Guessing Game</p>
      </header>

      {/* Setup Phase */}
      <Show when={gamePhase() === 'setup'}>
        <div class="setup-screen">
          <h2>Game Setup</h2>
          <div class="team-setup">
            <div class="team-input">
              <label>Team 1 Name:</label>
              <input
                type="text"
                value={team1Name()}
                onInput={(e) => setTeam1Name(e.target.value || 'Team 1')}
                placeholder="Team 1"
              />
            </div>
            <div class="team-input">
              <label>Team 2 Name:</label>
              <input
                type="text"
                value={team2Name()}
                onInput={(e) => setTeam2Name(e.target.value || 'Team 2')}
                placeholder="Team 2"
              />
            </div>
          </div>

          <div class="category-selection">
            <h3>Choose a Category</h3>
            <div class="category-grid">
              <For each={categoryKeys}>
                {(key) => (
                  <button
                    class={`category-button ${selectedCategory() === key ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory(key)}
                  >
                    <span class="category-icon">{categories[key].icon}</span>
                    <span class="category-name">{categories[key].name}</span>
                  </button>
                )}
              </For>
            </div>
          </div>

          <div class="rules">
            <h3>How to Play</h3>
            <ul>
              <li>One player sees a word and describes it to teammates</li>
              <li>Correct guess = <strong>+2 points</strong>, then pass to other team</li>
              <li>Skip a word = <strong>-1 point</strong></li>
              <li>60 seconds per round</li>
              <li>Highest score wins the round</li>
              <li>Tie with positive scores = both teams get a round point</li>
              <li>First to <strong>7 rounds</strong> (and ahead) wins!</li>
            </ul>
          </div>
          <button class="start-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      </Show>

      {/* Ready Phase - waiting to start round */}
      <Show when={gamePhase() === 'ready'}>
        <div class="ready-screen">
          <div class="round-header">
            <h2>Round {roundNumber()}</h2>
          </div>

          <div class="full-scoreboard">
            <div class="full-team-score">
              <span class="team-name">{team1Name()}</span>
              <span class="rounds-won-large">{team1Rounds()}</span>
              <span class="rounds-label">rounds won</span>
            </div>
            <div class="score-divider">
              <span>vs</span>
            </div>
            <div class="full-team-score">
              <span class="team-name">{team2Name()}</span>
              <span class="rounds-won-large">{team2Rounds()}</span>
              <span class="rounds-label">rounds won</span>
            </div>
          </div>

          <div class="ready-info">
            <p>First to {ROUNDS_TO_WIN} rounds wins!</p>
            <p class="first-team">{currentTeamName()} goes first</p>
          </div>

          <button class="start-round-button" onClick={startRound}>
            Start Round
          </button>
        </div>
      </Show>

      {/* Playing Phase */}
      <Show when={gamePhase() === 'playing'}>
        <div class="game-screen">
          <div class="scoreboard">
            <div class={`team-score ${currentTeam() === 1 ? 'active' : ''}`}>
              <span class="team-name">{team1Name()}</span>
              <span class="rounds-won-prominent">{team1Rounds()} - {team2Rounds()}</span>
              <span class="round-score">{team1RoundScore()} pts</span>
            </div>
            <div class="round-info">
              <span>Round {roundNumber()}</span>
            </div>
            <div class={`team-score ${currentTeam() === 2 ? 'active' : ''}`}>
              <span class="team-name">{team2Name()}</span>
              <span class="rounds-won-prominent">{team2Rounds()} - {team1Rounds()}</span>
              <span class="round-score">{team2RoundScore()} pts</span>
            </div>
          </div>

          <div class={`timer urgency-${urgencyLevel()}`}>
            <span class="time-display">{formatTime(timeRemaining())}</span>
          </div>

          <div class="current-team-indicator">
            <span>{currentTeamName()}'s Turn</span>
          </div>

          <div class="word-display">
            <div class="word-card">
              <span class="word">{currentWord()}</span>
            </div>
          </div>

          <div class="action-buttons">
            <button class="skip-button" onClick={handleSkip}>
              Skip (-1)
            </button>
            <button class="correct-button" onClick={handleCorrect}>
              Correct! (+2)
            </button>
          </div>
        </div>
      </Show>

      {/* Round End Phase */}
      <Show when={gamePhase() === 'roundEnd'}>
        <div class="round-end-screen">
          <h2>Round {roundNumber()} Complete!</h2>

          <div class="round-results">
            <div class="result-team">
              <span class="team-name">{team1Name()}</span>
              <span class="score">{team1RoundScore()} points</span>
            </div>
            <div class="vs">vs</div>
            <div class="result-team">
              <span class="team-name">{team2Name()}</span>
              <span class="score">{team2RoundScore()} points</span>
            </div>
          </div>

          <div class="round-winner">
            <Show when={team1RoundScore() > team2RoundScore() && team1RoundScore() > 0}>
              <span class="winner-text">{team1Name()} wins the round!</span>
            </Show>
            <Show when={team2RoundScore() > team1RoundScore() && team2RoundScore() > 0}>
              <span class="winner-text">{team2Name()} wins the round!</span>
            </Show>
            <Show when={team1RoundScore() === team2RoundScore() && team1RoundScore() > 0}>
              <span class="winner-text">It's a tie! Both teams get a point!</span>
            </Show>
            <Show when={team1RoundScore() <= 0 && team2RoundScore() <= 0}>
              <span class="winner-text">No points scored - no round points awarded!</span>
            </Show>
          </div>

          <div class="overall-standings">
            <h3>Overall Standings</h3>
            <div class="standings">
              <span>{team1Name()}: {team1Rounds()} rounds</span>
              <span>{team2Name()}: {team2Rounds()} rounds</span>
            </div>
            <p class="win-condition">First to {ROUNDS_TO_WIN} rounds (and ahead) wins!</p>
          </div>

          <button class="next-round-button" onClick={startNextRound}>
            {checkGameWinner() ? 'See Results' : 'Start Next Round'}
          </button>
        </div>
      </Show>

      {/* Game Over Phase */}
      <Show when={gamePhase() === 'gameOver'}>
        <div class="game-over-screen">
          <h2>Game Over!</h2>
          <div class="winner-announcement">
            <span class="trophy">🏆</span>
            <span class="winner-name">{getWinnerName()} Wins!</span>
          </div>
          <div class="final-score">
            <span>{team1Name()}: {team1Rounds()} rounds</span>
            <span>{team2Name()}: {team2Rounds()} rounds</span>
          </div>
          <button class="play-again-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      </Show>
    </div>
  );
}

export default App;
