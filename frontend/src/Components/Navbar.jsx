import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Styling for the navbar

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track logged-in status
  const navigate = useNavigate();

  // Check login status when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update state based on token presence
    console.log(token ? "User is logged in" : "User is not logged in");
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update state to logged out
    navigate("/");
  }

  return (
    <div className="navbar">
      <img className="logo" src="/SkillBazar.png" alt="SkillBazar Logo" />
      {!isLoggedIn ? ( // Show login/signup buttons if NOT logged in
        <div className="buttons">
          <Link className="login" to="/login">
            <button>Login</button>
          </Link>
          <Link className="signup" to="/signup">
            <button>SignUp</button>
          </Link>
        </div>
      ) : (
        <div className="loggedIn">
          <img
            className="userlogo"
            src="https://cdn-icons-png.flaticon.com/128/6997/6997674.png"
            alt="User Icon"
          />
          <button
            onClick={logout}
            style={{
              width: "100px",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
