import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Hero = () => {
  return (
    <div>

{/* Top */}

     <div className='w-full bg-[#F5F5F5] h-full flex justify-center items-center flex-row'>
     <div className='w-[90%] text-[#111111] h-[40px] md:h-[70px] flex flex-col justify-center items-center '>
     <div>
      <h1 className='text-2xl hidden md:block'>Hello Nike App</h1>
     </div>
     <div>
      <p className='text-[14px] md:flex md:gap-1'>Download the app to access everything Nike. 
       <Link
       href="https://play.google.com/store/apps/details?id=com.nike.omega&hl=en"
       target='_blank'
       >
        <span className='hover:underline hidden md:flex '>Get Your Great</span>
        </Link>
        </p>
     </div>
     
     </div>
     </div>

     {/* Img */}

     <div className='w-full  flex justify-center items-center flex-row'>
     <div className='text-[#111111] h-auto gap-[40px] flex flex-col justify-center items-center '>
      <div>
      <Image
      src="Hero.svg"
      alt='Hero'
      height={"1344"}
      width={"700"}
      className='md:w-[1174px] h-auto w-auto md:h-[604px]'
      />
      </div>

      <div className=' text-[#111111] w-[90%] gap-[8px]  h-[270px] md:h-[270px] flex flex-col justify-center items-center '>
     <div >
      <h1 className='font-medium text-[15px]'>First Look</h1>
     </div>

     <div>
      <h1 className='md:text-[56px] text-[30px] font-medium '>Nike Air Max Pulse</h1>
     </div>

     <div>
      <p className='text-center md:flex flex-col md:flex-col md:text-[16px] text-[14px] mt-2'>Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse <span>
      —designed to push you past your limits and help you go to the max.</span></p>
     </div>
<div className='flex gap-2 my-3 md:mt-5'>
      <div>
      <button className='md:py-[7.5px] py-[5px]  md:px-[22px]  px-[15px] rounded-full bg-[#111111] text-white hover:bg-[#313131]'>Notify Me</button>
      </div>
      <div>
      <button className='md:py-[7.5px] py-[5px]  md:px-[22px]  px-[15px] rounded-full bg-[#111111] text-white hover:bg-[#313131]'>Shop Air Max</button>
      </div>
     </div>
     </div>

     

     </div>
     </div>

    </div>
  )
}

export default Hero