import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const MovieCard = (props: any) => {
	const router = useRouter();
	const [showJson, setShowJson] = useState(false);

	return (
		<div
			className='flex flex-col justify-between items-center'
			style={{
				width: props.width,
			}}
		>
			<div
				className='w-full cursor-pointer relative mb-2'
				onClick={() => router.push(`/projects/cinezone/${props.movie.id}`)}
			>
				<div className='relative border border-gray-200 rounded-lg p-0 flex justify-between items-center mb-2'>
					<div className='absolute top-3 left-0 bg-green-600 rounded-r-md px-2 text-white text-[0.9em]'>
						{props.movie?.year}
					</div>
					<img
						className='rounded-lg w-screen h-52'
						src={props.movie?.medium_cover_image}
						alt={props.movie?.title}
					/>
				</div>
				<div className='flex flex-row items-center flex-wrap justify-center'>
					{props.isSynced && (
						<div className='text-[#219903] me-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='18'
								height='18'
								fill='currentColor'
								className='bi bi-check-circle-fill'
								viewBox='0 0 16 16'
							>
								<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
							</svg>
						</div>
					)}
					<div className='rounded border-2 border-green-700 bg-green-500/30 text-white text-sm px-1 me-2'>
						{String(props.movie?.language).toUpperCase()}
					</div>
					{String(props.movie?.title)
						.split(' ')
						.map((t: string, i: number) => (
							<div
								className='text-center text-[.9em] font-semibold text-white me-1'
								key={i}
							>
								{t}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
