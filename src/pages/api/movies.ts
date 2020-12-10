import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import movieDb from '../../db/db.json';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

interface MovieDb {
  [year: number]: {
    [month: number]: {
      [day: number]: string;
    };
  };
}

interface MovieData {
  title: string;
  overview?: string;
  imageUrl?: string;
  releaseDate?: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const movies: MovieDb = movieDb;

  const { date } = req.query;
  const parsedDate = (date as string).split('-');

  if (parsedDate.length === 3) {
    const movie = movies[parsedDate[0]][parsedDate[1]][parsedDate[2]] || null;
    res.statusCode = 200;
    if (movie) {
      const movieRes = await tmdbApi.get('/search/movie', {
        params: {
          api_key: process.env.TMDB_API_KEY || '',
          language: 'pt-BR',
          query: movie,
        },
      });
      let movieData: MovieData = {
        title: movie,
      };
      if (movieRes.data.results.length > 0) {
        const {
          poster_path,
          overview,
          release_date,
        } = movieRes.data.results[0];

        movieData = {
          overview,
          title: movie,
          releaseDate: release_date,
          imageUrl: `https://image.tmdb.org/t/p/w500${poster_path}`,
        };
      }

      res.json({ movie: movieData });
    } else {
      res.json({ movie: { title: '', empty: true } });
    }
  } else {
    res.statusCode = 400;
    res.json({ error: true });
  }
};
