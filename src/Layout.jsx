import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Sparkles, Users, Calendar, UserPlus, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Sparkles },
  { title: "About Us", url: createPageUrl("About"), icon: Users },
  { title: "Past Events", url: createPageUrl("PastEvents"), icon: Calendar },
  { title: "Upcoming Events", url: createPageUrl("UpcomingEvents"), icon: CalendarPlus },
  { title: "Join Us", url: createPageUrl("JoinUs"), icon: UserPlus },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <style>{`
        :root {
          --primary-50: #FFF7ED;
          --primary-100: #FFEDD5;
          --primary-200: #FED7AA;
          --primary-300: #FDBA74;
          --primary-400: #FB923C;
          --primary-500: #F97316;
          --primary-600: #EA580C;
          --primary-700: #C2410C;
          --primary-800: #9A3412;
          --primary-900: #7C2D12;
        }
        
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .shine-text {
          background: linear-gradient(90deg, #F97316 0%, #FBBF24 50%, #F97316 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 3s linear infinite;
        }
        
        .nav-hover {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #F97316, #FBBF24);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-hover:hover::after {
          width: 100%;
        }
        
        .glow-effect {
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
        }
      `}</style>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/files/logo.jpg" 
                  alt="Share&Shine Logo" 
                  className="w-12 h-12 object-contain rounded-lg transform group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold shine-text">Share&Shine</h1>
                <p className="text-xs text-gray-600">Youth Leadership</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`nav-hover px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.url
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to={createPageUrl("JoinUs")}>
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Become a Member
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-orange-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-xl">
            <div className="px-4 py-6 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    location.pathname === item.url
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
              <Link to={createPageUrl("JoinUs")} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Become a Member
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-900 to-amber-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/files/logo.jpg" 
                  alt="Share&Shine Logo" 
                  className="w-10 h-10 object-contain rounded-lg bg-white/10 p-1"
                />
                <h3 className="text-xl font-bold">Share&Shine</h3>
              </div>
              <p className="text-orange-100 max-w-md">
                Empowering young leaders to create positive change in their communities through innovative projects and collaborative initiatives.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.title}>
                    <Link to={item.url} className="text-orange-100 hover:text-white transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-orange-100">
                <li>Email: info@shareshine.org</li>
                <li>Join our community today!</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-orange-100">
            <p>&copy; 2025 Share&Shine Association. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}