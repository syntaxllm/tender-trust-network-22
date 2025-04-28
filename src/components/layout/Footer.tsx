
import { Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blockchain-blue to-blockchain-purple p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">TrustChain</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Revolutionizing government procurement through blockchain technology. 
              Ensuring transparency, efficiency, and trust in tender management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blockchain-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tenders" className="text-gray-600 hover:text-blockchain-purple transition-colors">
                  Active Tenders
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-blockchain-purple transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-600 hover:text-blockchain-purple transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-blockchain-purple" />
                Block 3, CGO Complex, New Delhi
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-blockchain-purple" />
                1800-123-4567
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 text-blockchain-purple" />
                support@trustchain.gov.in
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Globe className="w-4 h-4 text-blockchain-purple" />
                www.trustchain.gov.in
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-blockchain-purple hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-blockchain-purple hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-blockchain-purple hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-blockchain-purple hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} TrustChain. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-600 hover:text-blockchain-purple transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-blockchain-purple transition-colors">
                Terms of Use
              </Link>
              <Link to="/sitemap" className="text-gray-600 hover:text-blockchain-purple transition-colors">
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
