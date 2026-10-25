function LightSwitch({ onToggle }) {
  const [isOn, setIsOn] = React.useState(false);

  function handleSwitch() {
    setIsOn(!isOn)
    onToggle()
  }
  return (
    <div>
      <button className="lights" onClick={handleSwitch}>
        {isOn ? "🟢" : "⚪"}
      </button>
    </div>
  );
}

function Meme({ isDancing }) {
  return (
    <img className='images' src={isDancing ? 'images/scuba.gif' : 'images/cat.jpg'} />
  );
}

function App() {
  const [isDancing, setIsDancing] = React.useState(false)
  const [light1, setLight1] = React.useState(false)
  const [light2, setLight2] = React.useState(false)

  function handleLight1() {
    setLight1(!light1)
  }

  function handleLight2() {
    setLight2(!light2)
  }

  function handleToggle() {
    setIsDancing(!isDancing)
  }

  return (
    <div>
      <div className='images'>
        <Meme isDancing={light1 && light2} />
      </div>
      <div className='lights-container'>
        <LightSwitch onToggle={handleLight1} />
        <LightSwitch onToggle={handleLight2} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);