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
    <div className="bg-gradient-to-b from-blue-200 to-blue-600 min-h-screen flex flex-col justify-center items-center px-5">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="py-5 flex flex-1 flex-col justify-center items-center">
        <img
          src="https://static.wikia.nocookie.net/logopedia/images/3/3d/Sess%C3%A3o_da_tarde_globo_logo_2005.png"
          alt="sessão da tarde"
          className="mb-10"
          width="400"
        />
        <h1 className="text-center text-white text-4xl font-bold mb-8">
          Qual foi o filme que passou na Sessão da Tarde no dia do seu
          nascimento?
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center text-center"
        >
          <label htmlFor="birthdate" className="text-white text-2xl font-bold">
            Insira a sua data de nascimento
            <input
              id="birthdate"
              className="block mt-1 mb-1 text-center text-lg text-blue-800 mx-auto"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name="birthdate"
            />
          </label>
          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-pink-700 to-purple-800 text-white text-2xl font-bold text-center py-2 px-5 mb-5"
          >
            Pesquisar
          </button>
        </form>

        {movie === '' && <div className="text-center h-32" />}

        {movie && (
          <div className="text-center h-32">
            <h2 className="text-center text-6xl text-pink-200 text-bold">
              {movie}
            </h2>
            <h4 className="text-center text-2xl text-indigo-800">
              Foi o filme que passou na sessão da tarde no dia do seu
              nascimento.
            </h4>
          </div>
        )}

        {movie === null && (
          <div className="text-center h-32">
            <h2 className="text-center text-6xl text-pink-200 text-bold">
              Não teve sessão da tarde neste dia!
            </h2>
            <h4 className="text-center text-2xl text-indigo-800">
              Infelizmente você nasceu em um dia em que a Sessão da Tarde não
              aconteceu.
            </h4>
          </div>
        )}
      </main>

      <footer className="w-full h-24 flex justify-center items-center border-t border-solid border-gray-200">
        <p>
          Desenvolvido por
          <a
            href="https://github.com/mauricioblum"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1"
          >
            @mauricioblum
          </a>
        </p>
        <p />
      </footer>
    </div>
  );
};

export default Home;
