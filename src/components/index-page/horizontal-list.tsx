import { motion as m } from 'framer-motion';
import NetflixCard from '@/components/movie-card/netflix';

const HorizontalList = ({
	width,
	height,
	children,
	moviesList,
	loadMore,
	hasMore,
	isLoading,
	isValidating,
}: {
	width: number;
	height: number;
	children: any;
	moviesList: any[];
	loadMore: any;
	hasMore: boolean;
	isLoading: boolean;
	isValidating: boolean;
}) => {
	return (
		<div className='relative flex flex-col items-start justify-start w-full'
			style={{ minHeight: width > 1280 ? height / 4 : height / 6 }}
		>
			{children}
			<div className='absolute top-2 left-2 lg:left-0 h-full'>
				<div className='relative'>
					<div
						className='flex items-center justify-start gap-x-2 overflow-x-scroll overflow-y-hidden py-8 lg:px-14 pr-[5em]'
						style={{
							width: width - 16 * (width > 1280 ? 4 : 2),
							scrollbarWidth: 'none',
						}}
					>
						{moviesList &&
							moviesList.length > 0 &&
							moviesList.map((m: any, i: number) => (
								<m.div className='hover:z-10'
									key={i}
									initial={{
										opacity: 0,
										x: 100,
									}}
									whileInView={{
										opacity: 1,
										x: !isLoading ? 0 : 100,
									}}
									transition={{
										delay: .1 + (i * 0.1),
										duration: 0.5,
									}}
								>
									<NetflixCard
										movie={m}
										width={width / 5.4}
										height={width > 1280 ? height / 4 : height / 7}
										isSynced={m?.synced_at ? true : false}
									/>
								</m.div>
							))}
					</div>

					{/* Load more button starts */}
					{hasMore && <div className='absolute top-0 right-0 h-full w-fit z-20 bg-gradient-to-l from-black/40 to-white/0'>
						<div
							className='min-w-16 h-full flex justify-center items-center text-gray-200 cursor-pointer group/loadMoreBtn'
							onClick={() => loadMore()}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='w-14 h-14 group-hover/loadMoreBtn:scale-125 transition-all ease-in-out'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m8.25 4.5 7.5 7.5-7.5 7.5'
								/>
							</svg>
						</div>
					</div>}
					{/* Load more button ends */}
				</div>
			</div>
		</div>
	);
};

export {
	HorizontalList,
};
