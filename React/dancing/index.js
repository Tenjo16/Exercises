function Dancing(props) {

    return (
        <img className="images" src={props.isDancing ? props.gifSrc : props.imgSrc} onClick={props.onToggle} />
    );
}

function App() {
    const [isDancing, setIsDancing] = React.useState(null);

    function handleClick(id) {
        return function () {
            /*Cats are initially set to null so unless
            clicked, they won't have a dedicated id*/
            if (isDancing === id) {
                setIsDancing(null);
            } else {
                setIsDancing(id);
            }
        };
    }


    return (
        <div>
            <Dancing imgSrc='images/cat.jpg'
                gifSrc='images/scuba.gif'
                //IsDancing id is given by handleClick()
                isDancing={isDancing == 1}
                onToggle={handleClick(1)} />
            <Dancing imgSrc='images/cat.jpg'
                gifSrc='images/scuba.gif'
                isDancing={isDancing == 2}
                onToggle={handleClick(2)} />
        </div>
    );
}

// 3. Mount to DOM at the bottom
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);