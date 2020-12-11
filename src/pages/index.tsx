import React, { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share';

interface MovieData {
  title: string;
  overview?: string;
  imageUrl?: string;
  releaseDate?: string;
  empty?: boolean;
}

const Home: React.FC = () => {
  const [date, setDate] = useState('1993-01-01');
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<MovieData | undefined>();
  const handleSubmit = async (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    try {
      const req = await fetch(`/api/movies?date=${date}`);
      const response = await req.json();
      setMovie(response.movie);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-600 min-h-screen min-w-screen flex flex-col justify-center items-center px-5">
      <Head>
        <title>
          Qual foi o filme que passou na Sessão da Tarde no dia do seu
          nascimento?
        </title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="py-5 flex flex-1 flex-col justify-center items-center">
        <AnimatePresence>
          {!movie && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -900 }}
              transition={{ ease: 'easeIn', duration: 0.7 }}
            >
              <Image
                src="/assets/images/logo-sessao-tarde.png"
                alt="sessão da tarde"
                className="mb-10"
                width={400}
                height={226}
              />
              <h1 className="text-center text-white text-4xl font-bold mb-8">
                Qual foi o filme que passou na Sessão da Tarde no dia do seu
                nascimento?
              </h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center text-center"
              >
                <label
                  htmlFor="birthdate"
                  className="text-white text-2xl font-bold"
                >
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
                {!loading ? (
                  <button
                    type="submit"
                    className="mt-2 cursor-pointer bg-gradient-to-r from-pink-700 to-purple-800 text-white text-2xl font-bold text-center py-2 px-5 mb-5"
                  >
                    Veja qual foi
                  </button>
                ) : (
                  <img
                    src="/assets/images/logo-sessao-tarde.png"
                    width={150}
                    height={84}
                    alt="loading"
                    className="animate-spin py-2 px-5 mb-5 mt-5"
                  />
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && movie && !movie.empty && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: 900 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: 'easeIn', duration: 0.7, delay: 0.7 }}
          >
            <div className="flex items-center flex-col lg:flex-row">
              <div className="flex">
                {movie.imageUrl && (
                  <img
                    src={movie.imageUrl}
                    width={300}
                    height={450}
                    alt="movie poster"
                    className="w-9/12 text-center mx-auto"
                  />
                )}
              </div>
              <div className="flex flex-col ml-5">
                <h2 className="text-center text-6xl text-purple-800 text-bold mt-1 lg:mt-5">
                  {movie.title}
                </h2>
                <h4 className="text-center text-2xl text-indigo-800">
                  Foi o filme que passou na sessão da tarde no dia do seu
                  nascimento.
                </h4>
                {movie.releaseDate && (
                  <>
                    <h5 className="text-center text-2xl text-purple-800">
                      Ano de lançamento:{' '}
                      <span className="text-white text-bold">
                        {movie.releaseDate.slice(0, 4)}
                      </span>
                    </h5>
                  </>
                )}
                {movie.overview && (
                  <>
                    <h5 className="text-center text-2xl text-purple-800">
                      Sinopse:
                    </h5>
                    <p className="text-center text-white text-2xl mx-auto max-w-2xl">
                      {movie.overview}
                    </p>
                  </>
                )}
              </div>
            </div>
            <p className="my-3 text-2xl">Compartilhe!</p>
            <div className="flex items-center justify-center">
              <TwitterShareButton
                url="https://meufilmedasessaodatarde.net"
                hashtags={['sessaodatarde', 'redeglobo']}
                related={['maublum']}
                className="mr-2"
                title={`${movie.title} foi o filme que passou na Sessão da Tarde no dia em que eu nasci! Descubra também qual foi o seu!`}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <FacebookShareButton
                url="https://meufilmedasessaodatarde.net"
                className="mr-2"
                quote={`${movie.title} foi o filme que passou na Sessão da Tarde no dia em que eu nasci! Descubra também qual foi o seu!`}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton
                windowWidth={800}
                windowHeight={600}
                url="https://meufilmedasessaodatarde.net"
                title={`${movie.title} foi o filme que passou na Sessão da Tarde no dia em que eu nasci! Descubra também qual foi o seu!`}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <button
              onClick={() => setMovie(undefined)}
              type="button"
              className="block mx-auto mt-5 cursor-pointer bg-gradient-to-r from-pink-700 to-purple-800 text-white text-2xl font-bold text-center py-2 px-5 mb-5"
            >
              Pesquisar novamente
            </button>
          </motion.div>
        )}

        {!loading && movie?.empty && (
          <div className="text-center">
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

      <footer className="w-full h-24 flex flex-col justify-center items-center border-t border-solid border-gray-200">
        <p className="text-center">
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
        <p className="text-center">
          Banco de dados de filmes retirados do artigo encontrado no website
          <a
            className="ml-1 text-purple-800 text-black no-underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://redeglobo.fandom.com/pt-br/wiki/Lista_de_filmes_exibidos_na_Sess%C3%A3o_da_Tarde"
          >
            Rede Globo Fandom
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
