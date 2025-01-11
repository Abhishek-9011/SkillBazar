import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Styling for the navbar
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track logged-in status
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Invalid token format:", error);
      }
    }
  }, []);
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
  function dropdown() {
    setProfile((profile) => !profile);
  }
  return (
    <div className="navbar">
      <img className="logo" src="/SkillBazar.png" alt="SkillBazar Logo" />
      {isLoggedIn?  <div  >
        <Link
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "20",
          }}
          to={isAdmin ? "/admin-dashboard" : "/user-dashboard"}
        >
          <p>Content page</p>
        </Link>
      </div> : <></>}
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
            onClick={dropdown}
            className="userlogo"
            src="https://cdn-icons-png.flaticon.com/128/6997/6997674.png"
            alt="User Icon"
          />
          {profile ? (
            <button className="logout" onClick={logout}>
              Logout
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
