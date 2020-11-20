import React, { FormEvent, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="birthdate">
            Data de nascimento
            <input
              id="birthdate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name="birthdate"
            />
          </label>
          <button type="submit">Pesquisar</button>
        </form>

        {movie === '' && <div className={styles.result} />}

        {movie && (
          <div className={styles.result}>
            <h2>{movie}</h2>
            <h4>
              Foi o filme que passou na sessão da tarde no dia do seu
              aniversário.
            </h4>
          </div>
        )}

        {movie === null && (
          <div className={styles.result}>
            <h2>Não teve sessão da tarde neste dia!</h2>
            <h4>
              Infelizmente você nasceu em um dia em que a Sessão da Tarde não
              aconteceu.
            </h4>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
