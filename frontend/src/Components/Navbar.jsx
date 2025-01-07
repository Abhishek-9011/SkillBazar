import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Styling for the navbar

function Navbar() {
  return (
    <div className="navbar">
      <img className="logo" src="/SkillBazar.png" alt="" />
      <div className="buttons">
      <Link className="login" to={"/login"}> <button>Login</button></Link>
      <Link className="Signup" to={"/signup"}> <button>SignUp</button> </Link>
      </div>
    </div>
  );
}

export default Navbar;
