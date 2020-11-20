import { NextApiRequest, NextApiResponse } from 'next';
import movieDb from '../../db.json';

interface MovieDb {
  [year: number]: {
    [month: number]: {
      [day: number]: string;
    };
  };
}

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const movies: MovieDb = movieDb;

  const { date } = req.query;
  const parsedDate = (date as string).split('-');

  if (parsedDate.length === 3) {
    const movie = movies[parsedDate[0]][parsedDate[1]][parsedDate[2]] || null;
    res.statusCode = 200;
    res.json({ movie });
  } else {
    res.statusCode = 400;
    res.json({ error: true });
  }
};
