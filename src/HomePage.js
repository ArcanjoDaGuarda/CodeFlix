import React, { useState, useEffect } from 'react';
import './HomePage.css';
import logo from './LogoCodeFlix.png';
import { getRandomBackdrop } from './services/tmdb';

const HomePage = ({ changePage }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchRandomBackdrop = async () => {
      try {
        const backdropPath = await getRandomBackdrop();
        setBackgroundImage(`url(https://image.tmdb.org/t/p/original/${backdropPath})`);
      } catch (error) {
        console.error('Erro ao buscar capa aleatória:', error);
      }
    };
    fetchRandomBackdrop();
  }, []);

  const handleGetStarted = () => {
    changePage('movies');
  };

  return (
    <div className="home-container" style={{ backgroundImage: backgroundImage }}>
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
      <header className="home-header">
        <h1 className="home-title">Filmes, séries e muito mais, sem limites</h1>
        <h2 className="home-subtitle">Assista onde quiser.</h2>
        <button className="home-button" onClick={handleGetStarted}>GET STARTED</button>
      </header>
    </div>
  );
}

export default HomePage;
