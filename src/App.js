import './App.css';
import Greet from './components/Greet';
import { Home } from './components/Home';
import Welcome from './components/Welcome';
import './components/Welcome.css';
import Hello from './components/Hello';
import A from './components/A/A'
// import Switch from "react-switch";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import FormikContainer from './components/Formik/FormikContainer';
import GuardedRoute from './components/GuardedRoute';
import { useState } from 'react';
import ReduxUI from './components/redux/ReduxUI';
import ReduxContainer from './components/redux/ReduxContainer';

function App() {
  const [isAuth, setIsAuth] = useState(false)
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
                <NavLink exact to="/greet/anand" activeStyle={{
                  color: 'white', padding: '5px', background: 'black',
                  borderRadius: '10%'
                }}>Greet</NavLink>
              </li>
              <li>
                <NavLink exact to={{ pathname: "/welcome", state: { isAdmin: true } }} activeStyle={{ color: 'white', padding: '5px', background: 'black', borderRadius: '10%' }}>Welcome [Auth Guarded Route]</NavLink>
              </li>
              <li>
                <NavLink exact to={{ pathname: "/formik" }} activeStyle={{ color: 'white', padding: '5px', background: 'black', borderRadius: '10%' }}>Formik</NavLink>
              </li>
              <li>
                <NavLink exact to={{ pathname: "/dynamic-formik-controls" }} activeStyle={{ color: 'white', padding: '5px', background: 'black', borderRadius: '10%' }}>Dynamic Formik Controls</NavLink>
              </li>
              <li>
                <NavLink exact to={{ pathname: "/redux" }} activeStyle={{ color: 'white', padding: '5px', background: 'black', borderRadius: '10%' }}>Redux Concept</NavLink>
              </li>
              { isAuth && <Hello onDbChange={onDbChange} />}
                <button className='btn btn-primary ml-3' onClick={() => setIsAuth(!isAuth)}>{isAuth ? 'Logout' : 'Login'}</button>
            </ul>
          </nav>

          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/* <Switch> */}
            <Route path="/greet/:name" render={
              () => {
                return <Greet objName={props.name} bool={true} handle={() => handleToggle()} />
              }
            }>
            </Route>
            {/* <Route path="/greet/:name" render={({ match }) => (
              isAuth ? <Greet objName={props.name} bool={true} handle={() => handleToggle()} /> : Redirect('/')
            )

            }>
            </Route> */}
            <GuardedRoute path="/welcome" component={Welcome} auth={isAuth} dbStatus1={dbStatus} />
            <Route path="/formik">
              <A />
            </Route>
            <Route path="/redux">
              <ReduxContainer />
            </Route>
            <Route path="/dynamic-formik-controls">
              <FormikContainer />
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
