
import { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import './SearchResults.css';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

function SearchResults({ searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
      fetchSearchResults();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [currentPage]);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${currentPage}`
      );
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="search-results-page">
      <h1>Search Results for "{searchQuery}"</h1>
      {movies.length > 0 ? (
        <>
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="no-results">No movies found for "{searchQuery}"</p>
      )}
    </div>
  );
}

export default SearchResults;