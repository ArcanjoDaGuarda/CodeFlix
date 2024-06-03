import axios from 'axios';

const API_KEY = '398b9197f7c2d07f361e522eba73a6ca';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
      },
    });

    
    if (response.data && response.data.results) {
      
      const movies = await Promise.all(response.data.results.map(async movie => {
        
        const detailedResponse = await axios.get(`${BASE_URL}/movie/${movie.id}`, {
          params: {
            api_key: API_KEY,
          },
        });
        const detailedMovie = detailedResponse.data;
        
        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          release_year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
          runtime: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A',
          genres: movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'N/A',
          backdrop_path: detailedMovie.backdrop_path, 
        };
      }));

      return movies;
    } else {
      console.error('Erro ao buscar filmes populares: Nenhum resultado encontrado');
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    throw error;
  }
};


export const getRandomBackdrop = async () => {
  try {
    const randomMovie = await getRandomMovie(); 
    return randomMovie.backdrop_path;
  } catch (error) {
    console.error('Erro ao buscar capa aleatória:', error);
    throw error;
  }
};

const getRandomMovie = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: Math.floor(Math.random() * 500) + 1, 
      },
    });
    const movies = response.data.results;
    return movies[Math.floor(Math.random() * movies.length)]; 
  } catch (error) {
    console.error('Erro ao buscar filme aleatório:', error);
    throw error;
  }
};
