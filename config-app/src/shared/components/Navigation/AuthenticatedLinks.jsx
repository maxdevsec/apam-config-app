import React from "react";
import { NavLink } from 'react-router-dom';


const AuthenticatedLinks = () => {
  return (
    <React.Fragment>
      <li>
        <NavLink to="/resources">Resources</NavLink>
      </li>
      <li>
        <NavLink to="/settings">Settings</NavLink>
      </li>
      <li>
        <NavLink to="/secrets">Secrets</NavLink>
      </li>
    </React.Fragment>
  );
};

export default AuthenticatedLinks;
