/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GamePageProps } from '../types';

/**
 * GameLandingPage Component
 * Reusable component for displaying game landing pages
 * Features:
 * - Hero section with game image and tagline
 * - Detailed game description
 * - Key features list
 * - How to play instructions
 * - Game specifications
 * - Pro tips and tricks
 * - Share functionality
 * - Related games suggestions
 */

export default function GameLandingPage({ game }: { game: GamePageProps }) {
  const {
    id,
    name,
    tagline,
    description,
    heroImage,
    gameLink,
    sourceCodeLink,
    features,
    howToPlay,
    tips,
    specs,
    relatedGames,
    shareUrls,
    seo
  } = game;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      {/* SEO Meta Tags - handled by parent */}
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-96 md:h-[500px] w-full">
          <img
            src={heroImage.url}
            alt={heroImage.alt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {name}
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-lg">
              {tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 md:px-8 py-12">
        
        {/* Game Description */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                About {name}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {description}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href={gameLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
                >
                  🎮 Play Now
                </a>
                {sourceCodeLink && (
                  <a
                    href={sourceCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
                  >
                    💻 Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Game Specs Table */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-fit">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Game Specs
              </h3>
              <dl className="space-y-4">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                      {spec.label}
                    </dt>
                    <dd className="text-gray-600 dark:text-gray-400 mt-1">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
                {feature.items && (
                  <ul className="mt-4 space-y-2">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start text-gray-600 dark:text-gray-400">
                        <span className="mr-3 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* How to Play Section */}
        <section className="mb-16 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            How to Play
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Getting Started
              </h3>
              <ol className="space-y-4">
                {howToPlay.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Pro Tips & Tricks
              </h3>
              <ul className="space-y-3">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-2xl">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Share Section */}
        <section className="mb-16 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Share {name}
          </h3>
          <div className="flex flex-wrap gap-4">
            {shareUrls.map((share, idx) => (
              <a
                key={idx}
                href={share.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
              >
                <span>{share.icon}</span>
                {share.label}
              </a>
            ))}
          </div>
        </section>

        {/* Related Games Section */}
        {relatedGames && relatedGames.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  <a href={game.link} className="group">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {game.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {game.description}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
