import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import MoviesPage from './MoviesPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'home' && <HomePage changePage={changePage} />}
      {currentPage === 'movies' && <MoviesPage />}
    </div>
  );
}

export default App;
