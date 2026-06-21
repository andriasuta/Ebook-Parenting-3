import { useState, useEffect } from 'react';
import { ebookData } from './data/ebook';
import { Menu, X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(-1); // -1 for Cover
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Scroll to top when changing chapters
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  }, [currentChapterIndex]);

  const progress =
    currentChapterIndex === -1
      ? 0
      : ((currentChapterIndex + 1) / ebookData.chapters.length) * 100;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FCFBF9] text-[#2C2C29] font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-20 bg-[#FCFBF9]/90 backdrop-blur-md border-b border-black/5 flex items-center justify-between p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-700" />
          <span className="font-serif font-semibold text-sm truncate max-w-[200px]">
            {ebookData.title}
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-1 hover:bg-black/5 rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Table of Contents */}
      <aside
        className={`fixed md:sticky top-0 left-0 w-72 lg:w-80 h-[100dvh] bg-[#F7F6F3] border-r border-black/5 z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 md:p-8 flex items-center justify-between">
          <h2 className="font-sans text-xs uppercase tracking-widest font-semibold text-black/50">
            Daftar Isi Ebook
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 text-black/50 hover:bg-black/5 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-8 space-y-1 scrollbar-hide">
          <button
            onClick={() => setCurrentChapterIndex(-1)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
              currentChapterIndex === -1
                ? 'bg-amber-100/60 text-amber-900 font-medium shadow-sm'
                : 'text-black/70 hover:bg-black/5'
            }`}
          >
            Sampul Depan
          </button>
          
          <div className="pt-6 pb-2 px-4 text-xs font-serif italic text-black/40">
            Bab Pembahasan Utama
          </div>

          {ebookData.chapters.map((chapter, idx) => (
            <button
              key={chapter.id}
              onClick={() => setCurrentChapterIndex(idx)}
              className={`w-full text-left px-4 py-3 text-sm leading-snug rounded-xl transition-all duration-200 ${
                currentChapterIndex === idx
                  ? 'bg-amber-100/60 text-amber-900 font-medium shadow-sm'
                  : 'text-black/70 hover:bg-black/5'
              }`}
            >
              {chapter.title}
            </button>
          ))}
        </nav>

        {/* Progress Bar (Bottom of Sidebar) */}
        <div className="p-6 border-t border-black/5 bg-[#F7F6F3]">
          <div className="text-[10px] uppercase tracking-widest text-black/40 mb-3 flex justify-between">
            <span>Progress Membaca</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-12 lg:px-24 py-10 md:py-20 flex flex-col min-h-[100dvh]">
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {currentChapterIndex === -1 ? (
              <motion.div
                key="cover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center space-y-10 py-10"
              >
                <div className="px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/50 text-amber-800 text-xs font-medium tracking-wide shadow-sm inline-block mb-2">
                  Edisi Premium Diperluas
                </div>
                
                <div className="space-y-6">
                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
                    {ebookData.title}
                  </h1>
                  <p className="font-sans text-xl md:text-2xl text-slate-600 font-light max-w-xl mx-auto leading-relaxed">
                    {ebookData.subtitle}
                  </p>
                </div>

                {/* Cover Image Simulation */}
                <div className="w-full max-w-xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative my-8 ring-1 ring-black/5 group">
                  <img 
                    src={ebookData.coverImage} 
                    alt="Cover Ebook"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-6 md:bottom-8 left-8 right-8 text-left">
                    <p className="text-white/90 text-sm font-medium tracking-wide mb-1 uppercase text-shadow-sm">Masterclass Komunikasi</p>
                    <p className="text-white text-lg font-serif italic text-shadow-sm">Untuk Orang Tua Kekinian</p>
                  </div>
                </div>

                <div className="w-16 h-px bg-slate-300 my-6" />

                <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-loose px-4">
                  {ebookData.description}
                </p>

                <p className="text-xs text-slate-400 max-w-sm mx-auto italic">
                  {ebookData.concept_note}
                </p>

                <div className="pt-8">
                  <button
                    onClick={() => setCurrentChapterIndex(0)}
                    className="inline-flex items-center justify-center w-full md:w-auto gap-3 px-8 py-4 bg-[#2C2C29] hover:bg-black text-[#FCFBF9] rounded-full text-base font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Mulai Membaca
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.article
                key={`chapter-${currentChapterIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-prose mx-auto w-full pb-10"
              >
                {/* Chapter Heading & Image */}
                <header className="mb-12 md:mb-16">
                  <span className="font-sans text-amber-700 text-xs md:text-sm tracking-[0.2em] font-semibold mb-4 block">
                    {currentChapterIndex === 0 ? "PENDAHULUAN" : `BAB ${currentChapterIndex}`}
                  </span>
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-5xl font-bold leading-[1.15] text-slate-900 mb-10 text-balance">
                    {ebookData.chapters[currentChapterIndex].title}
                  </h1>
                  
                  {ebookData.chapters[currentChapterIndex].image && (
                    <div className="w-full aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden mb-12 shadow-lg ring-1 ring-black/5 bg-slate-100">
                      <img 
                        src={ebookData.chapters[currentChapterIndex].image}
                        alt={`Ilustrasi ${ebookData.chapters[currentChapterIndex].title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </header>

                {/* Chapter Content Markdown Rendering */}
                <div className="prose prose-lg md:prose-xl prose-slate prose-headings:font-serif prose-h2:text-3xl prose-h2:font-semibold prose-h3:text-2xl prose-h3:font-medium prose-p:leading-[1.8] prose-p:text-slate-700 prose-a:text-amber-700 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:font-serif prose-blockquote:text-slate-800/90 prose-blockquote:not-italic prose-li:text-slate-700 max-w-none font-[var(--font-body)] marker:text-amber-500">
                  <ReactMarkdown>
                    {ebookData.chapters[currentChapterIndex].content}
                  </ReactMarkdown>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        {currentChapterIndex !== -1 && (
          <div className="mt-20 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setCurrentChapterIndex(prev => prev - 1)}
              className="group flex-1 flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-black/5 transition-all w-full md:w-1/2"
            >
              <div className="bg-[#F7F6F3] group-hover:bg-white group-hover:shadow-sm p-3 rounded-full border border-black/5 transition-all">
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </div>
              <div className="text-left flex flex-col overflow-hidden">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Sebelumnya</span>
                <span className="text-sm md:text-base font-semibold text-slate-700 truncate font-serif">
                  {currentChapterIndex === 0 ? "Kembali ke Sampul" : ebookData.chapters[currentChapterIndex - 1].title}
                </span>
              </div>
            </button>

            {currentChapterIndex < ebookData.chapters.length - 1 ? (
              <button
                onClick={() => setCurrentChapterIndex(prev => prev + 1)}
                className="group flex-1 flex items-center justify-end gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-black/5 transition-all w-full md:w-1/2 text-right"
              >
                <div className="flex flex-col items-end overflow-hidden">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Selanjutnya</span>
                  <span className="text-sm md:text-base font-semibold text-slate-700 truncate font-serif">
                    {ebookData.chapters[currentChapterIndex + 1].title}
                  </span>
                </div>
                <div className="bg-[#F7F6F3] group-hover:bg-white group-hover:shadow-sm p-3 rounded-full border border-black/5 transition-all">
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </div>
              </button>
            ) : (
              <div className="flex-1 flex justify-end p-4 w-full md:w-1/2">
                <div className="flex flex-col items-end opacity-50">
                   <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Tamat</span>
                   <span className="text-sm md:text-base font-semibold text-slate-700 font-serif">Akhir Ebook</span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

