import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="bg-[#f5f9ff] dark:bg-gray-500 text-gray-700 dark:text-white transition-all duration-300">
       
      <div className="min-h-screen">
        <Banner></Banner>

        <FeaturedProducts></FeaturedProducts>
      </div>

      <Footer></Footer>
    </div>
  );
}
