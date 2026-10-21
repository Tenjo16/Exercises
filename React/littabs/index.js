
function App() {
  const [lit, setIsLit] = React.useState(null)

  function boxLit(id){
    if (lit === id){
      setIsLit(null)
    } else {
      setIsLit(id)
    }
  }
  return (
    <div className="box-container">
      <div onClick={() => boxLit(1)} className={lit === 1 ? "box box-lit" : "box"}><h1>😀</h1></div>
      <div onClick={() => boxLit(2)} className={lit === 2 ? "box box-lit" : "box"}><h1>😆</h1></div>
      <div onClick={() => boxLit(3)} className={lit === 3 ? "box box-lit" : "box"}><h1>😙</h1></div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);