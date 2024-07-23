// src/components/UserList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/UserList.css';

const UserList = () => {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-list-container">
      <h1>User Details</h1>
      <ul className="user-list">
        
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Movie Name: {user.moviename}</p>
            <p>Theatre Name: {user.theatrename}</p>
            <p>Contact No: {user.contactno}</p>
            <p>Ticket Count: {user.ticket_count}</p>
          </li>
        
      </ul>
    </div>
  );
};

export default UserList;