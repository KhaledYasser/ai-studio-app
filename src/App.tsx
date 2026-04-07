/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import Articles from './components/Articles';
import AppGallery from './components/AppGallery';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Articles />
        <AppGallery />
      </main>
      <Footer />
    </div>
  );
}
