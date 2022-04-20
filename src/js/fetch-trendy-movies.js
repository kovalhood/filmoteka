const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '387a2500e741e87c896db50117c25d75';
const categories = {
  trending: '/trending/movie/week',
  querySearch: '/search/movie',
  genre: '/genre/movie/list',
  basic: '&language=en-US&page=1&include_adult=false',
};

//Fetch Trendy Movies
export async function fetchTrendyMovies(page) {
  const response = await fetch(
    `${BASE_URL}${categories.trending}?api_key=${API_KEY}${categories.basic}&page=${page}`,
  );
  const results = await response.json();

  return results;
}

// Fetch Genres
export async function fetchGenres() {
  const response = await fetch(`${BASE_URL}${categories.genre}?api_key=${API_KEY}&language=en-US`);
  const genres = await response.json();
  return genres;
}
