import React, { useEffect, useState } from "react";
import "./Billmange.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BillManage = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [formData, setFormData] = useState({
    days: "",
    leaveDays: "",
    nonVegCharge: "",
    vegCharge: "",
    totalFoodCharge: "",
    noonVegCharge: "",
    roomCharge: "",
    totalAmount: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "https://svhostel.onrender.com/allprofiles",
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      const filteredUsers = data.data.filter(
        (user) => user.usertype === "user"
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedFormData = { ...formData, [name]: value };

    if (name === "nonVegCharge") {
      updatedFormData.noonVegCharge = value * 25;
    } else if (name === "vegCharge") {
      updatedFormData.totalFoodCharge =
        parseInt(updatedFormData.noonVegCharge) + parseInt(value * 60);
    } else if (name === "roomCharge") {
      updatedFormData.totalAmount =
        parseFloat(updatedFormData.totalFoodCharge) + parseFloat(value);
    } else if (name == "leaveDays" && name == "nonVegCharge") {
      updatedFormData.vegCharge =
        parseInt(updatedFormData.leaveDays) -
        parseInt(updatedFormData.nonVegCharge);
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://svhostel.onrender.com/hostelmess/${selectedUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success("Hostel mess details added successfully");
      setFormData({
        days: "",
        leaveDays: "",
        nonVegCharge: "",
        vegCharge: "",
        totalFoodCharge: "",
        noonVegCharge: "",
        roomCharge: "",
        totalAmount: "",
      });
      setSelectedUserId("");
    } catch (error) {
      console.error("Error adding hostel mess details:", error);
      toast.error("Error adding hostel mess details: " + error.message);
    }
  };

  return (
    <div className="bill-manage-container">
      <h2>Add Hostel Mess Details</h2>
      <form className="bill-form" onSubmit={handleSubmit}>
        <div className="form-group1">
          <label htmlFor="user">Select User:</label>
          <select
            id="user"
            name="selectedUserId"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
          </select>
        </div>

        <div className="mess-details">
          <label htmlFor="days">Days:</label>
          <input
            type="number"
            id="days"
            name="days"
            value={formData.days}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="leaveDays">Leave Days:</label>
          <input
            type="number"
            id="leaveDays"
            name="leaveDays"
            value={formData.leaveDays}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="nonVegCharge">Non-Veg plates</label>
          <input
            type="number"
            id="nonVegCharge"
            name="nonVegCharge"
            value={formData.nonVegCharge}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="roomCharge">Room Charge:</label>
          <input
            type="number"
            id="roomCharge"
            name="roomCharge"
            value={formData.roomCharge}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BillManage;
