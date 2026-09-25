// 1. Define Scoreboard component accepting props
function Scoreboard(props) {
    return (
        <div className="scoreboard" style={{ border: '2px solid #007acc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h2>📊 Game Status</h2>
            <p><strong>Total Score:</strong> {props.totalScore}</p>
            <p><strong>Active Balloons:</strong> {props.activeBalloons}</p>
        </div>
    );
}

// Function component for an individual balloon station
function BalloonStation({ onPump }) {
    // Call useState from the React script link to store pump count (starts at 0)
    const [pumpCount, setPumpCount] = React.useState(0);

    const isPopped = pumpCount > 5;

    // 1. Event handler function
    function handlePump() {
        if (!isPopped) {
            setPumpCount(pumpCount + 1); // Updates state & triggers automatic re-render
            onPump();
        }
    }

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <p>{isPopped ? "💥 POPPED!" : `Pumps: ${pumpCount}`}</p>
            {/* 2. Attach click listener using onClick */}
            <button onClick={handlePump} disabled={isPopped}>Pump Balloon 🎈</button>
        </div>
    );
}

// 2. Pass props into Scoreboard inside App
function App() {
    /*"Declare state totalScore initialized to 0 with
    setter function setTotalScore using React.useState(0)."*/
    /* 1. Declare totalScore state starting at 0. This is basically the same as creating an
    initial 0 valued variable but with React */
    const [totalScore, setTotalScore] = React.useState(0);
    const [balloons, setBalloons] = React.useState([0, 0, 0]);
    const activeCount = balloons.filter(pumpCount => pumpCount <= 5).length;

    // 2. Helper function to add 10 points
    function handleEarnPoints() {
        setTotalScore(totalScore + 10);
    }
    return (
        <div>
            <h1>🎈 Balloon Inflation Roulette 🎈</h1>
            <Scoreboard totalScore={totalScore} activeBalloons={activeCount} />
            {/* <BalloonStation onPump={handleEarnPoints} />
            <BalloonStation onPump={handleEarnPoints} />
            <BalloonStation onPump={handleEarnPoints} /> */}
            {balloons.map(function (pumps, index) {
                return (
                    <BalloonStation
                        key={index}
                        pumps={pumps}
                        onPump={function () { handlePumpBalloon(index); }}
                    />
                );
            })}
        </div>
    );

    function handlePumpBalloon(index) {
        // +10 Points
        handleEarnPoints();
        /*Truth check all created Balloons to make sure the dedicated button is pressed for the
        correct Balloon*/
        const updateBalloons = balloons.map(function (pumps, i) {
            return i == index ? pumps + 1 : pumps;
        });
        setBalloons(updateBalloons);
    }
}

// 3. Mount to DOM at the bottom
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);