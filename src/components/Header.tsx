import { motion } from 'motion/react';
import { Terminal, Github, Twitter, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-600/20">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">TechNexus</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#articles" className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors">Articles</a>
            <a href="#gallery" className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors">App Gallery</a>
            <a href="#about" className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors">About</a>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
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
          className="md:hidden bg-[#020617] border-b border-slate-800 px-4 py-6 space-y-4"
        >
          <a href="#articles" className="block text-base font-medium text-slate-400" onClick={() => setIsOpen(false)}>Articles</a>
          <a href="#gallery" className="block text-base font-medium text-slate-400" onClick={() => setIsOpen(false)}>App Gallery</a>
          <a href="#about" className="block text-base font-medium text-slate-400" onClick={() => setIsOpen(false)}>About</a>
        </motion.div>
      )}
    </header>
  );
}
