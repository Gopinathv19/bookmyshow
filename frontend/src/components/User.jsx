import React, { useState } from 'react';
import axios from 'axios';
import '../style/User.css'
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const initialFormData = {
    userid: '',
    name: '',
    moviename: '',
    theatrename: '',
    contactno: '',
    ticket_count: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      await axios.post('http://localhost:5000/api/users', formData);
      alert('Form submitted successfully');
      setFormData(initialFormData); // Reset the form data
      navigate('/users')
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="number" name="userid" value={formData.userid} onChange={handleChange} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Movie Name:
          <input type="text" name="moviename" value={formData.moviename} onChange={handleChange} />
        </label>
        <br />
        <label>
          Theatre Name:
          <input type="text" name="theatrename" value={formData.theatrename} onChange={handleChange} />
        </label>
        <br />
        <label>
          Contact No:
          <input type="tel" name="contactno" value={formData.contactno} onChange={handleChange} />
        </label>
        <br />
        <label>
          Ticket Count:
          <input type="number" name="ticket_count" value={formData.ticket_count} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default User;