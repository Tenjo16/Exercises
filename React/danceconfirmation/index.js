function DancingCats(props) {
  return (
    <img className='images' src={props.isDancing ? props.gifSrc : props.imgSrc} />
  );
}

function LightSwitch({isOn, onToggle}) {

  function handleSwitch() {
    onToggle()
  }

  return (
    <div>
      <button className="lights" onClick={handleSwitch}>
        {isOn ? "🟢" : "🔘"}
      </button>
    </div>
  );
}

function App() {
  const [light1, setLight1] = React.useState(false);
  const [light2, setLight2] = React.useState(false);
  const [light3, setLight3] = React.useState(false);
  const allOn = light1 && light2 && light3;
  return (
    <div>
      <DancingCats
        imgSrc='images/cat.jpg'
      gifSrc='images/scuba.gif'
      isDancing={allOn}
      />
      <div className='lights-container'>
<LightSwitch isOn={light1} onToggle={() => setLight1(!light1)} />
<LightSwitch isOn={light2} onToggle={() => setLight2(!light2)} />
<LightSwitch isOn={light3} onToggle={() => setLight3(!light3)} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);