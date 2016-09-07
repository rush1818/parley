import React from 'react';
import { Link } from 'react-router';
import NavBarContainer from './navbar/navbar_container.jsx';

const App = ({children}) => (
  <div className="app splash-img-box group">
    <NavBarContainer />
    {children}
  </div>
);

export default App;
