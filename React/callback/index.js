function LightSwitch(props) {
  const [isFlipped, setisFlipped] = React.useState(false)

  function handleSwitch() {
    setisFlipped(!isFlipped)
    if (isFlipped) {
      props.onEnabled()
    } else {
      props.onDisabled()
    }
  }
  return (
    <button onClick={handleSwitch}>{isFlipped ? 'Power On' : 'Power Off'}</button>
  )
}


function App() {
  const [isOn, setisOn] = React.useState(false)

  function handleEnabled() {
    setisOn(true)
  }

  function handleDisabled() {
    setisOn(false)
  }

  return (
    <div>
      <div>
        <h2>Machine is {isOn ? 'On' : 'Off'}</h2>
      </div>
      <div>
        <LightSwitch
          onEnabled={handleEnabled} onDisabled={handleDisabled} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// A component called "LightSwitch". Inside a button with the word "on"
// The LightSwitch takes a prop function called 'onEnable'. This function is called when 'On' is clicked, the function is not called when 'Off' is clicked.
