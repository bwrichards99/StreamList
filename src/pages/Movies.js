import React, { useState, useEffect, useCallback } from "react";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState(""); // For search input
    const [page, setPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1); // Track total pages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    const fetchMovies = useCallback(async (searchQuery, pageNumber) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNumber}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.results) {
                setMovies(data.results);
                setTotalPages(data.total_pages); // Update total pages
            } else {
                setMovies([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError(`Failed to load movies: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [API_KEY]);

    // Fetch initial data (popular movies) on component mount
    useEffect(() => {
        fetchMovies("", 1);
    }, [fetchMovies]);

    // Debounce search query
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim()) {
                fetchMovies(query, 1); // Reset to page 1 for new search
                setPage(1);
            } else {
                fetchMovies("", 1); // Fetch popular movies
                setPage(1);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query, fetchMovies]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>Search Movies</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading movies...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {movies.length === 0 ? (
                <p>No movies found.</p>
            ) : (
                <div>
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.id}>
                                <h3>{movie.title}</h3>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    onError={(e) => {
                                        e.target.onerror = null; // Prevents infinite loop
                                        e.target.src = "url_to_placeholder_image"; // Placeholder image
                                    }}
                                />
                            </li>
                        ))}
                    </ul>

                    {/* Pagination Controls */}
                    <div>
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span> Page {page} of {totalPages} </span>
                        <button
                            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                            disabled={page >= totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movies;
