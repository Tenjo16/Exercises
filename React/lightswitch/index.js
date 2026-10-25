function DancingCat({ isDancing }) {
  return (
    <img className='images' src={isDancing ? 'images/scuba.gif' : 'images/cat.jpg'} />
  )
}

function LightSwitch({ onToggle }) {
  const [isOn, setIsOn] = React.useState(false)
  function handleSwitch() {
    setIsOn(!isOn)
    onToggle()
  }

  return (
    <div >
      <button className='lights' onClick={handleSwitch}>{isOn ? "🟢" : "⚪"}</button>
    </div>
  )
}

function App() {
  const [light1, setLight1] = React.useState(false)
  const [light2, setLight2] = React.useState(false)
  const [light3, setLight3] = React.useState(false)

  function handleLight1() {
    setLight1(!light1)
  }

  function handleLight2() {
    setLight2(!light2)
  }

  function handleLight3() {
    setLight3(!light3)
  }

  return (
    <div>
      <div className='images'>
        <DancingCat
          isDancing={light1 && light2 && light3} />
      </div>
      <div className='lights-container'>
        <LightSwitch onToggle={handleLight1} />
        <LightSwitch onToggle={handleLight2} />
        <LightSwitch onToggle={handleLight3} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);