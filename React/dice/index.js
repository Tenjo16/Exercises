function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

/* Click handler. Call props so that DieButton in the return
can properly use the rollDie() */
function DieButton(props) {
  function handleClick() {
    props.onRoll(props.sides);
    // This essentially translates to handleRoll(sides)
    /* Note that we are calling props.onRoll and props.sides
    so that we can call this function in the return. We use
    these so that when we call DieButton(), we call these props */
  }
  return <button onClick={handleClick}>d{props.sides}</button>;
  /*Afterwards we return this function and finish the click handler
  by giving the button its functions */
}

function App() {
  const [diceResult, setDiceResult] = React.useState(null);

  /* Handles result display by grabbing the
   random number generator from rollDie() */
  function handleRoll(sides) {
    const result = rollDie(sides);
    setDiceResult(result);
  }
  return (
    <div>
      <h1>Dice</h1>
      <h2>Result: {diceResult == null ? '-' : diceResult}</h2>
      <DieButton sides={6} onRoll={handleRoll} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

/* Step 1:
Create Math.random to make dice roll by
making a dice roll function (rollDie())

Step 2:
Declare a const variable for dice results with Reacts use state.
Have the dice update by changing value with the setter function
within the variables 2nd array.

Step 3:
Create a roll result display function which grabs from rollDie()'s
result. Make sure rollDie() is calling something (sides).

Step 4:
Create a die button and a button handler for it within a function.
(DieButton())
Call props so that it can be called for its sides (props.sides)
and rolling (props.onRoll)

Step 5: Grab the DieButton() and move it within the return inside of
a < />. In this function, we call 6 sides and assign
a name "onRoll" that will take "handleRoll" */