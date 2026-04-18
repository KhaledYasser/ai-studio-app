import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code2, Rocket, Zap, GamepadIcon } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: 'articles' | 'gallery') => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-500/10 to-blue-500/10 text-brand-400 text-xs font-semibold mb-6 border border-brand-500/30 hover:border-brand-500/60 transition-all">
            <Sparkles className="w-3 h-3 animate-spin" />
            🚀 Welcome to TechNexus
          </span>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[1.1] animate-fade-in">
            Where Code 💻 Meets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-400 to-purple-400 animate-pulse">
              🎮 Pure Innovation
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-4 leading-relaxed font-semibold">
            Deep-tech insights, experimental games, and cutting-edge web applications.
          </p>
          
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Explore innovative articles, play interactive games built with React & Canvas, and discover the future of web technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button 
              onClick={() => onNavigate('articles')}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl font-bold hover:from-brand-600 hover:to-brand-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-brand-600/50"
            >
              📚 Read Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              onClick={() => onNavigate('gallery')}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white border border-purple-500/50 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
            >
              🎮 Play Games
              <GamepadIcon className="w-5 h-5" />
            </motion.button>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-sm text-slate-500"
          >
            ⭐ Games | 📖 Articles | 🚀 Always Innovating
          </motion.p>
        </motion.div>

        {/* Stats/Features */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: <Zap className="w-6 h-6" />, title: "⚡ Fast & Responsive", desc: "Lightning-quick gameplay with smooth 60 FPS performance." },
            { icon: <Rocket className="w-6 h-6" />, title: "🚀 Modern Tech", desc: "Built with React, TypeScript, Tailwind, and Web Canvas." },
            { icon: <Sparkles className="w-6 h-6" />, title: "🎯 Play & Learn", desc: "Interactive games + in-depth technical articles for developers." }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 rounded-2xl text-left group cursor-pointer hover:border-brand-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-brand-300 mb-4 group-hover:from-brand-500/40 group-hover:to-blue-500/40 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
