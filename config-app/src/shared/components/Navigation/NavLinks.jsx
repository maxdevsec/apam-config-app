import React, { useContext } from "react";

import "./NavLinks.css";
import { SignInButton } from "../auth/SignInButton";
import { SignOutButton } from "../auth/SignOutButton";
import AuthenticatedLinks from "./AuthenticatedLinks";
import AuthContext from "../../../store/AuthContext";

const NavLinks = () => {
  const ctx = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {ctx.isAuthenticated && <AuthenticatedLinks />}
      <li>{ctx.isAuthenticated ? <SignOutButton /> : <SignInButton />}</li>
    </ul>
  );
};

export default NavLinks;
