"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FaSearch, FaHome, FaStore, FaPlus } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useCart } from "./Cart/CartContext";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/app/posts/[id]/page";

const Header: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Store array of products
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Store filtered results
  const [query, setQuery] = useState(""); // Store the query

  const searchRef = useRef<HTMLDivElement>(null); // Reference for the search bar
  const [isOpen, setIsOpen] = useState(false); // Sheet open state
  const { toggleCart } = useCart();
  const { totalItems } = useCart(); // Access the totalItems from context

  useEffect(() => {
    const fetchData = async () => {
      const data: Product[] = await client.fetch(`
        *[_type == "product"][] {
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
      `);
      setProducts(data); // Store fetched products
    };

    fetchData();

    // Close search results when clicking outside the search area
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchResults([]); // Clear search results
        setQuery(""); // Clear query
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value === "") {
      setSearchResults([]); // Clear results for empty input
    } else {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(value) // Case-insensitive matching
      );
      setSearchResults(filtered.slice(0, 4)); // Limit results to 4
    }
  }

  const handleProductClick = () => {
    setSearchResults([]); // Clear search results
    setQuery(""); // Clear query
  };


  return (
    <div>
      {/* Top */}
      <div className="w-full bg-[#F5F5F5] h-full flex justify-center items-center flex-row">
        <div className="w-[95%] text-[#111111] h-[30px] md:h-[46px] flex justify-between items-center ">
          <div>
            <Link href="/#">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={34}
                height={34}
                className="h-[20px] w-[20px] md:h-[34px] md:w-[34px]"
              />
            </Link>
          </div>
          <div className="md:relative md:left-[130px] hidden md:flex">
            <Link href="/ProductsPage">
              <h1 className="text-[13px] font-medium p-1 md:p-2  bg-white rounded-sm">
                Skip to the main content
              </h1>
            </Link>
          </div>
          <div className="md:flex hidden justify-center items-center gap-3">
            <div className="flex gap-1 text-[10px] md:text-[14px] ">
              <Link href="/#">
                <div className="border-r-black border-r-2 pr-2">
                  <h1 className="border-r-black">Home</h1>
                </div>
              </Link>
              <Link href="/ProductsPage">
                <div className="border-r-black border-r-2 pr-2">
                  <h1 className="border-r-black">Products</h1>
                </div>
              </Link>
              <Link href="/Sign">
                <div className="border-r-black border-r-2 pr-2">
                  <h1 className="border-r-black">Sign In</h1>
                </div>
              </Link>
              <Link href="/Store">
                <div className="border-r-black border-r-2 pr-2">
                  <h1 className="border-r-black">Find a Store</h1>
                </div>
              </Link>
            </div>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden">
              <Menu className="size-[25px]" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-1 mt-8 text-[14px] md:text-[14px] ">
                <Link href="/#" onClick={() => setIsOpen(false)}>
                  <div>
                    <h1 className="border-b-black border-b flex items-center gap-1">
                      Home
                      <FaHome />
                    </h1>
                  </div>
                </Link>
                <Link href="/ProductsPage" onClick={() => setIsOpen(false)}>
                  <div className="flex justify-start items-center gap-1 border-b-black border-b">
                    <h1>Become A Nike</h1>
                    <div>
                      <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={34}
                        height={34}
                        className="h-[10px] w-[10px]"
                      />
                    </div>
                  </div>
                </Link>
                <Link href="/Sign" onClick={() => setIsOpen(false)}>
                  <div>
                    <h1 className="border-b-black border-b flex items-center gap-1 ">
                      Sign In
                      <MdPersonAdd />
                    </h1>
                  </div>
                </Link>
                <Link href="/Login" onClick={() => setIsOpen(false)}>
                  <div>
                    <h1 className="border-b-black border-b flex items-center gap-1 ">
                      Join Us
                      <FaPlus />
                    </h1>
                  </div>
                </Link>
                <Link href="/Store" onClick={() => setIsOpen(false)}>
                  <div>
                    <h1 className="border-b-black border-b flex items-center gap-1">
                      Find a Store
                      <FaStore />
                    </h1>
                  </div>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Header */}
      <div className="w-full h-auto flex justify-center items-center flex-row">
        <div className="w-[95%] text-[#111111] h-[45px] md:h-[76px] flex justify-between items-center ">
          <div>
            <Image
              src="/Nike.svg"
              alt="Logo"
              width={34}
              height={34}
              className="h-[25px] w-[25px] md:h-[74px] md:w-[74px]"
            />
          </div>

          <div className="md:relative justify-center relative left-9 items-center hidden md:flex">
            <h1 className="text-[18px] font-medium p-1 md:p-2  bg-white rounded-sm">
              New & Featured
            </h1>
            <h1 className="text-[18px] font-medium p-1 md:p-2  bg-white rounded-sm">
              Men
            </h1>
            <h1 className="text-[18px] font-medium p-1 md:p-2  bg-white rounded-sm">
              Women
            </h1>
            <h1 className="text-[18px] font-medium p-1 md:p-2  bg-white rounded-sm">
              Kids
            </h1>
            <h1 className="text-[18px] font-medium p-1 md:p-2  bg-white rounded-sm">
              Sale
            </h1>
            <h1 className="text-[18px] font-medium p-1 md:p-2  bg-white rounded-sm">
              SNKRS
            </h1>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="flex relative left-1 gap-2 w-[100%] md:w-[80%] justify-center items-center p-1 md:p-[6px] rounded-full bg-[#F5F5F5]" ref={searchRef}>
              <div className="flex relative justify-center items-center gap-2">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={handleSearch}
                  className="text-black outline-none bg-[#F5F5F5]"
                />
              </div>

              {searchResults.length > 0 && (
                <div className="absolute w-screen md:w-[30vw] top-12 justify-center items-center bg-[#efeeee] py-2 px-3 rounded-lg text-black shadow-xl z-10">
                  {searchResults.map((item:Product) => (
                    <Link 
                    href={`/posts/${item._id}`} 
                    key={item._id}
                    onClick={handleProductClick} // Clear results when clicking a product
                    
                    >
                      <div
                        className="p-2 gap-3 flex item-center mt-3 rounded-lg transition-all hover:scale-105 "
                      >
                        <div>
                          <Image
                            src={item.imageUrl ? urlFor(item.imageUrl).url() : "/placeholder.png"}
                            alt={item.productName || "Product"}
                            width={100}
                            height={100}
                            quality={100}
                            className="w-[110px] rounded-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="font-bold text-md flex-wrap">
                            {item.productName.slice(0, 28)}...
                          </h1>
                          <p className="font-semibold text-gray-500">
                            {item.description.slice(0, 50)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Image
                src="/heart.svg"
                alt="Logo"
                width={34}
                height={34}
                className="h-[25px] w-[25px] md:h-[36px] md:w-[36px]"
              />
            </div>
            <div className="relative">
              <button onClick={toggleCart} className="p-2 text-white rounded">
                <Image
                  src="/cart.svg"
                  alt="Logo"
                  width={34}
                  height={34}
                  className="h-[25px] w-[32px] md:h-[36px] md:w-[38px]"
                />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 text-sm bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems === 5 ? "5+" : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
