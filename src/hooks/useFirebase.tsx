import {
  collection,
  query,
  getDocs,
  addDoc,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '@/context/firebase';

const get_movies = async ({
  order_by,
  limitPerPage,
}: {
  order_by: {
    featured: string;
    order: 'asc' | 'desc';
  };
  limitPerPage: number;
}) => {
  const q = query(
    collection(db, 'movies-list'),
    orderBy(order_by.featured, order_by?.order),
    limit(limitPerPage)
  );
  const querySnapshot = await getDocs(q);

  let temp: any[] = [];
  querySnapshot.forEach((doc) => {
    temp.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return temp;
};

const create_genre = async (genre: string) => {
  const q = query(collection(db, 'movie-genres'), where('name', '==', genre));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    await addDoc(collection(db, 'movie-genres'), {
      name: genre,
      created_at: new Date(),
    });
  }
};

const get_genres = async () => {
  let genres_list: Set<string> = new Set<string>();

  const genresQuery = query(collection(db, 'movie-genres'));
  const genresSnapshot = await getDocs(genresQuery);
  genresSnapshot.forEach((doc) => {
    const { name, ...rest } = doc.data();
    genres_list.add(name);
  });

  return genres_list;
};

const uploadData = async (data: any) => {
  console.log('Uploading data', data?.title);
  const q = query(collection(db, 'movies-list'), where('id', '==', data?.id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    await addDoc(collection(db, 'movies-list'), {
      ...data,
      created_at: new Date(),
    });
    console.log('Data added', data?.title);
  } else {
    console.log('Data already exists', data?.title, 'Synced on', data?.created_at);
  }
};

const backup_movie_list = async (data: any) => {
  console.log('Uploading data', data?.title);
  const q = query(collection(db, 'movies-list'), where('id', '==', data?.id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    await addDoc(collection(db, 'movies-list'), {
      ...data,
      created_at: new Date(),
    });
    console.log('Data added', data?.title);
  } else {
    console.log('Data already exists', data?.title, 'Synced on', data?.created_at);
  }
  return data;
};

const get_remote_data = async (movie: any) => {
  const q = query(collection(db, 'movie-details'), where('id', '==', movie?.id));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  }

  return null;
};

const upload_movie_details = async ({ setIsLoading, movie }: {
  setIsLoading: (value: boolean) => void;
  movie: any;
}) => {
  setIsLoading(true);
  const q = query(collection(db, 'movie-details'), where('id', '==', movie?.id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    await addDoc(collection(db, 'movie-details'), {
      ...movie,
    });
  }

  return get_remote_data(movie);

  // const setActionComplete = setInterval(() => {
  //   setIsLoading(false);
  //   clearInterval(setActionComplete);
  // }, 2000);
};


export {
  backup_movie_list,
  create_genre,
  get_remote_data,
  get_genres,
  get_movies,
  upload_movie_details,
}