import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className="w-full h-screen md:h-[140vh]  flex justify-center items-center flex-col">
            <div className='flex flex-col gap-12 justify-center items-center'>
                <div className='flex gap-5 justify-center flex-col items-center'>

                    <div className='text-center md:text-[40px] text-[25px] font-bold'>
                        <h1>Beome a member of Nike</h1>
                    </div>

                    <div>
                   <h3 className='text-center text-[16px] flex flex-col'>Fill out these required to become a part of the family <span className=' text-slate-400'>*These are required fields for filling out*</span></h3>
                    </div>
                    
                </div>
                <div className='flex flex-col gap-5'>
                    <input type="text"  placeholder='Email*' className='outline-none border-2 border-slate-400 h-[40px] md:h-[60px] px-2 md:w-[390px] w-[300px] rounded-[8px]' />
                    <input type="text"  placeholder='Phone Number*' className='outline-none border-2 border-slate-400 h-[40px] md:h-[60px] px-2 md:w-[390px] w-[300px] rounded-[8px]' />
                    <input type="text"  placeholder='New Password*' className='outline-none border-2 border-slate-400 h-[40px] md:h-[60px] px-2 md:w-[390px] w-[300px] rounded-[8px]' />
                    <input type="text"  placeholder='Order Number*' className='outline-none border-2 border-slate-400 h-[40px] md:h-[60px] px-2 md:w-[390px] w-[300px] rounded-[8px]' />
                    <input type="text" placeholder='Confirm Password*' className='outline-none border-2 border-slate-400 h-[40px] md:h-[60px] px-2 md:w-[390px] w-[300px] rounded-[8px]'/>
                </div >
    
                <div>
                    <Button className='h-[40px] bg-[#E5E5E5] text-[#757575] md:h-[70px] px-2 md:w-[390px] text-[17px] w-[300px] rounded-full hover:bg-[#E5E5E5]'>Submit</Button>
                </div>
                <div>
                    <p className='flex text-[#8D8D8D] md:text-[16px] text-[13px]'>Already a member? 
                        <Link
                        href="/Sign"
                        >
                        <span className='text-black hover:underline'>Sign in.</span>
                        </Link>
                        </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page