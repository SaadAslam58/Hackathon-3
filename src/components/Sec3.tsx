"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useState,useEffect } from 'react';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
const Sec3 = () => {
const [products, setProducts] = useState([]);
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
<div className='w-full min-h-screen  flex justify-center items-center flex-col'>
 <div className='flex justify-between  items-center w-[90%] md:h-[52px] text-black '>
    <div>
        <h1 className='text-[22px]'>Gear Up</h1>
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
                className='md:w-[48px] md:h-[48px] w-[38px] h-[38px]'

                />
            </div>
            <div>
            <Image
                src='/right.svg'
                alt='left'
                width={"48"}
                height={"48"}
                className='md:w-[48px] md:h-[48px] w-[38px] h-[38px]'

                />
            </div>
        </div>

    </div>

 </div>
  <div className="w-[90%]  mx-auto grid grid-cols-1 mt-5 md:grid-cols-4 gap-3">
  {products.slice(3,7).map((item:any) => {
    return (
      <div
        key={item._id}
        className="pb-4 m-1 shadow-lg rounded-lg md:transition-all duration-300 md:hover:scale-105">
          <Link
          href={`/posts/${item._id}`}
          >
            <div className='flex justify-center items-center'>
        <Image
          src={urlFor(item.imageUrl).url()}
          alt={item.productName}
          width={441}
          height={441}
          className="w-full cursor-pointer "
        />
        </div>
        </Link>
        <div className=" px-1 pt-1">
            <div className='flex justify-between items-center'>
          <h1 className=" text-black font-medium text-[15px]">{item.productName}</h1>
          <p>PKR {item.price}</p>
          </div>
          <p className="text-[12px] text-[#757575] font-thing pt-1">
            {item.description.slice(0,40)}...
          </p>
        </div>
    
      </div>
    );
  })}
</div>
         </div>
    </div>
  )
}

export default Sec3