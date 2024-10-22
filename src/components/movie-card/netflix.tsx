import { useRouter } from 'next/navigation';

export default function NetflixCard({
  height,
  width,
  movie,
  ...props
}: {
  height: number;
  width: number;
  movie: any;
  isSynced: boolean;
}) {
  const router = useRouter();

  const dynamicSizing = (width: number, height: number): { width: number; height: number } => {
    let calcWidth: number = width, calcHeight: number = height;
    if (width > height) {
      calcHeight = calcWidth * 9 / 16;
    } else {
      calcWidth = calcHeight * 16 / 9;
    }

    return {
      width: calcWidth,
      height: calcHeight,
    };
  }

  const { width: w, height: h } = dynamicSizing(width, height);
  return (
    <div className='relative group/tile'
      id={`ns-${movie?.id}`}
      style={{
        width: w * (width > height ? 1 : 0.95),
        height: h,
      }}
    >
      <div style={{ minWidth: w }}></div>
      <div className='group-hover/tile:absolute group-hover/tile:top-0 group-hover/tile:-left-1.5 transition-all ease-in-out'
        style={{
          width: w,
          height: h,
        }}
      >
        <div className='relative flex group-hover/tile:z-20 group-hover/tile:scale-125 ring-2 ring-opacity-0 group-hover/tile:ring-opacity-10 ring-white rounded group-hover/tile:shadow-lg overflow-hidden transition-all ease-in-out duration-300'
          style={{
            width: w,
            height: h,
          }}
        >
          <div className='relative'>
            <span className='top-3 left-0 font-bold text-white absolute opacity-0 group-hover/tile:opacity-100 -translate-x-12 group-hover/tile:translate-x-0 transition-all ease-in-out duration-500 bg-black bg-opacity-40 px-3 pl-5 p-1.5 z-10'>
              {movie?.title_english}
            </span>
            <img
              src={movie?.background_image}
              alt={movie?.title}
              style={{
                width: w,
                height: h,
              }}
              className='rounded h-full w-full object-cover group-hover/tile:scale-110 transition-all ease-in-out'
            />
            <div className='absolute top-0 left-0 w-full h-full group-hover/tile:backdrop-blur-sm'>
              <img
                className='h-full w-full object-contain scale-125 group-hover/tile:scale-100 transition-all ease-in-out'
                src={movie?.medium_cover_image}
                alt={movie?.title}
                style={{
                  width: w,
                  height: h,
                }}
              />
            </div>
          </div>
          <div
            className='group/leftBtn realtive absolute opacity-0 group-hover/tile:opacity-100 translate-x-12 group-hover/tile:translate-x-0 right-5 bottom-4 duration-500 transition-all ease-in-out rounded-full ring-1 ring-white ring-opacity-15 hover:scale-110 cursor-pointer'
            onClick={() => router.push(`/${movie?.id}`)}
          >
            <div className='flex justify-center items-center w-8 h-8 bg-black group-hover/leftBtn:bg-gray-50 group-hover/leftBtn:text-gray-700 rounded-full bg-opacity-50 text-gray-50 font-bold text-xl cursor-pointer group-hover/leftBtn:shadow-lg transition-all ease-in-out'>
              i
            </div>
            <div className='absolute top-0 right-0 h-8 group-hover/leftBtn:pr-10 px-4 opacity-0 group-hover/leftBtn:opacity-100 text-sm flex items-center bg-white/40 ring-1 ring-white rounded-full delay-300 transition-all ease-in-out'>{`Details`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// a function to recursively render the object's items that have sub-items with level of depth
function renderObject(obj: any, level: number = 0) {
  return (
    <div className=''>
      {typeof obj === 'object' ? (
        Object.keys(obj).map((key, i) => (
          <div
            key={i}
            className='w-full py-3'
          >
            <span
              className='z-10 bg-indigo-500 text-white px-3 p-2 text-wrap'
              style={{
                marginLeft: `${level * 8}px`,
              }}
            >
              {key}
            </span>
            {typeof obj[key] === 'object' ? (
              renderObject(obj[key], level + 1)
            ) : (
              <div
                className='py-1 w-full'
                style={{
                  marginLeft: `${level * 20}px`,
                }}
              >
                <span className='bg-black text-white p-2 text-wrap w-full'>{obj[key]}</span>
              </div>
            )}
          </div>
        ))
      ) : (
        <div
          className='py-1 w-full'
          style={{
            marginLeft: `${level * 20}px`,
          }}
        >
          <span className='bg-black text-white p-2 text-wrap w-full'>{obj}</span>
        </div>
      )}
    </div>
  );
}
