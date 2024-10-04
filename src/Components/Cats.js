import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cats.css';

const Cats = () => {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]); // State for filtered results
  const [page, setPage] = useState(1); // State to manage the current page
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const totalPages = 10; // Assume 10 pages of data

  const fetchCats = (pageNum) => {
    axios
      .get(
        `https://api.thecatapi.com/v1/images/search?order=ASC&has_breeds=1&limit=12&page=${pageNum}`,
        {
          headers: {
            'x-api-key':
              'live_SYBLZU6Su76X4FW9YhcOn1frJ3XqPiBIvdwSrr1iyceT7vvq3VHdBVS9UkcrAOsJ',
          },
        }
      )
      .then((response) => {
        setCats([...response.data]); // Set the fetched data in state
        setFilteredCats([...response.data]); // Set filtered data initially to be the same
      })
      .catch((error) => {
        console.error('Error fetching cat data:', error);
      });
  };

  useEffect(() => {
    fetchCats(page); // Fetch cats based on the current page
  }, [page]);

  // Handle search
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter cats based on breed name
    const filtered = cats.filter((cat) =>
      cat.breeds[0].name.toLowerCase().includes(searchValue)
    );
    setFilteredCats(filtered);
  };

  // Pagination component
  const Pagination = ({ currentPage, onPageChange, totalPages }) => {
    const pageNumbers = [];

    // Helper to show range of pages with ellipsis
    const renderPageNumbers = () => {
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pageNumbers.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
      }

      return pageNumbers;
    };

    return (
      <div className="pagination">
        <button
          className="page-arrow"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {renderPageNumbers().map((number, index) =>
          number === '...' ? (
            <span key={index} className="ellipsis">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`page-number ${currentPage === number ? 'active' : ''}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          )
        )}

        <button
          className="page-arrow"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="cats-container">
      <h1>List of Cat Breeds</h1>
      
      {/* Search Component */}
      <input
        type="text"
        className="search-input"
        placeholder="Search for a breed..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul className="cats-list">
        {filteredCats.map((cat, index) => (
          <li key={index} className="cat-item">
            <div>
              <img src={cat.url} alt="" />
            </div>
            <div>
              <h1>{cat.breeds[0].name}</h1>
            </div>
            <div>{cat.breeds[0].description}</div>
          </li>
        ))}
      </ul>

      <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Cats;
