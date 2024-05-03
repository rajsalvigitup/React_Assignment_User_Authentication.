import React from 'react';

const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate }) => {
  const pageNumbers = [];
  
  // Calculate total number of pages
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // Generate page numbers for pagination
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" tabIndex="-1" onClick={() => paginate(currentPage - 1)}>Previous</a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <a className="page-link" href="#" onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

