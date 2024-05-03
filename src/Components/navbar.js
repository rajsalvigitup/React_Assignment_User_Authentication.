import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogOut = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmLogOut = () => {
    setShowConfirmation(false);
    window.location.href = '/home';
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Item_List">Database</Link>
              </li>
            </ul>
            <form className="d-flex">
              <Link to="/authentication" className={`btn btn-outline-success mx-1 my-1 ${isLoggedIn ? 'disabled' : ''}`}>Log In</Link>
              <button onClick={handleLogOut} className={`btn btn-outline-success mx-1 my-1 ${!isLoggedIn ? 'disabled' : ''}`} disabled={!isLoggedIn}>Log Out</button>
            </form>
          </div>
        </div>
      </nav>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Log Out</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmation(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to log out?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={confirmLogOut}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;



