
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCast();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchMovieCast = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      setCast(data.cast.slice(0, 10)); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie cast:', error);
      setLoading(false);
    }
  };

  if (loading || !movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-detail">
      <div className="backdrop" style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}>
        <div className="backdrop-overlay">
          <div className="movie-info">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="movie-poster movie-poster-2"
            />
            <div className="movie-text">
              <h1>{movie.title}</h1>
              <p className="tagline">{movie.tagline}</p>
              <div className="movie-meta">
                <span>Release Date: {movie.release_date}</span>
                <span>Rating: {movie.vote_average}/10</span>
                <span>Runtime: {movie.runtime} mins</span>
              </div>
              <p className="overview">{movie.overview}</p>
              <div className="genres">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map(person => (
            <div key={person.id} className="cast-card">
              <img 
                src={person.profile_path 
                  ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                  : '/placeholder-avatar.png'
                } 
                alt={person.name} 
              />
              <h3>{person.name}</h3>
              <p>{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;