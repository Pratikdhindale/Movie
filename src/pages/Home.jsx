import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard/MovieCard'
import Pagination from '../components/Pagination/Pagination'
import './Home.css'

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743'

function Home() {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
  }, [currentPage])

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
      )
      const data = await response.json()
      setMovies(data.results)
      setTotalPages(data.total_pages)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="home-page">
      <h1>Popular Movies</h1>
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
  )
}

export default Home;