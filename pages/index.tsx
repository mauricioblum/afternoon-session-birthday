import React, { FormEvent, useState } from 'react';
import Head from 'next/head';

const Home: React.FC = () => {
  const [date, setDate] = useState('1993-01-01');
  const [movie, setMovie] = useState('');
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('date', date);

    const req = await fetch(`/api/movies?date=${date}`);
    const response = await req.json();
    console.log(response);
    setMovie(response.movie);
  };

  return (
    <div className=" bg-blue-200 min-h-screen flex flex-col justify-center items-center px-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-5 flex flex-1 flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <label htmlFor="birthdate">
            Data de nascimento
            <input
              id="birthdate"
              className="block mt-1 mb-1"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name="birthdate"
            />
          </label>
          <button
            type="submit"
            className="cursor-pointer bg-black text-white text-sm font-bold text-center py-2 px-5"
          >
            Pesquisar
          </button>
        </form>

        {movie === '' && <div className="text-center" />}

        {movie && (
          <div className="text-center">
            <h2>{movie}</h2>
            <h4>
              Foi o filme que passou na sessão da tarde no dia do seu
              aniversário.
            </h4>
          </div>
        )}

        {movie === null && (
          <div className="text-center">
            <h2>Não teve sessão da tarde neste dia!</h2>
            <h4>
              Infelizmente você nasceu em um dia em que a Sessão da Tarde não
              aconteceu.
            </h4>
          </div>
        )}
      </main>

      <footer className="w-full h-24 flex justify-center items-center border-t border-solid border-gray-200">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="ml-1 h-4" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
