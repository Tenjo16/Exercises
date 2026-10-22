function App() {
  return (
      <div className='app-container'>
        <h1>Fruits!</h1>
        <div className='dropbox'></div>
        <div className='fruit-item'>🍎</div>
      </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
