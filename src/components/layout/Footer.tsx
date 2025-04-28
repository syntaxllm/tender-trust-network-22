
import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blockchain-darkNav border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white">TrustChain</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing government procurement through blockchain technology. 
              Ensuring transparency, efficiency, and trust in tender management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tenders" className="text-gray-400 hover:text-green-400 transition-colors">
                  Active Tenders
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-green-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-green-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-green-400" />
                Block 3, CGO Complex, New Delhi
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-green-400" />
                1800-123-4567
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-green-400" />
                support@trustchain.gov.in
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Globe className="w-4 h-4 text-green-400" />
                www.trustchain.gov.in
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-green-400 text-gray-400 hover:text-black transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-green-400 text-gray-400 hover:text-black transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-green-400 text-gray-400 hover:text-black transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-green-400 text-gray-400 hover:text-black transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} TrustChain. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Use
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-green-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
