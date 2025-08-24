import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

export default function Banner() {
  // You can fetch this data from DB/API later since this is server-safe
  const banner = {
    title: "Summer Collection 2025",
    subtitle: "Discover the latest trends",
    description: "Get up to 50% off on selected items. Limited time offer!",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    ctaText: "Shop Now",
    ctaLink: "/products",
    features: ["Free Shipping", "30-Day Returns", "Secure Payment"],
  };

  return (
    <section className="relative w-full h-[400px] md:h-[90vh]  overflow-hidden">
      {/* Background Image */}
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl text-white">
            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl font-semibold text-[#4c83e0]  mb-2">
              {banner.subtitle}
            </h2>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {banner.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg mb-6 text-gray-200">
              {banner.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
              {banner.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm md:text-base"
                >
                  <FiCheckCircle className="mr-2 text-[#4c83e0] dark:text-[#6b7282]" />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href={banner.ctaLink}
              className="inline-flex items-center bg-[#4c83e0] dark:bg-[#6b7282] hover:bg-[#3a6bc5] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-colors duration-300 group"
            >
              {banner.ctaText}
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
