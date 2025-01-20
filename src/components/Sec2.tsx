import React from "react";
import Image from "next/image";
const Sec2 = () => {
  return (
    <div>
      <div className="w-full mt-5 md:mt-0 h-auto md:h-auto  flex justify-center items-center flex-col">
        <div className="flex justify-between  items-center w-[90%] md:h-[52px] text-black ">
            <h1 className="text-[23px]">Featured</h1>
          </div>

          <div className='w-full  flex justify-center items-center flex-row'>
     <div className='text-[#111111] h-auto gap-[40px] flex flex-col justify-center items-center '>

{/* Img */}

      <div>
      <Image
      src="/featured.svg"
      alt='Hero'
      height={"1344"}
      width={"700"}
      className='md:w-[1174px] h-auto w-auto md:h-[604px]'
      />
      </div>

      <div className=' text-[#111111] w-[90%] gap-[8px] md:gap-[10px]  h-[270px] md:h-[270px] flex flex-col justify-center items-center '>

     <div>
      <h1 className='md:text-[56px] text-[22px] font-medium '>STEP INTO WHAT FEELS GOOD</h1>
     </div>

     <div className="flex justify-center items-center md:flex flex-col md:flex-row md:text-[16px] text-[14px] mt-2 gap-1">
      <p >Cause everyone should know the feeling  
    </p>
    <p>of running in that perfect pair.</p>
     </div>

<div className='flex gap-2 my-3 md:mt-5'>
      <div>
      <button className='md:py-[7.5px] py-[5px]  md:px-[22px]  px-[15px] rounded-full bg-[#111111] text-white'>Find Your Shoe</button>
      </div>
     </div>
     </div>

     

     </div>
     </div>
        
      </div>
    </div>
  );
};

export default Sec2;
