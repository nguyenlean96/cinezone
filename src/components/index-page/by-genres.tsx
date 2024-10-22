import { useEffect } from 'react';
import useMovies from '@/hooks/useMovies';
import { HorizontalList } from './horizontal-list';

const MoviesGroupedByGenres = (props: any) => {
	const { width, height, genre, userSearch } = props;
	const {
		moviesList,
		pageSize,
		firstItemId,
		applySearch,
		clearSearch,
		hasMore,
		loadMore,
		isLoading,
		isValidating,
	} = useMovies({ genre });

	useEffect(() => {
		if (userSearch && userSearch.length > 0) {
			applySearch(userSearch);
		} else {
			clearSearch();
		}
	}, [userSearch]);

	useEffect(() => {
		// Track the moviesList, auto choose the
		// if the movieslist is not empty and longer than pageSize
		// scroll the movie that has the firstItemId to the furthest left
		if (moviesList.length > pageSize) {
			const el = document.getElementById(`ns-${firstItemId}`);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
			}
		}
	}, [moviesList]);

	return (
		<div className='relative pt-10'>
			{(props?.hoverDisabled ?? false) && (
				<div className='absolute top-0 left-0 w-full h-full z-40'></div>
			)}
			{moviesList && moviesList.length > 0 && (
				<HorizontalList
					width={width}
					height={height}
					moviesList={moviesList}
					loadMore={loadMore}
					hasMore={hasMore}
					isLoading={isLoading}
					isValidating={isValidating}
				>
					<div className='flex items-center translate-y-1'>
						<div className='text-white text-2xl font-bold leading-none'>
							{genre
								.split('_')
								.map((word: string) => word[0].toUpperCase() + word.slice(1))
								.join(' ')}
						</div>
					</div>
				</HorizontalList>
			)}
			{isLoading && (!moviesList || moviesList.length === 0) && (
				<div className='fixed top-0 left-0 w-screen h-screen z-40'></div>
			)}
		</div>
	);
};

export {
  MoviesGroupedByGenres,
};