function DancingCat(props) {
  const [isDancing, setIsDancing] = React.useState(false)

  function handleClick() {
    setIsDancing(!isDancing)
    props.onToggle(!isDancing)
    // handleCat1(!isDancing)
  }
  return (
    <img className="images" onClick={handleClick} src={isDancing ? props.gifSrc : props.imgSrc} />
  )
}



function App() {
  const [cat1, setCat1] = React.useState(false)
  const [cat2, setCat2] = React.useState(false)

  function handleCat1Toggle(nextIsDancing) {
    setCat1(nextIsDancing);
  }

  function handleCat2Toggle(nextIsDancing) {
    setCat2(nextIsDancing);
  }

  if (cat1 && cat2) {
    console.log('both cats are dancing');
  }

  return (
    <div>
      <div>
        <DancingCat
          imgSrc='images/cat.jpg'
          gifSrc='images/scuba.gif'
          isDancing={cat1}
          onToggle={handleCat1Toggle}
        />
        <DancingCat
          imgSrc='images/cat.jpg'
          gifSrc='images/scuba.gif'
          isDancing={cat2}
          onToggle={handleCat2Toggle}
        />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);