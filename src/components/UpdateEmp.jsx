import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UpdateEmpForm = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const { id } = useParams(); // Get ID from URL parameter
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch existing employee data if ID exists
    if (id) {
      axios
        .get(`https://emp-fhhr.onrender.com/admin/employees/${id}`)
        .then((response) => {
          const { name, designation, location, salary } = response.data;
          setName(name);
          setDesignation(designation);
          setLocation(location);
          setSalary(salary);
        })
        .catch((error) => {
          console.error("Error while fetching employee data:", error);
          // Handle error if needed
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      designation,
      location,
      salary,
    };

    // Update existing employee data
    axios
      .put(`https://emp-fhhr.onrender.com/admin/employees/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        if (response.data ) {
          navigate("/empapp"); // Redirect to admin dashboard upon successful login
        } else {
         console.log("Invalid username or password or No Existing Account");
        }
        // Handle success if needed
      })
      .catch((error) => {
        console.error("Error while updating data:", error);
        // Handle error if needed
      });
  };

  return (
    <div>
      <div className="login-box">
        <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
            <label>Designation</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <label>Location</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
            <label>Salary</label>
          </div>
          <button type="submit" >
            <span />
            <span />
            <span />
            <span />
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmpForm;
