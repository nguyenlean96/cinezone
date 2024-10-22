import { useState, useEffect } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
import { MoviesGroupedByGenres } from '@/components/index-page/by-genres';
import { get_genres } from '@/hooks/useFirebase';
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home(props: any) {
  const { width, height }: {
    width: number;
    height: number;
  } = props;
  const [genres, setGenres] = useState<any[]>([]);
  const [searchTermDisp, setSearchTermDisp] = useState<string>('');
  const [userSearchTerm, setUserSearchTerm] = useState<string>('');

  const [isUploadingData, setIsUploadingData] = useState<boolean>(false);

  const applyUserSearchTerm = useDebouncedCallback((term: string) => {
    setUserSearchTerm(term);
  }, 700);

  useEffect(() => {
		(async () => {
			const genres = await get_genres();
			setGenres(Array.from(genres));
		})()
	}, []);

  return (
    <div className='relative w-screen h-screen overflow-hidden pt-[3em] xl:pt-[4em] pb-24 bg-gradient-to-br from-gray-900 via-zinc-900/90 to-slate-900/95'>
      <div
        className='relative flex flex-col justify-start px-2 lg:px-4 lg:pl-16 lg:pr-0.5'
        style={{
          height: height * 0.92,
          width: width,
        }}
      >
        <div className='z-30 flex justify-center items-center sticky top-4 p-4 w-screen lg:-translate-x-16 -translate-x-2'>
          <input className='w-full lg:w-[90%] rounded-full bg-gradient-to-br from-gray-900 via-zinc-800 to-slate-800 text-gray-300 ring-1 ring-gray-100/20 focus:ring-gray-100 focus:text-gray-100 text-xl p-2 px-5'
            type='text' value={searchTermDisp} onChange={(e) => {
              setSearchTermDisp(e.target.value);
              applyUserSearchTerm(e.target.value);
            }}
            placeholder='Search for movies...'
          />
        </div>
        <div className='w-full overflow-y-scroll flex flex-col justify-start gap-x-6 lg:gap-x-10 gap-y-8 overflow-x-hidden'>
          {genres &&
            genres
              .map((genre, i) => (
                <MoviesGroupedByGenres
                  key={i}
                  width={width}
                  height={height}
                  genre={genre}
                  userSearch={userSearchTerm}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
