import axios from "axios"
const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";



export const searchMovies = async (query: string) => {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`)

        if(!response.ok) throw new Error(`Failed to fetch movies: ${response.statusText}`)
        const data = await response.json()
        return data.results
    } catch (error) {
        console.error("Could not fetch movies", error)
        return []
    }
}

export const getPopularMovies = async () => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
};


export const getTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      return [];
    }
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };
  
  export const getMovieTrailer = async (id: number): Promise<Trailer> => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}`
      );
      return response.data.results.find((video: { type: string }) => video.type === 'Trailer') || {};
    } catch (error) {
      console.error('Error fetching trailer:', error);
      return { key: "", type: "" };
    }
  };