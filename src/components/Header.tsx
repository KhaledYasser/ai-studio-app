import { motion } from 'motion/react';
import { Terminal, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Page = 'home' | 'articles' | 'gallery' | 'game';

interface HeaderProps {
  onNavigate: (page: Page, gameId?: string) => void;
  currentPage: Page;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const isOnGamePage = location.pathname.startsWith('/games/');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090f15]/80 backdrop-blur-xl border-b border-[#1c2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-[#81ecff] rounded-lg flex items-center justify-center shadow-lg shadow-[#81ecff]/20">
              <Terminal className="text-[#090f15] w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">TechNexus</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/"
              onClick={() => handleNavClick('home')}
              className={`text-sm font-medium transition-colors ${!isOnGamePage && currentPage === 'home' ? 'text-brand-400' : 'text-slate-400 hover:text-brand-400'}`}
            >
              Home
            </Link>
            <button 
              onClick={() => handleNavClick('articles')}
              className={`text-sm font-medium transition-colors ${currentPage === 'articles' ? 'text-brand-400' : 'text-slate-400 hover:text-brand-400'}`}
            >
              Articles
            </button>
            <button 
              onClick={() => handleNavClick('gallery')}
              className={`text-sm font-medium transition-colors ${currentPage === 'gallery' ? 'text-brand-400' : 'text-slate-400 hover:text-brand-400'}`}
            >
              App Gallery
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#090f15] border-b border-[#1c2430] px-4 py-6 space-y-4"
        >
          <Link 
            to="/"
            onClick={() => handleNavClick('home')}
            className="block text-base font-medium text-slate-400 w-full text-left"
          >
            Home
          </Link>
          <button 
            onClick={() => handleNavClick('articles')}
            className="block text-base font-medium text-slate-400 w-full text-left"
          >
            Articles
          </button>
          <button 
            onClick={() => handleNavClick('gallery')}
            className="block text-base font-medium text-slate-400 w-full text-left"
          >
            App Gallery
          </button>
        </motion.div>
      )}
    </header>
  );
}
