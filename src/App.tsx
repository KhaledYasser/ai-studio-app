/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero />
            <Articles onViewAll={() => setCurrentPage('articles')} />
            <AppGallery onViewAll={() => setCurrentPage('gallery')} />
          </>
        )}
        {currentPage === 'articles' && <ArticlesPage onBack={() => setCurrentPage('home')} />}
        {currentPage === 'gallery' && <AppGalleryPage onBack={() => setCurrentPage('home')} />}
      </main>
      <Footer />
    </div>
  );
}
