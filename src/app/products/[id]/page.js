import mongodb from "@/lib/mongodb";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { FiArrowLeft } from "react-icons/fi";

export async function generateMetadata({ params }) {
  params=await params
  const collectionDB =await mongodb("products");
  let product = null;

  try {
    product = await collectionDB.findOne({ _id: new ObjectId(params.id) });
  } catch (error) {
    return {
      title: "NexBuy | Product Not Found",
      description: "The requested product could not be found.",
    };
  }
  return {
    title: `NexBuy | ${product.name}`,
    description: product.description,
  };
}

export default async function ProductDetail({ params }) {
    params=await params
  const collectionDB =await mongodb("products");
  let product = null;

  try {
    product = await collectionDB.findOne({ _id: new ObjectId(params.id) });
  } catch (error) {
    product = null; // Treat invalid ID as "not found"
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f9ff] dark:bg-[#374254] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2d4b99] dark:text-white mb-4">
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="px-4 py-2 bg-[#4c83e0] hover:bg-[#3a6bc5] dark:bg-[#6b7282] dark:hover:bg-[#5a6170] text-white rounded-lg font-medium transition-colors duration-200 inline-flex items-center"
          >
            <FiArrowLeft className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff] dark:bg-[#374254] transition-colors duration-300 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-[#4b5563] rounded-2xl overflow-hidden shadow-lg">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                <Image
                  src={product.img}
                  alt={product.name}
          
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
              unoptimized={true}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6">
              <div className="mb-4">
                <span className="inline-block bg-[#e6f0ff] dark:bg-[#1e293b] text-[#4c83e0] dark:text-[#93c5fd] text-xs font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <div className="mb-2">
                <p className="text-sm text-[#4c83e0] dark:text-[#93c5fd] font-medium">
                  {product.seller}
                </p>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <span className="text-3xl font-bold text-[#2d4b99] dark:text-white">
                  ${product.price}
                </span>
                {product.shipping === 1 ? (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Free shipping
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Shipping: ${product.shipping}
                  </p>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Info */}
              <div className="p-4 bg-[#f5f9ff] dark:bg-[#374254] rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Availability
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
