// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TopRated from './pages/TopRated/TopRated';
import Upcoming from './pages/Upcoming/Upcoming';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import SearchResults from './pages/SearchResults/SearchResults';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar setSearchQuery={setSearchQuery} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/search" element={<SearchResults searchQuery={searchQuery} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;