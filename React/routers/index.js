const { BrowserRouter, Route, Switch, Link } = ReactRouterDOM;

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function App() {
  return (
      <BrowserRouter>
          <div>
              {/* Navigation Links */}
              <nav>
                  <Link to="/">Home</Link> | <Link to="/about">About</Link>
              </nav>

              {/* Route Switcher */}
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
              </Switch>
          </div>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
