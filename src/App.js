import './App.css';
import { Greet } from './components/Greet';
import Welcome from './components/Welcome';
import './components/Welcome.css';
import Hello from './components/Hello';
import Switch from "react-switch";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
 




function App() {
  const onChange = (e) => {
    console.log(e.target.value);
    }
  const handleToggle = () => { }
  const props = { name: "Harish" };
  return (
    <div className="App">
      {/* <Greet /> */}
      {/* <Welcome/> */}
      <Router>
        <div>
          <nav>
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
            {/* <Hello />    */}
            </ul>
          </nav>
          

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          {/* <Switch> */}
            <Route path="/greet">
              <Greet objName={props.name} bool={true} handle={() => handleToggle()} />
            </Route>
            <Route path="/welcome">
              <Welcome />
            </Route>
            {/* <Route path="/">
            <Home />
          </Route> */}
          {/* </Switch> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
