import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSlidersH } from "react-icons/fa";
const page = () => {
  return (
    <div>
      <div className="w-full h-[130vh] md:h-[120vh] flex flex-col md:flex-row ">
        <div className="flex justify-center flex-col gap-10 p-5 md:w-[30%] w-full">
          <div className="flex gap-10 justify-center flex-col">
            <div>
              <h1 className="text-[27px] font-medium">Find a Nike Store</h1>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                {" "}
                <input
                  type="text"
                  placeholder="Enter address"
                  className="outline-none border-2 border-slate-400 h-[40px] md:h-[50px] px-2 md:w-[350px] w-[300px] rounded-[4px]"
                />
              </div>
              <div className="flex justify-between items-center ">
                <p className="text-[#757575]">15 Stores Near You</p>
                <div>
                  <h1 className="flex justify-center items-center gap-5 py-[3px] px-4 rounded-full border-2 ">
                    Filter <FaSlidersH className="text-[13px]" />
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col  ">
            <div className="flex flex-col border-y-2 gap-1 py-3 px-3  ">
           <p className="text-[#757575]">NIKE DOLMEN MALL CLIFTON</p>
           <p className="text-[#757575]">1st Floor, Dolmen Mall</p>
           <p className="text-[#757575]">Mainstay for athletic apparel & footwear</p>
           <p><span className="text-[#D43F21]">Closed </span>• Opens at 11:00 am</p>
            </div>
            <div className="flex flex-col  gap-1 py-3 px-3 ">
           <p className="text-[#757575]">Nike</p>
           <p className="text-[#757575]">Sports accessories wholesale</p>
           <p className="text-[#757575]">Mainstay for athletic apparel & footwear</p>
           <p><span className="text-[#D43F21]">Closed </span>• Opens at 11:00 am</p>
            </div>
            <div className="flex flex-col border-y-2 gap-1 py-3 px-3 ">
           <p className="text-[#757575]">Nike Shoe in Pakistan</p>
           <p className="text-[#757575]">650 5th Ave.</p>
           <p className="text-[#757575]">Athletic wear & shoes</p>
           <p><span className="text-[#D43F21]">Closed </span>• Opens at 11:00 am</p>
            </div>
            

          </div>
        </div>
        
        <div className="flex justify-center items-center w-full md:w-[70%]">
          <Link
          href="https://www.google.com/maps/search/nike+store+link+in+karachi/@24.9352704,66.8841312,11z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          >
          <Image
          src="/location1.svg.png"
          width={"960"}
          height={"740"}
          alt="location"
          />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
