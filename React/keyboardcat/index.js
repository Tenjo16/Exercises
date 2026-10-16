function KeyboardCat() {
  // isPressed is state variable (boolean) and setIsPressed is function to update it
  const [isPressed, setIsPressed] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(event) {
      setIsPressed(true);
    }

    function handleKeyUp() {
      setIsPressed(false);
    }

    // Event listeners watch for keyboard activity across the browser window
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);


  }, []);

  return (
    <div className="cat-container">
      <img className="cat-image"
        src={isPressed ? `images/catdown.png` : `images/catup.png`}
        alt="Typing Cat Overlay"
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <KeyboardCat />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
