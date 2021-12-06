import './App.css';
import { Greet } from './components/Greet';
import { Home } from './components/Home';
import Welcome from './components/Welcome';
import './components/Welcome.css';
import Hello from './components/Hello';
// import Switch from "react-switch";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";





function App() {
  const handleToggle = () => { }
  const props = { name: "Harish" };
  let dbStatus = true;
  const onDbChange = (e) => {
    console.log(e)
    dbStatus = e;
  }
  return (
    <div className="App">
      {/* <Greet /> */}
      {/* <Welcome/> */}
      <Router>
        <div>
          <nav /*style={{ 'position': 'fixed', 'width': ' 100%', 'zIndex': '1' }}*/ >
            <ul className="ul-align">
              <li>
                <NavLink exact to="/" activeStyle={{ color: 'red', padding: '5px', background: 'black', borderRadius: '10%' }} >Home</NavLink>
              </li>
              <li>
                <NavLink exact to="/greet" activeStyle={{
                  color: 'white', padding: '5px', background: 'black',
                  borderRadius: '10%'
                }}>Greet</NavLink>
              </li>
              <li>
                <NavLink exact to={{ pathname: "/welcome", state: { isAdmin: true } }} activeStyle={{ color: 'white', padding: '5px', background: 'black', borderRadius: '10%' }}>Welcome</NavLink>
              </li>
              <Hello onDbChange={onDbChange}  />
            </ul>
          </nav>

          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/* <Switch> */}
            <Route path="/greet">
              <Greet objName={props.name} bool={true} handle={() => handleToggle()} />
            </Route>
            <Route path="/welcome">
              <Welcome dbStatus1={dbStatus} />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            {/* </Switch> */}
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
