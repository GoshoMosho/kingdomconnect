import { Link } from "wouter";
import { 
  FaDiscord, 
  FaTelegram, 
  FaYoutube,
  FaEnvelope
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Social */}
          <div>
            <div className="font-heading text-2xl font-bold mb-4">
              <span className="text-primary">Banner</span>
              <span className="text-white">Match</span>
            </div>
            <p className="text-gray-400 mb-4">
              The premier matchmaking platform for Rise of Kingdoms players and kingdoms.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <FaTelegram className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/kingdoms">
                  <span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
                    Kingdoms
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/players">
                  <span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
                    Players
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
                    FAQ
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Migration Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  KVK Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Kingdom Building
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <FaEnvelope className="text-primary mt-1" />
                <span className="text-gray-400">support@bannermatch.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <FaDiscord className="text-primary mt-1" />
                <span className="text-gray-400">Discord: BannerMatch#1234</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} BannerMatch. All rights reserved. Not affiliated with Rise of Kingdoms or Lilith Games.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
