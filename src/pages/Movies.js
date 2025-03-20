import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Movies() {
  const [movies, setMovies] = useState([]); // Holds the list of movies
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch movies based on search query or default popular movies
  const fetchMovies = (query) => {
    setLoading(true);
    setError(null);

    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies.");
        setLoading(false);
      });
  };

  // Fetch popular movies when the page loads
  useEffect(() => {
    fetchMovies("");
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchMovies(searchQuery);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <p>{movie.overview}</p>
            </li>
          ))
        ) : (
          !loading && <p>No movies found.</p>
        )}
      </ul>
    </div>
  );
}

export default Movies;
