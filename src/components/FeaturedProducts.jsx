import Link from 'next/link';
import Image from 'next/image';
import mongodb from '@/lib/mongodb';

export default async function FeaturedProducts() {
  const collectionDB =await mongodb('products');
 
  const products = await collectionDB.find({}).limit(8).toArray();

  if (products.length === 0) {
    return null; 
  }

  return (
    <section className="w-full py-16 bg-[#f5f9ff] dark:bg-[#6b7282] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d4b99] dark:text-white mb-3">
            Featured Products
          </h2>
          <p className="text-[#6b7282] dark:text-[#d1d5db] max-w-2xl mx-auto">
            Discover our most popular items loved by customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <div 
              key={product._id.toString()} 
              className="bg-white dark:bg-[#4b5563] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

        <div className="text-center">
          <Link 
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-[#4c83e0] hover:bg-[#3a6bc5] dark:bg-[#6b7282] dark:hover:bg-[#5a6170] text-white rounded-lg font-medium transition-colors duration-200 text-lg"
          >
            Explore All Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}