import { motion } from 'motion/react';
import { ARTICLES } from '../constants';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

interface ArticlesProps {
  onViewAll: () => void;
}

export default function Articles({ onViewAll }: ArticlesProps) {
  return (
    <section id="articles" className="py-24 bg-[#090f15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wide">Latest Insights</h2>
            <p className="text-slate-400 max-w-xl">Deep dives into the technologies shaping our future, from artificial intelligence to sustainable architecture.</p>
          </div>
          <button 
            onClick={onViewAll}
            className="text-[#81ecff] font-semibold flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wide"
          >
            View All Articles <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="synthetic-card p-4 rounded-xl group cursor-pointer text-left border-l-2 border-transparent hover:border-[#81ecff]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-6">
                <img 
                  src={article.image} 
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#121820]/90 backdrop-blur-sm text-[#81ecff] text-[10px] font-bold uppercase tracking-wider rounded-md border border-[#81ecff]/20">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium uppercase tracking-wide">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#81ecff] transition-colors leading-snug uppercase">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="pt-4 flex items-center gap-3">
                  <img 
                    src={article.author.avatar} 
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full border border-slate-800"
                  />
                  <span className="text-sm font-medium text-slate-300">{article.author.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
