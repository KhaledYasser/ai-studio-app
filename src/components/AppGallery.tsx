import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { APPS } from '../constants';
import { ExternalLink, Github, Layout } from 'lucide-react';

interface AppGalleryProps {
  onViewAll: () => void;
}

// Game IDs that should use the game landing page instead of direct URL
const GAME_IDS = new Set(['1', '2', '3', '4', '5', '6']);

// Map app IDs to game IDs for routing
const APP_TO_GAME_ID: Record<string, string> = {
  '1': 'invadors',
  '2': '2048',
  '3': 'flappy-bird',
  '4': 'snake',
  '5': 'tetris',
  '6': 'slimy'
};

export default function AppGallery({ onViewAll }: AppGalleryProps) {
  return (
    <section id="gallery" className="py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">App Gallery</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A collection of experimental projects and production-ready applications showcasing modern web capabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {APPS.map((app, i) => {
            const isGame = GAME_IDS.has(app.id);
            const gameId = isGame ? APP_TO_GAME_ID[app.id] : null;
            const href = isGame && gameId ? `/games/${gameId}` : app.link;
            const isExternalLink = !isGame && app.link !== '#';

            // Use Link for internal routes, anchor tag for external links
            const linkProps = isGame || (app.link === '#')
              ? { to: href as any }
              : { to: '#' };

            const commonClassNames = "glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:shadow-2xl hover:shadow-brand-600/20 transition-all";

            const content = (
              <>
                <div className="md:w-2/5 relative overflow-hidden border-r border-slate-800/50">
                  <img 
                    src={app.image} 
                    alt={app.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-3">
                      {app.link !== '#' && !isGame && (
                        <>
                          <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors border border-white/10">
                            <Github className="w-5 h-5" />
                          </button>
                          <a 
                            href={app.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors border border-white/10"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </>
                      )}
                      {isGame && (
                        <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors border border-white/10">
                          🎮
                        </button>
                      )}
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
                      <Layout className="w-4 h-4 text-slate-600" />
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
              </>
            );

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {isGame ? (
                  <Link to={href} className={commonClassNames}>
                    {content}
                  </Link>
                ) : app.link !== '#' ? (
                  <a 
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={commonClassNames}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={commonClassNames}>
                    {content}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={onViewAll}
            className="px-8 py-4 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl font-semibold hover:bg-slate-800 hover:text-white transition-all shadow-xl"
          >
            View All Apps
          </button>
        </div>
      </div>
    </section>
  );
}
