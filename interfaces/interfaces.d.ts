interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview?: string;
};

interface MovieDetails {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: { id: number; name: string }[];
  status: string;
  budget: number;
  credits?: {
    cast: {
      name: string;
      character: string;
    }[];
  };
}

interface Trailer {
  key: string;
  type: string;
}