import Link from "next/link";
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#4c83e0] dark:bg-[#374254] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wide">NexBuy</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Your trusted destination for quality products at affordable prices. 
              We're committed to providing the best shopping experience.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com" target="_blank" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <FiFacebook size={18} />
              </a>
              <a href="https://www.x.com" target="_blank" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <FiTwitter size={18} />
              </a>
              <a href="https://www.instagram.com" target="_blank" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <FiInstagram size={18} />
              </a>
              <a href="https://www.youtube.com" target="_blank" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white/80 hover:text-white transition-colors text-sm">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FiMapPin className="mt-1 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  123 Commerce Street<br />
                  Business District, BD 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone />
                <span className="text-white/80 text-sm">+8801904382308</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail />
                <span className="text-white/80 text-sm">support@nexbuy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} NexBuy. All rights reserved.
          </p>
     
        </div>
      </div>
    </footer>
  );
}