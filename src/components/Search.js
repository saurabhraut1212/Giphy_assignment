import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import "./Search.css";

const Search = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [searchedResult, setSearchedResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const pageSize = 6;

  const fetchGifs = async (query = "trending") => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${query}`
      );
      setSearchedResult(response.data.data);
      setCurrentPage(1);
    } catch (error) {
      setError("Failed to load search results");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  const searchHandler = async () => {
    if (!searchItem.trim()) {
      return;
    }

    fetchGifs(searchItem);
    setSearchItem("");
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const filteredResults = searchedResult.filter((gif) =>
    gif.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  const paginatedResults = paginate(filteredResults, currentPage, pageSize);

  const logoutHandler = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to logout");
    }
  };

  return (
    <div className="search-container">
      <div className="search-container-1">
        {error && <p className="error">{error}</p>}
        <div />
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            searchHandler();
          }}
        >
          <div className="search-icon-btn">
            <input
              className="search-input"
              type="text"
              placeholder="Search"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button className="search-btn" type="submit">
              <i className="search-icon fas fa-search"></i>
            </button>
          </div>
        </form>
        <button className="logout-btn" type="button" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      {loading && <i className="spinner-icon fas fa-spinner fa-spin"></i>}
      {searchedResult.length > 0 ? (
        <>
          {paginatedResults.length > 0 ? (
            <>
              <ul className="gif-list">
                {paginatedResults.map((gif) => (
                  <li className="gif-item" key={gif.id}>
                    <img
                      className="gif-img"
                      src={gif.images.fixed_height.url}
                      alt={gif.title}
                    />
                  </li>
                ))}
              </ul>
              <div className="pagination">
                <button
                  className="prev-btn"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <p className="page-number"> {Math.ceil(currentPage)}</p>
                <button
                  className="next-btn"
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, filteredResults.length / pageSize)
                    )
                  }
                  disabled={currentPage === filteredResults.length / pageSize}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="no-results">No search results found.</p>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Search;
