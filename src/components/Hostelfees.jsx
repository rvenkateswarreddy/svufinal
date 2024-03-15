import React, { useState, useEffect } from "react";
import "./hostelMess.css"; // Import the CSS file

const Hostelfees = ({ data }) => {
  const {
    mobile,
    fullname,

    hostelMess,
  } = data;
  console.log(hostelMess);

  if (!hostelMess) {
    return <div>Loading...</div>;
  }

  const totalAmountPaids = hostelMess.reduce(
    (acc, fee) => acc + fee.totalAmount,
    0
  );

  return (
    <div className="user-attendance-container">
      <h2>MY HOSTEL MESS FEE DETAILS</h2>
      <table style={{ marginTop: 30 }} className="user-attendance-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Mobile</th>
            <th>Days</th>
            <th>Leave Days</th>
            <th>Non-Veg plates</th>
            <th>Veg plates</th>
            <th>Total Food Charge</th>
            <th>Non Veg Charge</th>
            <th>Room Charge</th>
            <th>Total Amount</th>
            <th>Mess id</th>
          </tr>
        </thead>
        <tbody>
          {hostelMess.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ color: "red" }}>
                Your mess details are not entered
              </td>
            </tr>
          ) : (
            hostelMess.map((record, index) => (
              <tr key={index}>
                <td>{fullname}</td>
                <td>{mobile}</td>
                <td>{record.days}</td>
                <td>{record.leaveDays}</td>
                <td>{record.nonVegCharge}</td>
                <td>{record.vegCharge}</td>
                <td>{record.totalFoodCharge}</td>
                <td>{record.noonVegCharge}</td>
                <td>{record.roomCharge}</td>
                <td>{record.totalAmount}</td>
                <td>{record._id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <h4 style={{ marginTop: 30 }}>
        <span style={{ color: "blue" }}>TOTAL AMOUNT PAID : </span>
        {totalAmountPaids}Rs
      </h4>
    </div>
  );
};

export default Hostelfees;
