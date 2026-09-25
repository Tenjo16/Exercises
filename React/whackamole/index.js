function MoleHole(props) {
  let emoji = '';
  if (props.status == 'hidden') {
    emoji = '🕳️';
  } else if (props.status == 'visible') {
    emoji = '🐹';
  } else if (props.status == 'stunned') {
    emoji = '💥';
  }

  function handleClick() {
    if (props.status === 'visible') {
      props.onScoreChange(10);
    } else if (props.status === 'hidden') {
      props.onScoreChange(-5);
    }
  }
  return <button onClick={handleClick} disabled={props.disabled}>{emoji}</button>;
}

function App() {
  const [score, setScore] = React.useState(0);
  const [holes, setHoles] = React.useState(['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden']);
  const [swings, setSwings] = React.useState(10);
  const [gameOverMessage, setGameOverMessage] = React.useState('');

  function handleScoreChange(delta) {
    setScore(score + delta);

    // (only process clicks if swings are remaining)
    if (swings > 0) {
      setScore(score + delta);

      // (calculate newSwings immediately so we can check if it reaches zero)
      const newSwings = swings - 1;
      setSwings(newSwings);

      // (check if newSwings reached zero to trigger game over)
      if (newSwings === 0) {
        setGameOverMessage('Game Over!');
      }
    }
  }

  function shuffleHoles() {
    const newHoles = holes.map(function () {
      // (Math.random() generates a decimal; if under 0.3, mole appears)
      if (Math.random() < 0.3) {
        return 'visible';
      } else {
        return 'hidden';
      }
    });
    setHoles(newHoles);
  }

  return (
    <div>
      <h1>Whackamole 🐹</h1>
      <h2>Score: {score}</h2>
      <h3>Swings: {swings}</h3>
      <h2>{gameOverMessage}</h2>
      <button onClick={shuffleHoles} disabled={swings === 0}>Shuffle</button>
      {holes.map(function (status, index) {
        return <MoleHole
          key={index}
          status={status}
          onScoreChange={handleScoreChange}
          disabled={swings == 0}
        />;
      })}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
