import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Code2, Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-6 border border-brand-500/20">
            <Sparkles className="w-3 h-3" />
            Exploring the Digital Frontier
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
            Where Code Meets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">Pure Innovation</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A curated space for deep-tech insights and a showcase of experimental applications built for the modern web.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 group">
              Explore Articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white border border-slate-800 rounded-xl font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              View Gallery
            </button>
          </div>
        </motion.div>

        {/* Stats/Features */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: <Code2 className="w-6 h-6" />, title: "Modern Stack", desc: "Built with the latest technologies like React, Tailwind, and Motion." },
            { icon: <Rocket className="w-6 h-6" />, title: "High Performance", desc: "Optimized for speed, accessibility, and seamless user experience." },
            { icon: <Sparkles className="w-6 h-6" />, title: "AI Integrated", desc: "Showcasing the power of generative AI in real-world applications." }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-left group">
              <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
