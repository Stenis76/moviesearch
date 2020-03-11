const baseUrl = "https://api.themoviedb.org/3/";

export const fetchTrendingMovies = async () => {
  const response = await fetch(
    `${baseUrl}trending/movie/day?api_key=${process.env.REACT_APP_API}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchPopularMovies = async () => {
  const response = await fetch(
    `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
  );
  const data = await response.json();
  return data.results;
};

export const fetchNewMovies = async () => {
  const response = await fetch(
    `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=2020-03-08&vote_count.gte=20&vote_average.gte=4&with_runtime.gte=60`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovie = async (query, pageNumber) => {
  const response = await fetch(
    `${baseUrl}search/movie?api_key=${process.env.REACT_APP_API}&query=${query}&page=${pageNumber}`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async movieId => {
  const response = await fetch(
    `${baseUrl}${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`
  );
  const data = response.json();
  const details = {
    ...data,
    year: data.release_date.split("-")[0],
    genres: data.genres.map(genre => genre.name)
  };
  return details;
};

export const getCast = async movieId => {
  const response = await fetch(
    `${baseUrl}${movieId}/credits?api_key=${process.env.REACT_APP_API}`
  );
  const data = response.json();
  const cast = data.map(actor => ({
    name: actor.name,
    character: actor.character,
    profile_path: actor.profile_path
  }));
  return cast;
};
