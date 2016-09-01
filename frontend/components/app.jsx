import React from 'react';
import { Link } from 'react-router';
import NavBarContainer from './navbar/navbar_container.jsx';

const App = ({children}) => (
  <div>
  <div className="splash-img-box group" >
    <img className="splash-img" src={window.myBackgroundPath} alt="parley" />
  </div>
    <NavBarContainer />
    {children}
  </div>
);

export default App;
