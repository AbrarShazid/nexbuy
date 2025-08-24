import mongodb from '@/lib/mongodb';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
export const dynamic = "force-dynamic"; export const revalidate = 0;

export const metadata = {
  title: "NexBuy | All Products",
  description: "All added products here",
};

export default async function Page() {
  
  const collectionDB =await mongodb('products');
  const products = await collectionDB.find({}).toArray();

  return (

   
    
    <div className="min-h-screen bg-[#f5f9ff] dark:bg-[#6b7282] transition-colors duration-300 py-8">
     
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#2d4b99] dark:text-white mb-3">
            Our Collection
          </h1>
          <p className="text-[#6b7282] dark:text-[#d1d5db] max-w-2xl mx-auto text-lg">
            Discover premium products crafted with excellence and attention to detail
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#6b7282] dark:text-[#d1d5db]">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product._id.toString()} 
                className="bg-white dark:bg-[#4b5563] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-3">
                    <p className="text-sm text-[#4c83e0] dark:text-[#b8b8b8] font-medium">
                      {product.seller}
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-2xl font-bold text-[#2d4b99] dark:text-white">
                      ${product.price}
                    </span>
                    
                    <Link 
                      href={`/products/${product._id}`}
                      className="px-4 py-2 bg-[#4c83e0] hover:bg-[#3a6bc5] dark:bg-[#6b7282] dark:hover:bg-[#5a6170] text-white rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>


  );
}