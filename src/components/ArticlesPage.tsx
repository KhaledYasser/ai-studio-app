import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { FULL_ARTICLES } from '../data/articles';

interface ArticlesPageProps {
  onBack: () => void;
}

export default function ArticlesPage({ onBack }: ArticlesPageProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? FULL_ARTICLES.find(a => a.id === selectedId) : null;

  if (selected) {
    return (
      <article className="min-h-screen bg-[#020617] pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-brand-400 hover:text-brand-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Articles
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-96 object-cover rounded-2xl mb-8"
              />

              <div className="flex items-center gap-4 mb-6 text-slate-400 text-sm">
                <span className="px-3 py-1 bg-brand-500/10 text-brand-400 rounded-full border border-brand-500/20">
                  {selected.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {selected.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selected.readTime}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {selected.title}
              </h1>

              <div className="flex items-center gap-4 pb-8 border-b border-slate-800">
                <img
                  src={selected.author.avatar}
                  alt={selected.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-1 text-white font-semibold">
                    <User className="w-4 h-4" />
                    {selected.author.name}
                  </div>
                  <div className="text-slate-400 text-sm">Tech Writer</div>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div
                className="text-slate-300 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{
                  __html: selected.content
                    .split('\n\n')
                    .map(para => {
                      if (para.startsWith('#')) {
                        const level = para.match(/^#+/)[0].length;
                        const text = para.replace(/^#+\s/, '');
                        const Tag = `h${Math.min(level + 1, 6)}` as any;
                        return `<${Tag} class="text-${level === 1 ? '3xl' : '2xl'} font-bold text-white mt-8 mb-4">${text}</${Tag}>`;
                      }
                      if (para.startsWith('-') || para.startsWith('*')) {
                        return `<li class="ml-6">${para.substring(2)}</li>`;
                      }
                      if (para.startsWith('```')) return '';
                      return `<p>${para}</p>`;
                    })
                    .join('')
                }}
              />
            </div>
          </motion.div>
        </div>
      </article>
    );
  }

  return (
    <section className="min-h-screen bg-[#020617] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Articles & Insights</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">Deep dives into modern web development, architecture, and sustainable coding practices.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FULL_ARTICLES.map((article, i) => (
            <motion.button
              key={article.id}
              onClick={() => setSelectedId(article.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden text-left group hover:shadow-xl hover:shadow-brand-600/20 transition-all"
            >
              <div className="relative overflow-hidden h-48 border-b border-slate-800/50">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-500">{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{article.author.name}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
