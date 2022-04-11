const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '387a2500e741e87c896db50117c25d75';
const categories = {
  trending: '/trending/movie/week',
  querySearch: '/search/movie',
  genre: '',
};
//Fetch Trendy Movies
export async function fetchTrendyMovies() {
  const response = await fetch(`${BASE_URL}${categories.trending}?api_key=${API_KEY}`);
  const { results } = await response.json();
  console.log(results);
  return results;
}
