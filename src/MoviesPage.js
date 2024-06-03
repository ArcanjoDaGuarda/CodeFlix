import React, { useState, useEffect } from 'react';
import './MoviesPage.css';
import { getPopularMovies } from './services/tmdb';
import logo from './LogoCodeFlix.png';
import imdbLogo from './IMDb.png';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
        setSelectedMovie(data[0]);
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div>
      <div className="movies-container" style={{ backgroundImage: selectedMovie ? `url(https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path})` : 'none' }}>
        <nav className="navbar">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <ul className="navbar-menu">
            <li className="navbar-item">New Movie</li>
            <li className="navbar-item">Genre</li>
            <li className="navbar-item">Country</li>
            <li className="navbar-item">Movie</li>
            <li className="navbar-item">TV Series</li>
            <li className="navbar-item search-container">
              <span className="separator">|</span>
              <button className="search-button"><i className="fas fa-search"></i></button>
            </li>
          </ul>
        </nav>
        {selectedMovie && (
          <div className="movie-details">
            <div>
              <h1 className="movie-title">{selectedMovie.title}</h1>
              <p className="movie-info">
                <img src={imdbLogo} alt="IMDb Logo" className="imdb-logo" />
                {selectedMovie.vote_average} ({selectedMovie.vote_count}) * {selectedMovie.release_year} | {selectedMovie.runtime} | {selectedMovie.genres}
              </p>
            </div>
            <p className="movie-overview">{selectedMovie.overview}</p>
            <div className="movie-buttons">
              <button className="watch-trailer-button">Watch Trailer</button>
              <button className="watch-now-button"><i className="fas fa-play"></i> Watch Now</button>
            </div>
          </div>
        )}
      </div>
      <div className="movies-footer">
        <div className="movie-list-container">
          <div className="movie-list">
            {movies.map((movie) => (
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
                onClick={() => handleMovieClick(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
