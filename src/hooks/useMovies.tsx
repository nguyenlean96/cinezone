import useSWRInfinite from 'swr/infinite';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';
import { backup_movie_list } from '@/hooks/useFirebase';
import { fetcher } from '@/utils';

const PAGE_SIZE = 5;

const parameters ={
	limit: {
		required: false,
		type: 'number',
		default: 20,
		description: "The limit of results per page that has been set."
	},
	page: {
		required: false,
		type: 'number',
		default: 1,
		description: "Used to see the next page of movies, e.g. limit=15 and page=2 will show you movies 15-30."
	},
	quality: {
		required: false,
		type: 'string',
		default: 'All',
		description: "Used to filter by a given quality."
	},
	minimum_rating: {
		required: false,
		type: 'number',
		default: 0,
		description: "Used to filter movie by a given minimum IMDb rating."
	},
	query_term: {
		required: false,
		type: 'string',
		default: null,
		description: "Used for movie search, matching on: Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code."
	},
	genre: {
		required: false,
		type: 'string',
		default: 'All',
		description: "Used to filter by a given genre (See http://www.imdb.com/genre/ for full list)."
	},
	sort_by: {
		required: false,
		type: 'string',
		default: 'date_added',
		description: "Sorts the results by choosen value."
	},
	order_by: {
		required: false,
		type: 'string',
		default: 'desc',
		description: "Orders the results by either Ascending or Descending order."
	},
	with_rt_ratings: {
		required: false,
		type: 'boolean',
		default: false,
		description: "When set the data returned will include the Rotten Tomato rating."
	},
}

export default function useMovies({ genre }: { genre: string }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [pageIndex, setPageIndex] = useState(1);
	const [firstItemId, setFirstItemId] = useState<string | null>(null);
	const [moviesData, setMoviesData] = useState<any[]>([]);


	const { data, mutate, isValidating, isLoading } = useSWRInfinite(
		(index, previousPageData) => {
			if (index && !previousPageData.length) return null;
			return `${process.env.NEXT_PUBLIC_LIST_MOVIES}?genre=${encodeURIComponent(
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

	const backupData = async () => {
		if (movies && movies.length > 0) {
			for (let i = 0; i < movies.length; i++) {
				await backup_movie_list(movies[i]);
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
