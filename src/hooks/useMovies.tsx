import useSWRInfinite from 'swr/infinite';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
import crypto from 'crypto';
import {
	collection,
	query,
	getDocs,
	addDoc,
	where,
} from 'firebase/firestore';
import { db } from '@/context/firebase';

const fetcher = async (url: string) => await fetch(url).then((res) => res.json());
const PAGE_SIZE = 5;

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
	return data;
};

const stringHashing = (str: string) => {
	return crypto.createHash('base64').update(str).digest('hex');
};

export default function useMovies({ genre }: { genre: string }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [pageIndex, setPageIndex] = useState(1);
	const [firstItemId, setFirstItemId] = useState<string | null>(null);
	const [moviesData, setMoviesData] = useState<any[]>([]);
	const { data, mutate, isValidating, isLoading } = useSWRInfinite(
		(index, previousPageData) => {
			if (index && !previousPageData.length) return null;
			return `https://yts.mx/api/v2/list_movies.json?genre=${encodeURIComponent(
				genre
			)}&limit=${PAGE_SIZE}&page=${pageIndex}${searchTerm && searchTerm.length > 0 ? '&query_term=' + searchTerm : ''
				}`;
		},
		fetcher
	);

	const movies = data?.[0].data?.movies || [];
	const movie_count = data?.[0].data?.movie_count || 0;
	const total_pages = Math.ceil(movie_count / PAGE_SIZE);
	const hasMore = pageIndex < total_pages;

	const loadMore = () => setPageIndex((prev) => prev + 1);

	const createGenre = async (genre: string) => {
		const q = query(collection(db, 'movie-genres'), where('name', '==', genre));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			await addDoc(collection(db, 'movie-genres'), {
				name: genre,
				created_at: new Date(),
			});
		}
	};

	const backupData = async () => {
		if (movies && movies.length > 0) {
			for (let i = 0; i < movies.length; i++) {
				await uploadData(movies[i]);
			}
		} else console.log('No data to upload');
	};

	const applySearch = useDebouncedCallback((searchTerm: string) => {
		setSearchTerm(prev => searchTerm);
	}, 1000);

	const clearSearch = () => {
		setSearchTerm(prev => '');
	}

	useEffect(() => {
		// setMoviesList(moviesList.concat(movies));
		// Loop through the movies and check for the movie?.id, if it doesn't exist, add it to the list
		setFirstItemId(null);
		movies.forEach((movie: any) => {
			if (!moviesData.find((m) => m?.id === movie?.id)) {
				if (!firstItemId) setFirstItemId(movie?.id);
				setMoviesData((prev) => [...prev, movie]);
			}
		});
	}, [movies]);

	useEffect(() => {
		if (movies && movies.length > 0) {
			backupData();
		}
	}, [data]);

	useEffect(() => {
		if (searchTerm && searchTerm.length > 0) {
			setMoviesData([]);
			setPageIndex(1);
		}
	}, [searchTerm]);

	// Cleanup the movies list when the genre changes
	useEffect(() => {
		setMoviesData([]);
		setPageIndex(1);
		setFirstItemId(null);
	}, []);

	return {
		createGenre,
		moviesList: moviesData,
		firstItemId,
		pageSize: PAGE_SIZE,
		hasMore,
		loadMore,
		isLoading,
		applySearch,
		clearSearch,
		isValidating,
	};
}
