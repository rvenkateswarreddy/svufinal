import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "./Home.css";

const Home = () => {
  const notify = () => {
    alert("Please login to access.");
    toast.success("Stay booked successfully!");
  };

  return (
    <>
      <ToastContainer />
      <div className="hero-section">
        <h1>
          <span>Sri</span> <span>Venkateswara</span> <span>University</span>{" "}
          <span>Hostel</span>
        </h1>
        <p className="homingwelcome">
          Welcome to SVU Hostel, your home away from home.
        </p>
        <Link to="/login">
          <button className="book-button" onClick={notify}>
            STAY HERE
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
