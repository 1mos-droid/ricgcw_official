import React, { useState, useMemo, useEffect } from 'react';
import {
  Crown,
  Scroll,
  Search,
  Users,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import {
  CONSECRATION_SERVICE_TITLE,
  CONSECRATION_SERVICE_SUBTITLE,
  CONSECRATION_PROGRAM,
  PASTORS_ORDINATION_TITLE,
  PASTORS_ORDINATION_SUBTITLE,
  PASTOR_ORDINATION_PROGRAM,
  ProgramItem,
} from '../data/consecrationData';
import { trackPageView } from '../utils/analytics';
import { usePageTitle } from '../utils/usePageTitle';

type ActiveProgramTab = 'consecration' | 'pastors';

export const ConsecrationProgram: React.FC = () => {
  usePageTitle('Program Line Up • Consecration & Ordination Service');
  const { churchInfo } = useChurch();

  const [activeTab, setActiveTab] = useState<ActiveProgramTab>('consecration');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState<'normal' | 'large'>('normal');

  useEffect(() => {
    trackPageView('Program_Lineup_Viewer');
  }, []);

  const currentProgramList: ProgramItem[] = useMemo(() => {
    const list = activeTab === 'consecration' ? CONSECRATION_PROGRAM : PASTOR_ORDINATION_PROGRAM;
    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase();
    return list.filter((item) => {
      const matchesTitle = item.title.toLowerCase().includes(query);
      const matchesSubItems = item.subItems?.some((sub) =>
        sub.text.toLowerCase().includes(query) || sub.letter.toLowerCase().includes(query)
      );
      return matchesTitle || matchesSubItems;
    });
  }, [activeTab, searchQuery]);

  const currentTitle = activeTab === 'consecration' ? CONSECRATION_SERVICE_TITLE : PASTORS_ORDINATION_TITLE;
  const currentSubtitle = activeTab === 'consecration' ? CONSECRATION_SERVICE_SUBTITLE : PASTORS_ORDINATION_SUBTITLE;

  return (
    <div
      className={`min-h-screen bg-[#040711] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans transition-all duration-200 ${
        zoomLevel === 'large' ? 'text-lg' : 'text-base'
      }`}
    >
      {/* Top Gold Accent Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-700 via-amber-300 to-amber-700" />

      {/* Sanctuary Top Bar */}
      <header className="sticky top-0 z-40 bg-[#070c18]/95 backdrop-blur-xl border-b border-amber-500/20 shadow-xl shadow-black/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          {/* Church Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-300 font-serif font-bold text-xs tracking-wider">
                RIC
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-cinzel block">
                {churchInfo?.name || 'Rhema Inner Court Gospel Church (Worldwide)'}
              </span>
              <h1 className="text-sm sm:text-base font-bold font-serif text-slate-100 truncate">
                Official Program Line Up
              </h1>
            </div>
          </div>

          {/* Reading Comfort Zoom Toggle */}
          <button
            onClick={() => setZoomLevel(zoomLevel === 'normal' ? 'large' : 'normal')}
            aria-label="Toggle text size"
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-xs font-bold transition-all shrink-0 cursor-pointer"
            title="Toggle Text Size"
          >
            Text Size: {zoomLevel === 'normal' ? 'A+' : 'A-'}
          </button>
        </div>
      </header>

      {/* Main Program Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
        {/* Solemn Header Section */}
        <section className="relative rounded-3xl bg-gradient-to-b from-[#0c1427] via-[#070c18] to-[#040711] border-2 border-amber-500/30 p-6 sm:p-10 text-center overflow-hidden shadow-2xl shadow-amber-950/20">
          {/* Ambient Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Church Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-5 shadow-lg shadow-amber-950/40">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-cinzel">Rhema Inner Court Gospel Church (Worldwide)</span>
          </div>

          {/* Document Main Heading */}
          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 leading-tight max-w-2xl mx-auto">
            {currentTitle}
          </h2>

          <div className="relative z-10 mt-3 inline-block px-4 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-300">
            {currentSubtitle}
          </div>
        </section>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center p-1.5 rounded-2xl bg-slate-900/90 border border-amber-500/20 gap-1.5 shadow-xl">
          <button
            onClick={() => {
              setActiveTab('consecration');
              setSearchQuery('');
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'consecration'
                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Crown className="w-4 h-4 shrink-0" />
            <span>Consecration &amp; Ordination Service (33)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('pastors');
              setSearchQuery('');
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'pastors'
                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Ordination of Pastors (13)</span>
          </button>
        </div>

        {/* Real-time Search Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lineup items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Official Program Lineup List */}
        <div className="space-y-3.5">
          {currentProgramList.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 space-y-3">
              <p className="text-sm">No lineup items matching "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-amber-300 hover:bg-slate-700 cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : (
            currentProgramList.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl bg-[#0a1020]/90 border border-slate-800/80 hover:border-amber-500/30 p-4 sm:p-5 transition-all shadow-md space-y-3"
              >
                {/* Item Number and Title */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center font-serif font-bold text-amber-300 text-sm sm:text-base shrink-0">
                    {item.order}
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-sm sm:text-base md:text-lg font-serif font-bold text-slate-100 tracking-wide leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Sub-Items (Order of Procession / Order of Recession) */}
                {item.subItems && item.subItems.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 pl-1 sm:pl-3 space-y-2">
                    {item.sectionHeader && (
                      <div className="text-xs font-bold uppercase tracking-widest text-amber-400 font-cinzel flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>({item.sectionHeader})</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      {item.subItems.map((sub) => (
                        <div
                          key={sub.letter}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-serif leading-relaxed"
                        >
                          <span className="font-bold text-amber-400/90 shrink-0 w-4">
                            {sub.letter}.
                          </span>
                          <span>{sub.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        {/* Simple Sanctuary Footer */}
        <footer className="pt-8 border-t border-slate-800/80 text-center space-y-2 text-xs text-slate-500">
          <p className="text-[11px] text-slate-400">
            {churchInfo?.name || 'Rhema Inner Court Gospel Church (Worldwide)'}
          </p>
          <div className="text-[10px] text-amber-500/60 font-mono">
            Official Program Line Up
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ConsecrationProgram;
