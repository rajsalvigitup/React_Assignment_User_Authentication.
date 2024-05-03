import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/navbar';
import Home from './Components/Home';
import Authentication from './Components/Authentication';
import ItemList from './Components/ItemList';
import Pagination from './Components/Pagination';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);


  useEffect(() => {
    // Redirect to home page when the website is reloaded
    if (window.location.pathname !== '/home') {
      window.location.href = '/home';
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.org/users');
        setUsers(response.data.map(user => ({ ...user, editMode: false, editData: {} })));

      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdateUser = (userId, updatedData) => {
    axios.put(`https://jsonplaceholder.org/users/${userId}`, updatedData)
      .then(response => {
        const updatedUsers = users.map(user =>
          user.id === userId ? { ...user, ...updatedData, editMode: false, editData: {} } : user
        );
        setUsers(updatedUsers);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`https://jsonplaceholder.org/users/${userId}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAuthenticationSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginSuccess(true); // Show login success message
    setTimeout(() => {
      setShowLoginSuccess(false);
    }, 1500);
  };

  const handleLogOut = () => {

    setIsLoggedIn(false);

  };

  return (
    <Router>
      <div >
        <Navbar isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
        {showLoginSuccess && <div className="alert alert-success text-center" role="alert">Successfully Logged In</div>}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/authentication" element={isLoggedIn ? <Navigate to="/Item_List" /> : <Authentication onAuthenticationSuccess={handleAuthenticationSuccess} />} />
          <Route path="/Item_List" element={
            isLoggedIn ? (
              <div>
                <div className="container">
                  <h1 className="text-center">User List</h1>
                  <ItemList
                    users={users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)}
                    error={error}
                    onUpdateUser={handleUpdateUser}
                    onDeleteUser={handleDeleteUser}
                  />
                  <Pagination
                    usersPerPage={usersPerPage}
                    totalUsers={users.length}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </div>
              </div>
            ) : (
              <div className="container">
                <h1 className="text-center">Please Log In</h1>
                <p className="text-center text-danger">You are not logged in. Please log in to access this page.</p>
              </div>
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;






