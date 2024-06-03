import React from 'react';

const MovieItem = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <div className="movie-item">
      <img src={imageUrl} alt={movie.title} />
    </div>
  );
};

export default MovieItem;
