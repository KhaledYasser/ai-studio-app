/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Articles from './components/Articles';
import AppGallery from './components/AppGallery';
import ArticlesPage from './components/ArticlesPage';
import AppGalleryPage from './components/AppGalleryPage';
import Footer from './components/Footer';

type Page = 'home' | 'articles' | 'gallery';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const navigate = useNavigate();

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleGameSelect = (gameId: string) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <Articles onViewAll={() => handleNavigate('articles')} />
            <AppGallery onViewAll={() => handleNavigate('gallery')} />
          </>
        )}
        {currentPage === 'articles' && <ArticlesPage onBack={() => handleNavigate('home')} />}
        {currentPage === 'gallery' && <AppGalleryPage onBack={() => handleNavigate('home')} />}
      </main>
      <Footer />
    </div>
  );
}

