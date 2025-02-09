// src/pages/TopRated/TopRated.jsx
import { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import './TopRated.css';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopRatedMovies();
  }, [currentPage]);

  const fetchTopRatedMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`
      );
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="top-rated-page">
      <h1>Top Rated Movies</h1>
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
    </div>
  );
}

export default TopRated;