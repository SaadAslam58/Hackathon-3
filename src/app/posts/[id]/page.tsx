"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/Cart/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export interface Product {
  _id: number;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  colors: string[];
  status: string;
  description: string;
  imageUrl: string;
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
}

const ProductPage: React.FC = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });
  const router = useRouter();
  const [extra, setExtra] = useState<Product[]>([]);

  // Fetch product and reviews
  useEffect(() => {
    async function fetchData() {
      const dummyReviews: Review[] = [
        {
          _id: "1",
          name: "John Doe",
          rating: 4,
          comment: "Great product, really loved it!",
        },
        {
          _id: "2",
          name: "Jane Smith",
          rating: 5,
          comment: "Amazing quality and fast delivery!",
        },
        {
          _id: "3",
          name: "Michael Lee",
          rating: 3,
          comment: "Good, but I was expecting better durability.",
        },
      ];

      try {
        const productData = await client.fetch(
          `*[_type == "product" && _id == $id]{
            _id,          
            productName,
            category,
            price,
            inventory,
            colors,
            status,
            description,
            "imageUrl": image.asset->url
          }`,
          { id }
        );
        setProduct(productData[0]);

        const reviewData = await client.fetch(
          `*[_type == "review" && productId == $id]{
            _id,
            name,
            rating,
            comment
          }`,
          { id }
        );

        const productExtra = await client.fetch(
          `*[_type == "product"][]{
            _id,          
            productName,
            category,
            price,
            inventory,
            colors,
            status,
            description,
            "imageUrl": image.asset->url
          }`
        );
        setExtra(productExtra);

        const allReviews = reviewData.length ? reviewData : dummyReviews;
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);  // Removed 'dummyReviews' from dependency array

  // Add a dummy review (does not send data to Sanity)
  const handleAddReview = async () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) {
      alert("Please fill out all fields.");
      return;
    }

    // Dummy review (no request to Sanity)
    const dummyReview: Review = {
      _id: Math.random().toString(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    // Update the reviews state with the dummy review
    setReviews((prevReviews) => [...prevReviews, dummyReview]);

    // Reset the new review form
    setNewReview({ name: "", rating: 0, comment: "" });
  };

  // Add to cart
  const handleAddToCart = useCallback(
    (product: Product) => {
      const cartItem = {
        id: product._id,
        productName: product.productName,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        inventory: product.inventory,
        description: product.description,
      };
      addToCart(cartItem);
    },
    [addToCart]
  );

  // Buy now
  const handleBuyNow = (product: Product) => {
    const cartItem = {
      id: product._id,
      productName: product.productName,
      price: product.price,
      quantity: 1,
      inventory: product.inventory,
      imageUrl: product.imageUrl,
      description: product.description,
    };

    addToCart(cartItem);
    router.push("/Checkout");
  };

  if (!product) return <div>Loading...</div>;
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      {/* Product Details */}
      <div className="flex flex-col mt-5 lg:flex-row w-[90%] justify-evenly items-center p-6 rounded-lg shadow-lg bg-white">
        <div className="w-full md:w-[40%]">
          <Image
            src={urlFor(product.imageUrl).url()}
            alt={product.productName}
            height={2000}
            width={2000}
            className="w-full mb-5 rounded-lg object-cover shadow-lg "
            quality={100}
          />
        </div>
        <div className="md:w-[40%] w-full text-center md:text-left">
          <h1 className="lg:text-4xl text-3xl font-semibold text-gray-800">{product.productName}</h1>
          <p className="my-4 text-md text-gray-600">{product.description}</p>
          <p className="text-gray-600">Category : {product.category}</p>
          <div className="flex justify-between items-center mt-6">
            <p className="text-xl text-gray-700">PKR : {product.price}</p>
            <div className="flex gap-3">
              <Button onClick={() => handleBuyNow(product)}>Buy Now</Button>
              <Button className="flex" onClick={() => handleAddToCart(product)}><span className="md:flex hidden">Add to</span> Cart</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-[90%] mt-10 bg-white p-6 mb-5 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="font-semibold">{review.name}</p>
                <p className="text-yellow-500">Rating: {review.rating}/5</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}

        {/* Add Review Form */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={newReview.rating || ""}
            onChange={(e) => setNewReview({ ...newReview, rating: +e.target.value })}
            className="w-full p-2 mb-3 border rounded"
          />
          <textarea
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-2 mb-3 border rounded"
          />
          <Button onClick={handleAddReview}>Submit Review</Button>
        </div>
      </div>

      {/* Extra Products Section */}
      <div className="h-full w-[90%] mb-5 grid grid-cols-2 md:grid-cols-4 gap-3 mx-auto">
        {extra.map((item: Product, index: number) => (
          <div
            key={item._id || `${index}`} // Use _id or fallback to index if _id is missing
            className="pb-4 m-1 bg-center items-center shadow-lg rounded-lg md:transition-all duration-300 md:hover:scale-105"
          >
            <Link href={`/posts/${item._id}`}>
              <Image
                src={urlFor(item.imageUrl).url()}
                alt={item.productName}
                height={441}
                width={341}
                className="w-full rounded-lg object-cover"
              />
            </Link>
            <div className="px-1 pt-1">
              <p className="text-[#9E3500]">{item.status}</p>
              <h1 className=" text-black font-medium text-[15px]">
                {item.productName}
              </h1>
              <p className="text-[12px] text-[#757575] font-thing pt-1">
                {item.description.slice(0, 50)}...
              </p>
              <p className="text-[#757575]">{item.colors}</p>
              <p>PKR {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
