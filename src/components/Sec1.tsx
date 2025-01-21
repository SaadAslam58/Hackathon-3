"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import { useState,useEffect } from 'react';
import { Product } from '@/app/posts/[id]/page';


const Sec1 = () => {
const [products, setProducts] = useState<Product[]>([]);
 useEffect(()=>{
    async function fetchData(){
        const data = await client.fetch(`*[_type == "product"][]{
  _id,          
  productName,
  category,
  price,
  inventory,
  colors,
  status,
  description,
  "imageUrl": image.asset->url
}
`)
console.log(data);
setProducts(data);
    }
    fetchData();
 },[])


  return (
    <div>
 <div className='w-full min-h-screen   flex justify-center items-center flex-col'>
 <div className='flex justify-between  items-center w-[90%] md:h-[52px] text-black '>
    <div>
        <h1 className='text-[22px]'>Best of Air Max</h1>
    </div>
    <div className='flex justify-center items-center gap-2 '>
        <h1  className='text-[15px]'>Shop</h1>
        <div className='flex gap-2'>
            <div>
                <Image
                src='/left.png'
                alt='left'
                width={"48"}
                height={"48"}
                className='md:w-[48px] md:h-[48px] w-[38px] h-[38px] cursor-pointer'
                />
            </div>
            <div>
            <Image
                src='/right.svg'
                alt='left'
                width={"48"}
                height={"48"}
                className='md:w-[48px] md:h-[48px] w-[38px] h-[38px] cursor-pointer'

                />
            </div>
        </div>

    </div>

 </div>
  <div className="w-[90%]  items-center justify-center mx-auto grid grid-cols-1 mt-5 md:grid-cols-3 gap-3">
  {products.slice(0,3).map((item:Product) => {
    return (
      <div
        key={item._id}
        className="pb-4 flex flex-col bg-center  m-1 shadow-lg  rounded-lg md:transition-all duration-300 md:hover:scale-105 ">
          <Link
          href={`/posts/${item._id}`}
          >
            <div className='flex justify-center items-center'>
        <Image
          src={urlFor(item.imageUrl).url()}
          alt={item.productName}
          width={441}
          height={441}
          className="w-full bg-center cursor-pointer "
        />
        </div>
        </Link>
        <div className="px-1 pt-1">
        <div className='flex justify-between items-center'>
          <h1 className=" text-black font-medium text-[15px]">{item.productName}</h1>
          <p>PKR {item.price}</p>
          </div>
          <div className='flex justify-between'>
          <p className="text-[14px] text-[#757575] font-thing  pt-1">
            {item.category}
          </p>
          <p className="text-[14px] text-[#757575] font-thing  pt-1">
            {item.colors}
          </p>
          </div>
        </div>
    
      </div>
    );
  })}
</div>
         </div>
    </div>
  )
}

export default Sec1