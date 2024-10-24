import React from 'react';
import { useRouter } from 'next/navigation';

export default function NavButton(props: any) {
  const router = useRouter();
  return (
    <div className='z-40 fixed top-16 left-4'>
      <div className='group/menuBtn gap-x-2 relative w-fit transition-all ease-in-out'>
        <button type='button' title='Placeholder' className="
          absolute 
          top-0 
          left-0 
          w-12 
          h-12 
          bg-white/30 ring-1 ring-black/40 
          group-hover/menuBtn:-z-30 
          z-30 
          group-hover/menuBtn:opacity-0
          rounded-full 
          text-center 
          transition-all ease-in-out
        "></button>
        <div className="
          absolute 
          top-0 
          left-0 
          group-hover/menuBtn:opacity-100
          opacity-0
          rounded-full
          bg-white/60
          backdrop-blur-sm
          transition-all ease-in-out 
          flex flex-col 
          group-hover/menuBtn:gap-y-2 
          gap-y-0 
          items-center
          justify-center
          p-2
          w-12 h-12
          overflow-x-visible
        ">
          <button className='relative w-8.5 h-10 ring-1 hover:ring-black/40 ring-opacity-0 rounded-full text-center transition-all ease-in-out group/menuBackBtn hover:bg-white/80'
            type='button'
            title='Go back'
            onClick={() => {
              router.back();
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              fill='currentColor'
              className='bi bi-chevron-left scale-50 z-10'
              viewBox='0 0 16 16'
            >
              <path fillRule='evenodd'
                d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
              />
            </svg>
            <div className='opacity-0 group-hover/menuBackBtn:opacity-100 absolute top-1/2 left-0 -translate-y-1/2 group-hover/menuBackBtn:pl-10 p-1 px-3 w-fit bg-black/30 text-white font-semibold min-w-[8rem] rounded-full -z-10 transition-all ease-in-out'>{`Go back`}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
