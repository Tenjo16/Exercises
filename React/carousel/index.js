function Carousel() {
  const slides = [
    { url: "images/catthumb.png", alt: "Cat Thumbs Up" },
    { url: "images/ha.png", alt: "Ha Face" },
    { url: "images/hampster.jpg", alt: "Hampster" }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Function to handle the "Next" button click with circular modulo wrapping
  function handleNext() {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
  }

  // Function to handle the "Previous" button click safely wrapping backwards
  function handlePrev() {
    setCurrentIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
  }

  return (
    <div className="carousel">
      <img className="carousel-image"
        src={slides[currentIndex].url}
        alt={slides[currentIndex].alt}
      />
      <div style={{ marginTop: "20px" }}>
        {/* Previous button */}
        <button onClick={handlePrev}>Previous</button>

        {/* Next button */}
        <button onClick={handleNext} style={{ marginLeft: "10px" }}>Next</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Carousel />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
