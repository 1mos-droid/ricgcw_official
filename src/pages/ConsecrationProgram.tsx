import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronDown,
  Radio,
  Search,
  BookOpen,
  Music,
  Flame,
  Layers,
  ArrowDown,
  Sun,
  Moon,
  Sparkles,
  WifiOff,
  Clock,
  X,
} from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import {
  CONSECRATION_SERVICE_TITLE,
  CONSECRATION_SERVICE_SUBTITLE,
  CONSECRATION_PROGRAM,
  PASTORS_ORDINATION_TITLE,
  PASTORS_ORDINATION_SUBTITLE,
  PASTOR_ORDINATION_PROGRAM,
  ProgramItem,
  normalizeConsecrationProgram,
  formatTitleSentenceCase,
  getLeaderInitials,
  categorizeProgramItem,
  ItemCategory,
} from '../data/consecrationData';
import { trackPageView } from '../utils/analytics';
import { usePageTitle } from '../utils/usePageTitle';

type ActiveProgramTab = 'consecration' | 'pastors';
type TextSizeLevel = 'sm' | 'base' | 'lg';

export const ConsecrationProgram: React.FC = () => {
  usePageTitle('Official Program Line Up • Rhema Inner Court Gospel Church');

  const {
    churchInfo,
    consecrationTitle,
    consecrationSubtitle,
    consecrationProgram,
    pastorsOrdinationTitle,
    pastorsOrdinationSubtitle,
    pastorOrdinationProgram,
    currentConsecrationItemId,
    currentPastorsItemId,
  } = useChurch();

  // Active Service Tab
  const [activeTab, setActiveTab] = useState<ActiveProgramTab>('consecration');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('all');

  // Text size preference remembered on device
  const [textSize, setTextSize] = useState<TextSizeLevel>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ricgcw_program_text_size');
      if (saved === 'sm' || saved === 'base' || saved === 'lg') return saved;
    }
    return 'base';
  });

  // Dark mode preference remembered on device (defaults to ivory daylight palette)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ricgcw_program_theme') === 'dark';
    }
    return false;
  });

  // Offline network detection for Ghanaian mobile networks (MTN, Telecel, AT)
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  // Accordion expanded items state
  const [expandedItemIds, setExpandedItemIds] = useState<Set<number>>(new Set());

  // Ref for jump-to-now visibility observer
  const liveCardRef = useRef<HTMLDivElement | null>(null);
  const [isLiveCardVisible, setIsLiveCardVisible] = useState(true);

  useEffect(() => {
    trackPageView('Program_Lineup_Viewer');

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save text size to localStorage
  const handleTextSizeToggle = () => {
    const nextSize: TextSizeLevel = textSize === 'base' ? 'lg' : textSize === 'lg' ? 'sm' : 'base';
    setTextSize(nextSize);
    try {
      localStorage.setItem('ricgcw_program_text_size', nextSize);
    } catch {
      // Safe fallback
    }
  };

  // Toggle Dark / Ivory theme
  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    try {
      localStorage.setItem('ricgcw_program_theme', nextTheme ? 'dark' : 'light');
    } catch {
      // Safe fallback
    }
  };

  // Normalized canonical lists
  const consecrationList = useMemo(() => {
    const raw =
      Array.isArray(consecrationProgram) && consecrationProgram.length > 0
        ? consecrationProgram
        : CONSECRATION_PROGRAM;
    return normalizeConsecrationProgram(raw);
  }, [consecrationProgram]);

  const pastorsList = useMemo(() => {
    return Array.isArray(pastorOrdinationProgram) && pastorOrdinationProgram.length > 0
      ? pastorOrdinationProgram
      : PASTOR_ORDINATION_PROGRAM;
  }, [pastorOrdinationProgram]);

  const activeServiceList = activeTab === 'consecration' ? consecrationList : pastorsList;

  // Real-time live item ID from shared context
  const liveItemId = activeTab === 'consecration' ? currentConsecrationItemId : currentPastorsItemId;
  const liveItem = useMemo(() => {
    if (liveItemId === null || liveItemId === undefined) return null;
    return activeServiceList.find((item) => item.id === liveItemId) || null;
  }, [liveItemId, activeServiceList]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: activeServiceList.length, readings: 0, songs: 0, prayer: 0 };
    for (const item of activeServiceList) {
      const cat = categorizeProgramItem(item);
      if (cat !== 'all') {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    }
    return counts;
  }, [activeServiceList]);

  // Filtered program items
  const filteredList = useMemo(() => {
    return activeServiceList.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const itemCat = categorizeProgramItem(item);
        if (itemCat !== selectedCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesLeader = item.leader?.toLowerCase().includes(q);
        const matchesSubItems = item.subItems?.some(
          (sub) => sub.text.toLowerCase().includes(q) || sub.letter.toLowerCase().includes(q)
        );
        return matchesTitle || matchesLeader || matchesSubItems;
      }

      return true;
    });
  }, [activeServiceList, selectedCategory, searchQuery]);

  // Expand / collapse toggle
  const toggleItemExpansion = (itemId: number) => {
    setExpandedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  // Scroll to active item with smooth easing
  const scrollToLiveItem = () => {
    if (liveCardRef.current) {
      liveCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Observer to show/hide the floating "Jump to now" button
  useEffect(() => {
    if (!liveCardRef.current) {
      setIsLiveCardVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLiveCardVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(liveCardRef.current);
    return () => observer.disconnect();
  }, [liveItemId, activeTab]);

  const currentTitle =
    activeTab === 'consecration'
      ? consecrationTitle || CONSECRATION_SERVICE_TITLE
      : pastorsOrdinationTitle || PASTORS_ORDINATION_TITLE;

  const currentSubtitle =
    activeTab === 'consecration'
      ? consecrationSubtitle || CONSECRATION_SERVICE_SUBTITLE
      : pastorsOrdinationSubtitle || PASTORS_ORDINATION_SUBTITLE;

  // Text size classes
  const textSizeClass =
    textSize === 'sm'
      ? 'text-xs sm:text-sm'
      : textSize === 'lg'
      ? 'text-base sm:text-lg'
      : 'text-sm sm:text-base';

  const titleSizeClass =
    textSize === 'sm'
      ? 'text-sm sm:text-base'
      : textSize === 'lg'
      ? 'text-lg sm:text-xl'
      : 'text-base sm:text-lg';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-blue-600 selection:text-white ${
        isDark ? 'bg-[#0A101D] text-slate-100' : 'bg-[#FAF8F3] text-[#0A1128]'
      }`}
    >
      {/* 1. Compact Sticky Mobile Header (No bulky hero card) */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
          isDark
            ? 'bg-[#0A101D]/90 border-slate-800/80 shadow-md shadow-black/40'
            : 'bg-[#FAF8F3]/90 border-[#E8E2D5] shadow-sm'
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Church Circular Logo & Event Header */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={IMAGES.logo}
              alt="Rhema Inner Court Emblem"
              className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm ring-2 ring-blue-900/10 dark:ring-blue-400/20"
            />
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 truncate block">
                {churchInfo?.name || 'Rhema Inner Court Gospel Church (Worldwide)'}
              </span>
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm font-serif font-bold text-slate-900 dark:text-slate-100 truncate">
                  {currentTitle}
                </h1>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono hidden xs:inline">
                  • {currentSubtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls: Live Beacon, Text Stepper, Theme Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Live Indicator Pill */}
            {liveItem && (
              <button
                type="button"
                onClick={scrollToLiveItem}
                className="hidden xs:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold shadow-sm shadow-red-600/30 animate-pulse cursor-pointer"
                title={`Jump to live item #${liveItem.order}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Now #{liveItem.order}</span>
              </button>
            )}

            {/* Offline indicator if disconnected */}
            {isOffline && (
              <span
                className="p-2 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs"
                title="Offline mode: viewing cached liturgy program"
              >
                <WifiOff className="w-4 h-4" />
              </span>
            )}

            {/* Accessible Text-Size Stepper */}
            <button
              type="button"
              onClick={handleTextSizeToggle}
              aria-label="Toggle text size"
              className={`min-h-[44px] min-w-[44px] px-2.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-blue-400'
                  : 'bg-white border-[#E2DBD0] text-[#0D2C54] hover:border-blue-700 shadow-sm'
              }`}
              title="Adjust text size (Compact / Standard / Comfort)"
            >
              <span>Text Size: {textSize === 'lg' ? 'A-' : 'A+'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`min-h-[44px] min-w-[44px] p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-slate-900/80 border-slate-700 text-amber-300 hover:border-amber-400'
                  : 'bg-white border-[#E2DBD0] text-slate-700 hover:text-blue-900 shadow-sm'
              }`}
              title={isDark ? 'Switch to daylight ivory theme' : 'Switch to low-light dark theme'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-24 space-y-4">
        {/* 2. Segmented Control for Service Tabs (Duolingo/Apple tactile spring) */}
        <div
          className={`p-1 rounded-2xl border flex items-center shadow-inner ${
            isDark ? 'bg-[#0E1729] border-slate-800' : 'bg-[#EFE9DD] border-[#E2DBD0]'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab('consecration');
              setSearchQuery('');
            }}
            className={`relative flex-1 min-h-[44px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.98] ${
              activeTab === 'consecration'
                ? isDark
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#0D2C54] text-white shadow-md'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Consecration &amp; Ordination Service ({consecrationList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('pastors');
              setSearchQuery('');
            }}
            className={`relative flex-1 min-h-[44px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.98] ${
              activeTab === 'pastors'
                ? isDark
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#0D2C54] text-white shadow-md'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Ordination of Pastors ({pastorsList.length})</span>
          </button>
        </div>

        {/* 3. Filter Chips & Real-time Search */}
        <div className="space-y-2.5">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search lineup items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-2xl border text-xs sm:text-sm transition-all shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                isDark
                  ? 'bg-[#111A2E] border-slate-800 text-slate-100 placeholder-slate-500'
                  : 'bg-white border-[#E2DBD0] text-slate-900 placeholder-slate-400'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Chips: All, Readings, Songs, Prayer */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {(
              [
                { id: 'all', label: 'All', icon: Layers, count: categoryCounts.all },
                { id: 'readings', label: 'Readings', icon: BookOpen, count: categoryCounts.readings },
                { id: 'songs', label: 'Songs', icon: Music, count: categoryCounts.songs },
                { id: 'prayer', label: 'Prayer', icon: Flame, count: categoryCounts.prayer },
              ] as const
            ).map((chip) => {
              const Icon = chip.icon;
              const isSelected = selectedCategory === chip.id;

              return (
                <button
                  type="button"
                  key={chip.id}
                  onClick={() => setSelectedCategory(chip.id)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer select-none active:scale-95 ${
                    isSelected
                      ? isDark
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-[#0D2C54] text-white shadow-sm'
                      : isDark
                      ? 'bg-[#111A2E] text-slate-300 border border-slate-800 hover:border-slate-700'
                      : 'bg-white text-slate-700 border border-[#E2DBD0] hover:bg-[#F3EFE6]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{chip.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : isDark
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Status Banner */}
        <div
          className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
            liveItem
              ? isDark
                ? 'bg-red-950/30 border-red-900/50 text-red-300'
                : 'bg-red-50 border-red-200 text-red-900'
              : isDark
              ? 'bg-slate-900/60 border-slate-800 text-slate-400'
              : 'bg-white/80 border-[#E8E2D5] text-slate-600'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {liveItem ? (
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping shrink-0" />
            ) : (
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            )}
            <p className="truncate">
              {liveItem ? (
                <span>
                  <strong className="font-bold text-red-600 dark:text-red-400">Live Service:</strong> Item #{liveItem.order} is in progress
                </span>
              ) : (
                <span>Service Liturgy • Follow along as ministers officiate</span>
              )}
            </p>
          </div>

          {liveItem && (
            <button
              type="button"
              onClick={scrollToLiveItem}
              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline shrink-0 cursor-pointer"
            >
              Scroll to now
            </button>
          )}
        </div>

        {/* 4. Vertical Timeline on a Thin Spine */}
        <div className="relative pt-2">
          {/* Continuous vertical timeline spine */}
          <div
            className={`absolute left-[19px] top-6 bottom-6 w-0.5 pointer-events-none ${
              isDark ? 'bg-slate-800' : 'bg-[#E5DFD3]'
            }`}
          />

          {filteredList.length === 0 ? (
            /* Empty Search / Filter State */
            <div
              className={`p-10 text-center rounded-3xl border space-y-3 ${
                isDark ? 'bg-[#111A2E] border-slate-800' : 'bg-white border-[#E2DBD0]'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base">No items found</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                No liturgy items match your current filter or search query "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all shadow-md"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredList.map((item) => {
                const isLive = liveItem?.id === item.id;
                const isCompleted = liveItem ? item.order < liveItem.order : false;
                const isNext = liveItem ? item.order === liveItem.order + 1 : false;

                // Sub-items are expanded by default on the live item, or when toggled
                const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
                const isExpanded = isLive || expandedItemIds.has(item.id);

                const leaderInitials = item.leader ? getLeaderInitials(item.leader) : '';
                const formattedTitle = formatTitleSentenceCase(item.title);

                return (
                  <article
                    key={item.id}
                    id={`item-node-${item.id}`}
                    ref={isLive ? liveCardRef : undefined}
                    className={`relative pl-12 transition-all ${
                      isCompleted ? 'opacity-80 hover:opacity-100' : ''
                    }`}
                  >
                    {/* Spine Node: Numbered Dot, Checkmark, or Pulsing Red Beacon */}
                    <div
                      className={`absolute left-0 top-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all z-10 select-none ${
                        isLive
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 ring-4 ring-red-500/20 animate-pulse'
                          : isCompleted
                          ? isDark
                            ? 'bg-emerald-950 border border-emerald-600/40 text-emerald-300'
                            : 'bg-emerald-50 border border-emerald-600/30 text-emerald-700'
                          : isDark
                          ? 'bg-[#111A2E] border border-slate-700 text-slate-300'
                          : 'bg-white border border-[#DDD5C7] text-[#0D2C54] shadow-sm'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : isLive ? (
                        <Radio className="w-4 h-4 text-white" />
                      ) : (
                        <span>{item.order}</span>
                      )}
                    </div>

                    {/* Timeline Item Card */}
                    <div
                      onClick={() => hasSubItems && toggleItemExpansion(item.id)}
                      className={`rounded-2xl border transition-all p-4 sm:p-5 ${
                        hasSubItems ? 'cursor-pointer active:scale-[0.99]' : ''
                      } ${
                        isLive
                          ? isDark
                            ? 'bg-[#16233F] border-2 border-blue-500 shadow-xl shadow-blue-950/50'
                            : 'bg-white border-2 border-[#0D2C54] shadow-xl shadow-blue-950/10'
                          : isDark
                          ? 'bg-[#111A2E] border-slate-800/90 hover:border-slate-700'
                          : 'bg-white border-[#E8E2D5] hover:border-[#D5CDBD] shadow-xs'
                      }`}
                    >
                      {/* Top Meta Line: Badges & Status */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Live "Now" Accent Badge */}
                          {isLive && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              <span>Now</span>
                            </span>
                          )}

                          {/* "Up next" Badge */}
                          {isNext && (
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                isDark
                                  ? 'bg-blue-950/70 border-blue-800 text-blue-300'
                                  : 'bg-blue-50 border-blue-200 text-blue-700'
                              }`}
                            >
                              Up next
                            </span>
                          )}

                          {/* Section Header (e.g. Order of Procession / Order of Recession) */}
                          {item.sectionHeader && (
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                                isDark ? 'text-blue-400' : 'text-blue-800'
                              }`}
                            >
                              <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                              <span>{item.sectionHeader}</span>
                            </span>
                          )}
                        </div>

                        {/* Expandable sub-items indicator */}
                        {hasSubItems && (
                          <div className="flex items-center gap-1 text-[11px] font-sans text-slate-400 dark:text-slate-500">
                            <span>{item.subItems?.length} steps</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                              }`}
                            />
                          </div>
                        )}
                      </div>

                      {/* Main Title (Serif, Sentence Case) */}
                      <h3
                        className={`font-serif font-bold tracking-tight leading-snug ${titleSizeClass} ${
                          isLive
                            ? isDark
                              ? 'text-white'
                              : 'text-[#0D2C54]'
                            : isCompleted
                            ? 'text-slate-500 dark:text-slate-400'
                            : isDark
                            ? 'text-slate-100'
                            : 'text-slate-900'
                        }`}
                      >
                        {formattedTitle}
                      </h3>

                      {/* 5. Leader Initials Avatar & Name (No repeated 'LED BY:') */}
                      {item.leader && (
                        <div className="mt-3 flex items-center gap-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                          {/* Initials Avatar */}
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-sans font-bold text-xs shrink-0 select-none shadow-xs ${
                              isLive
                                ? 'bg-red-600 text-white'
                                : isDark
                                ? 'bg-blue-900/60 text-blue-200 border border-blue-700/50'
                                : 'bg-[#E9EEF5] text-[#0D2C54] border border-[#CCD7E6]'
                            }`}
                          >
                            {leaderInitials}
                          </div>

                          <div className="min-w-0">
                            <span className="text-xs font-sans font-semibold text-slate-700 dark:text-slate-300 truncate block">
                              {item.leader}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Sub-Items (Cleanly collapsible for mobile screen economy, fully rendered for accessibility) */}
                      {hasSubItems && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded
                              ? 'max-h-[2000px] opacity-100 mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800'
                              : 'max-h-0 opacity-0 pointer-events-none'
                          }`}
                        >
                          <div className="space-y-2">
                            {item.subItems?.map((sub) => (
                              <div
                                key={sub.letter}
                                className={`flex items-start gap-2.5 ${textSizeClass} leading-relaxed`}
                              >
                                <span
                                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shrink-0 select-none ${
                                    isDark
                                      ? 'bg-slate-800 text-blue-300'
                                      : 'bg-[#F2ECE1] text-[#0D2C54]'
                                  }`}
                                >
                                  {sub.letter}.
                                </span>
                                <span
                                  className={
                                    isDark ? 'text-slate-300' : 'text-slate-700 font-serif'
                                  }
                                >
                                  {sub.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Floating "Jump to now" Button */}
        <AnimatePresence>
          {liveItem && !isLiveCardVisible && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="fixed bottom-6 right-4 sm:right-6 z-50"
            >
              <button
                type="button"
                onClick={scrollToLiveItem}
                className="min-h-[48px] px-4 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-xl shadow-red-600/40 flex items-center gap-2 cursor-pointer active:scale-95 transition-all select-none"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Jump to Now · #{liveItem.order}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fine Stationery Footer Attribution */}
        <footer
          className={`pt-12 pb-6 border-t text-center space-y-2 text-xs transition-colors ${
            isDark ? 'border-slate-800/80 text-slate-500' : 'border-[#E8E2D5] text-slate-500'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <img
              src={IMAGES.logo}
              alt="RICGCW"
              className="w-5 h-5 rounded-full object-cover opacity-70"
            />
            <p className="text-[11px] font-medium tracking-wide">
              {churchInfo?.name || 'Rhema Inner Court Gospel Church (Worldwide)'}
            </p>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {currentTitle} • {currentSubtitle}
          </div>
          <p className="text-[11px] pt-1">
            Built by{' '}
            <a
              href="https://damise-1free.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 dark:text-blue-400 hover:underline font-semibold"
            >
              Kumesi Moses Mawulolo
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default ConsecrationProgram;
