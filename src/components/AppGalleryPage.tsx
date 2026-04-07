import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { APPS } from '../constants';

interface AppGalleryPageProps {
  onBack: () => void;
}

export default function AppGalleryPage({ onBack }: AppGalleryPageProps) {
  return (
    <section className="min-h-screen bg-[#020617] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-brand-400 hover:text-brand-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">App Gallery</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">A collection of experimental projects and production-ready applications showcasing modern web capabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {APPS.map((app, i) => (
            <motion.a
              key={app.id}
              href={app.link}
              target={app.link !== '#' ? '_blank' : undefined}
              rel={app.link !== '#' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:shadow-2xl hover:shadow-brand-600/20 transition-all"
            >
              <div className="md:w-2/5 relative overflow-hidden border-r border-slate-800/50">
                <img 
                  src={app.image} 
                  alt={app.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-3">
                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors border border-white/10">
                      <Github className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors border border-white/10">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 md:w-3/5 flex flex-col justify-between bg-slate-900/20">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      app.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      app.status === 'Beta' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">{app.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {app.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {app.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-medium text-slate-500 bg-slate-800/50 px-2 py-1 rounded-md border border-slate-700/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
