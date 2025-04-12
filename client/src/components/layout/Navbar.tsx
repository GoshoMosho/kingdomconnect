import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Kingdoms", path: "/kingdoms" },
    { name: "Players", path: "/players" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="bg-secondary text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <span className="font-heading text-2xl font-bold cursor-pointer">
                <span className="text-primary">Banner</span>
                <span className="text-white">Match</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span className={`text-white hover:text-primary transition duration-300 font-medium cursor-pointer ${
                  location === link.path ? "text-primary" : ""
                }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:block">
            <Link href="/signup">
              <Button className="bg-primary hover:bg-red-700 text-white">Sign Up</Button>
            </Link>
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-white focus:outline-none" 
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <span 
                    className={`text-white hover:text-primary transition duration-300 font-medium py-2 block ${
                      location === link.path ? "text-primary" : ""
                    }`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              <Link href="/signup">
                <Button 
                  className="bg-primary hover:bg-red-700 text-white w-full mt-2"
                  onClick={closeMenu}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
