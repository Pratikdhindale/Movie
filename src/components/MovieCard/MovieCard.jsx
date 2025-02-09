import { Link } from 'react-router-dom'
import './MovieCard.css'

function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img src={imageUrl} alt={movie.title} className="movie-poster " />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="rating">Rating: {movie.vote_average}</p>
        <p className="release-date">Release: {movie.release_date}</p>
      </div>
    </Link>
  )
}

export default MovieCard;