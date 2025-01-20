import Image from 'next/image'
import React from 'react'
import { CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const page = () => {
  return (
    <div>
        <div className="w-full h-screen md:h-[120vh]  flex justify-center items-center flex-col">
            <div className='flex flex-col gap-5 justify-center items-center'>
                <div className='flex gap-5 justify-center flex-col items-center'>
                    <div>
                    <Image
                    src="Nike.svg"
                    height={100}
                    width={100}
                    alt='Logo'
                    className='md:w-[80px] w-[80px] md:h-[100px] h-[80px]'
                    />
                    </div>
                    <div className='text-center md:text-[30px] text-[25px] font-bold'>
                        <h1>YOUR ACCOUNT <br /> FOR EVERYTHING <br /> NIKE</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <input type="text"  placeholder='Enter address' className='outline-none border-2 border-slate-400 h-[40px] md:h-[50px] px-2 md:w-[390px] w-[300px] rounded-[4px]' />
                    <input type="text" placeholder='Password' className='outline-none border-2 border-slate-400 h-[40px] md:h-[50px] px-2 md:w-[390px] w-[300px] rounded-[4px]'/>
                </div >
                <div className='flex gap-[40px] md:gap-[60px]'>
                    <div className='flex gap-3'>
                      <CheckSquare />
                        <h1 className='text-[#8D8D8D] md:text-[16px] text-[13px] hover:text-[#606060]'>Keep me signed in</h1>
                    </div>
                    <div>
                        <h1 className='text-[#8D8D8D] md:text-[16px] text-[13px] hover:text-[#606060]'>Forgotten your password?</h1>
                    </div>
                </div>
                <div>
                    <p className='text-[#8D8D8D] md:text-[16px] text-[13px] hover:text-[#606060] text-center'>By logging in, you agree to Nikes Privacy Policy <br /> and Terms of Use.</p>
                </div>
                <div>
                    <Button className='h-[40px] md:h-[50px] px-2 md:w-[390px] w-[300px] rounded-[4px]'>SIGN IN</Button>
                </div>
                <div>
                    <p className='flex text-[#8D8D8D] md:text-[16px] text-[13px]'>Not a Member? 
                    <Link
                href="/Login"
                >
                        <span className='text-black hover:underline'>Join Us.</span>
                    </Link>
                        </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page