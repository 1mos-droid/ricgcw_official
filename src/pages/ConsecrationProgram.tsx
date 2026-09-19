import { useState, useMemo, useEffect } from 'react';
import {
  Crown,
  Scroll,
  BookOpen,
  Sparkles,
  Shield,
  Award,
  Users,
  UserCheck,
  Heart,
  Music,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Printer,
  QrCode,
  Share2,
  Gift,
  Flame,
  HelpCircle,
  Clock,
  Compass,
  ArrowRight,
  ExternalLink,
  SlidersHorizontal,
  Bookmark,
  ChevronRight,
  Cross,
} from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import {
  CONSECRATION_SERVICE_METADATA,
  CONSECRATION_PROGRAM,
  PASTOR_ORDINATION_PROGRAM,
  SACRED_SYMBOLS,
  HYMNS_AND_LITURGY,
  ProgramItem,
} from '../data/consecrationData';
import { QRCodeHubModal } from '../components/consecration/QRCodeHubModal';
import { QRCanvaCard } from '../components/consecration/QRCanvaCard';
import { ScriptureModal } from '../components/consecration/ScriptureModal';
import { HymnViewerModal } from '../components/consecration/HymnViewerModal';
import { GivingModal } from '../components/GivingModal';
import { PrayerModal } from '../components/PrayerModal';
import { trackPageView, trackEvent } from '../utils/analytics';
import { usePageTitle } from '../utils/usePageTitle';

type ActiveTab = 'consecration' | 'pastors' | 'canva' | 'symbols' | 'hymns';

const CATEGORY_MAP: Record<string, { label: string; color: string; border: string; bg: string }> = {
  procession: { label: 'Procession', color: 'text-sky-300', border: 'border-sky-500/30', bg: 'bg-sky-500/10' },
  liturgy: { label: 'Liturgy & Prayer', color: 'text-purple-300', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
  word: { label: 'Sacred Word & Song', color: 'text-emerald-300', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
  vows: { label: 'Sacred Vows', color: 'text-rose-300', border: 'border-rose-500/30', bg: 'bg-rose-500/10' },
  anointing: { label: 'Anointing & Consecration', color: 'text-amber-300', border: 'border-amber-500/40', bg: 'bg-amber-500/20' },
  vestments: { label: 'Vestments & Presentation', color: 'text-yellow-200', border: 'border-yellow-400/30', bg: 'bg-yellow-400/10' },
  giving: { label: 'Sacrificial Offering', color: 'text-green-300', border: 'border-green-500/30', bg: 'bg-green-500/10' },
  addresses: { label: 'Apostolic Addresses', color: 'text-cyan-300', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
  recession: { label: 'Recession', color: 'text-indigo-300', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' },
};

export const ConsecrationProgram = () => {
  usePageTitle('Solemn Consecration & Ordination Service Program Lineup');
  const { churchInfo } = useChurch();

  // Tab State
  const [activeTab, setActiveTab] = useState<ActiveTab>('consecration');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Live Service Tracker
  const [currentActiveStep, setCurrentActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Expanded items
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({
    2: true, // Auto expand Order of Procession
    30: true, // Auto expand Order of Recession
  });

  // Modals
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [isHymnModalOpen, setIsHymnModalOpen] = useState(false);
  const [scriptureModalData, setScriptureModalData] = useState<{
    isOpen: boolean;
    ref: string;
    title?: string;
    text: string;
  }>({
    isOpen: false,
    ref: '',
    title: '',
    text: '',
  });

  // Text zoom state
  const [zoomLevel, setZoomLevel] = useState<'normal' | 'large'>('normal');

  useEffect(() => {
    trackPageView('Consecration_Program_Lineup');
  }, []);

  // Filtered Programs
  const activeProgramList = useMemo(() => {
    const list = activeTab === 'consecration' ? CONSECRATION_PROGRAM : PASTOR_ORDINATION_PROGRAM;
    return list.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.scriptureRef && item.scriptureRef.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [activeTab, searchQuery, selectedCategory]);

  const toggleItemExpansion = (id: number) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleCompleted = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkCurrentStep = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentActiveStep(id);
    trackEvent('interaction', 'mark_active_step', `step_${id}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const openScripture = (ref: string, text: string, title?: string) => {
    setScriptureModalData({
      isOpen: true,
      ref,
      title,
      text,
    });
  };

  return (
    <div
      className={`min-h-screen bg-[#040711] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans transition-all duration-200 ${
        zoomLevel === 'large' ? 'text-lg' : 'text-base'
      }`}
    >
      {/* Printable CSS overrides */}
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .print-black-text {
            color: #000000 !important;
            background: #ffffff !important;
            border-color: #cccccc !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* Top Royal Gold Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-700 via-amber-300 to-amber-700 no-print" />

      {/* Floating Header / Navigation Bar for Secret Page */}
      <header className="sticky top-0 z-40 bg-[#070c18]/90 backdrop-blur-xl border-b border-amber-500/20 shadow-xl shadow-black/40 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          {/* Logo & Church Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-300 font-serif font-bold text-sm">
                RIC
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-cinzel">
                  RICGCW • Digital Liturgy
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 uppercase font-semibold">
                  Official Lineup
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold font-serif text-slate-100 truncate max-w-xs sm:max-w-md">
                Consecration & Ordination Service
              </h1>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Font Size Toggle */}
            <button
              onClick={() => setZoomLevel(zoomLevel === 'normal' ? 'large' : 'normal')}
              aria-label="Toggle text size"
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-xs font-bold transition-all"
              title="Toggle Large Text"
            >
              {zoomLevel === 'normal' ? 'A+' : 'A-'}
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              aria-label="Print Program"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print</span>
            </button>

            {/* Give Offering Quick Trigger */}
            <button
              onClick={() => setIsGivingModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-950 cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>Give Offering</span>
            </button>

            {/* QR Code / Share Hub Button */}
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/30 cursor-pointer animate-pulse"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden xs:inline">QR & Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        {/* Majestic Royal Sanctuary Hero Header */}
        <section className="relative rounded-3xl bg-gradient-to-b from-[#0c1427] via-[#070c18] to-[#040711] border-2 border-amber-500/30 p-6 sm:p-10 md:p-14 text-center overflow-hidden shadow-2xl shadow-amber-950/20 print-black-text">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none no-print" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none no-print" />
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none no-print" />

          {/* Ornate Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 shadow-lg shadow-amber-950/40">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="font-cinzel">Rhema Inner Court Gospel Church (Worldwide)</span>
          </div>

          {/* Main Title */}
          <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 leading-tight max-w-4xl mx-auto drop-shadow-md">
            Solemn Episcopal Consecration & Sacred Ordination Service
          </h1>

          {/* Royal Slogan */}
          <p className="relative z-10 text-sm sm:text-base md:text-lg text-amber-200/90 font-serif italic mt-4 max-w-2xl mx-auto">
            "Inner Court: Where Sacrifices Are Made Unto Heaven!"
          </p>

          {/* Scriptural Anchor Box */}
          <div className="relative z-10 mt-8 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-xs sm:text-sm leading-relaxed text-slate-300 font-serif shadow-inner">
            <p className="text-amber-100 font-medium">
              “{CONSECRATION_SERVICE_METADATA.scripturalAnchor.verse}”
            </p>
            <div className="mt-2 text-amber-400 font-bold uppercase tracking-widest text-[11px]">
              — {CONSECRATION_SERVICE_METADATA.scripturalAnchor.ref}
            </div>
          </div>

          {/* Quick Service Badges */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Theme: <strong>Divine Manifestation (2026)</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Office: <strong>Episcopal & Pastoral Ordination</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Order: <strong>Apostolic Succession</strong></span>
            </div>
          </div>

          {/* Organizers & Attendees Quick Access Bar */}
          <div className="relative z-10 mt-8 pt-6 border-t border-amber-500/20 flex flex-wrap items-center justify-center gap-3 no-print">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Generate / Download QR Code for Event</span>
            </button>
            <button
              onClick={() => setIsHymnModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all cursor-pointer"
            >
              <Music className="w-4 h-4" />
              <span>Recessional Hymnal Lyrics</span>
            </button>
            <button
              onClick={() => setIsPrayerModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Send Prayer Request</span>
            </button>
          </div>
        </section>

        {/* Tab Selector Navigation */}
        <div className="no-print">
          <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-slate-900/90 border border-amber-500/20 gap-1.5 shadow-xl shadow-black/30">
            <button
              onClick={() => setActiveTab('consecration')}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'consecration'
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Crown className="w-4 h-4 shrink-0" />
              <span>Consecration Service (33 Orders)</span>
            </button>

            <button
              onClick={() => setActiveTab('pastors')}
              className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'pastors'
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Ordination of Pastors (13 Orders)</span>
            </button>

            <button
              onClick={() => setActiveTab('canva')}
              className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'canva'
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <QrCode className="w-4 h-4 shrink-0" />
              <span>Canva Poster & QR Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('symbols')}
              className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'symbols'
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Sacred Regalia & Symbols</span>
            </button>

            <button
              onClick={() => setActiveTab('hymns')}
              className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'hymns'
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Liturgical Scriptures & Hymn</span>
            </button>
          </div>
        </div>

        {/* Tab 1 & 2: PROGRAM LINEUP LIST */}
        {(activeTab === 'consecration' || activeTab === 'pastors') && (
          <div className="space-y-6">
            {/* Search, Filter & Live Progress Indicator */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 no-print shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search program steps, scriptures, prayers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Progress Stats */}
                <div className="flex items-center gap-4 text-xs text-slate-300 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <span>
                      Active: <strong>{currentActiveStep ? `Step #${currentActiveStep}` : 'Not selected'}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      Completed: <strong>{completedSteps.length}</strong> /{' '}
                      {activeTab === 'consecration' ? 33 : 13}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Filter Badges */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  All Steps ({activeTab === 'consecration' ? 33 : 13})
                </button>
                {Object.entries(CATEGORY_MAP).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${
                      selectedCategory === key
                        ? `${cat.bg} ${cat.color} ${cat.border} font-bold shadow-md`
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Steps */}
            <div className="space-y-4">
              {activeProgramList.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 space-y-3">
                  <HelpCircle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="text-sm">No program steps found matching your search term.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-amber-300 hover:bg-slate-700"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              ) : (
                activeProgramList.map((item) => {
                  const isExpanded = expandedItems[item.id] || false;
                  const isCompleted = completedSteps.includes(item.id);
                  const isCurrent = currentActiveStep === item.id;
                  const catConfig = CATEGORY_MAP[item.category] || {
                    label: item.category,
                    color: 'text-slate-300',
                    border: 'border-slate-700',
                    bg: 'bg-slate-800',
                  };

                  return (
                    <article
                      key={item.id}
                      id={`step-${item.id}`}
                      className={`relative rounded-2xl transition-all duration-300 overflow-hidden border ${
                        isCurrent
                          ? 'bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border-2 border-amber-400 shadow-xl shadow-amber-500/20 ring-2 ring-amber-500/30'
                          : isCompleted
                          ? 'bg-slate-950/60 border-slate-800/80 opacity-75'
                          : 'bg-[#0a1020]/90 border-slate-800 hover:border-amber-500/40 shadow-lg'
                      } print-black-text`}
                    >
                      {/* Active Step Indicator Pill */}
                      {isCurrent && (
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-[11px] px-4 py-1 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 uppercase tracking-wider">
                            <Flame className="w-3.5 h-3.5 fill-slate-950" />
                            <span>CURRENTLY IN SESSION / ACTIVE STEP</span>
                          </div>
                          <span className="text-[10px] font-sans">Tap to update status</span>
                        </div>
                      )}

                      {/* Card Header & Summary */}
                      <div
                        onClick={() => toggleItemExpansion(item.id)}
                        className="p-5 sm:p-6 cursor-pointer flex items-start gap-4"
                      >
                        {/* Order Number Box */}
                        <div className="shrink-0 flex flex-col items-center">
                          <div
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-serif font-bold text-base sm:text-lg border shadow-md transition-all ${
                              isCurrent
                                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/40'
                                : isCompleted
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                                : item.isMilestone
                                ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-amber-300 border-amber-500/40'
                                : 'bg-slate-900 text-slate-200 border-slate-700'
                            }`}
                          >
                            {item.order}
                          </div>
                          {item.isMilestone && (
                            <span className="mt-1 text-[9px] font-bold text-amber-400 uppercase tracking-tighter">
                              Key Rite
                            </span>
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Category Badge */}
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${catConfig.bg} ${catConfig.color} ${catConfig.border}`}
                            >
                              {catConfig.label}
                            </span>

                            {item.scriptureRef && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {item.scriptureRef}
                              </span>
                            )}

                            {item.hymnTitle && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 flex items-center gap-1">
                                <Music className="w-3 h-3" />
                                {item.hymnTitle}
                              </span>
                            )}
                          </div>

                          <h2 className="text-base sm:text-lg md:text-xl font-serif font-bold text-slate-100 tracking-wide leading-snug group-hover:text-amber-300">
                            {item.title}
                          </h2>

                          {item.subtitle && (
                            <p className="text-xs sm:text-sm text-amber-300/80 font-serif italic">
                              {item.subtitle}
                            </p>
                          )}

                          {item.description && (
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Expand / Controls */}
                        <div className="shrink-0 flex items-center gap-1.5 no-print">
                          {/* Checkmark Button */}
                          <button
                            onClick={(e) => handleToggleCompleted(item.id, e)}
                            title={isCompleted ? 'Mark uncompleted' : 'Mark as done'}
                            className={`p-2 rounded-xl border transition-all ${
                              isCompleted
                                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-emerald-400 hover:border-emerald-500/40'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>

                          {/* Expansion Toggle */}
                          <div className="p-2 text-slate-400 hover:text-white">
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-amber-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details Section */}
                      {isExpanded && (
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
                          {/* Ceremonial Notes */}
                          {item.ceremonialNote && (
                            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-amber-300">
                                  Liturgical Protocol:
                                </span>{' '}
                                {item.ceremonialNote}
                              </div>
                            </div>
                          )}

                          {/* Action Required for Congregation */}
                          {item.actionRequired && (
                            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2">
                              <Users className="w-4 h-4 text-purple-400 shrink-0" />
                              <span className="font-semibold text-purple-300">Assembly Action:</span>
                              <span>{item.actionRequired}</span>
                            </div>
                          )}

                          {/* ORDER OF PROCESSION / RECESSION DETAILED MEMBERS */}
                          {item.orderList && item.orderList.length > 0 && (
                            <div className="space-y-3 pt-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-cinzel">
                                  {item.order === 2 ? 'Ceremonial Procession Order' : 'Royal Recessional Guard Order'}
                                </span>
                                <div className="h-px flex-1 bg-amber-500/20" />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {item.orderList.map((member) => (
                                  <div
                                    key={member.id}
                                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all space-y-1.5"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className="w-6 h-6 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center font-mono">
                                        {member.letter}
                                      </span>
                                      <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-serif">
                                        {member.role}
                                      </h3>
                                    </div>

                                    <p className="text-xs text-slate-300 pl-8 leading-relaxed">
                                      {member.description}
                                    </p>

                                    {member.vesture && (
                                      <div className="pl-8 pt-1 text-[11px] text-amber-300/80 font-medium">
                                        <span className="text-slate-400">Vesture:</span> {member.vesture}
                                      </div>
                                    )}

                                    {member.symbolism && (
                                      <div className="pl-8 text-[10px] text-slate-400 italic">
                                        <span className="text-amber-400 font-semibold">Symbolism:</span>{' '}
                                        {member.symbolism}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Scripture Quick Action Button */}
                          {item.scriptureText && item.scriptureRef && (
                            <div className="pt-2 flex flex-wrap items-center gap-3 no-print">
                              <button
                                onClick={() =>
                                  openScripture(
                                    item.scriptureRef!,
                                    item.scriptureText!,
                                    item.subtitle
                                  )
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-950 cursor-pointer"
                              >
                                <BookOpen className="w-4 h-4" />
                                <span>Read Scripture ({item.scriptureRef})</span>
                              </button>
                            </div>
                          )}

                          {/* Hymn Quick Action Button */}
                          {item.hymnTitle && (
                            <div className="pt-2 flex flex-wrap items-center gap-3 no-print">
                              <button
                                onClick={() => setIsHymnModalOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-950 cursor-pointer"
                              >
                                <Music className="w-4 h-4" />
                                <span>Sing Hymn: "{item.hymnTitle}"</span>
                              </button>
                            </div>
                          )}

                          {/* Giving Button for Offering steps */}
                          {item.category === 'giving' && (
                            <div className="pt-2 flex flex-wrap items-center gap-3 no-print">
                              <button
                                onClick={() => setIsGivingModalOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                              >
                                <Gift className="w-4 h-4" />
                                <span>Give Altar Offering (Online / Mobile Money)</span>
                              </button>
                            </div>
                          )}

                          {/* Card Footer Controls */}
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs no-print">
                            <button
                              onClick={(e) => handleMarkCurrentStep(item.id, e)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                                isCurrent
                                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500/40'
                              }`}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>{isCurrent ? 'Current Active Step' : 'Set as Current Step'}</span>
                            </button>

                            <button
                              onClick={(e) => handleToggleCompleted(item.id, e)}
                              className="text-slate-400 hover:text-white transition-colors"
                            >
                              {isCompleted ? 'Mark as Pending' : 'Mark as Done'}
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab 3: CUSTOM CANVA POSTER & QR HUB */}
        {activeTab === 'canva' && (
          <div className="space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Crown className="w-3.5 h-3.5" />
                <span>Official Canva Frame & Print Hub</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                Custom Framed Canva Poster & QR Code
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Featuring the official church logo crest, royal sanctuary gold framing, and high-resolution downloadable posters for church bulletins, entrance banners, and projection screens.
              </p>
            </div>

            <QRCanvaCard path="/consecration" />
          </div>
        )}

        {/* Tab 4: SACRED REGALIA & SYMBOLS GUIDE */}
        {activeTab === 'symbols' && (
          <div className="space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Crown className="w-3.5 h-3.5" />
                <span>Episcopal Heritage & Regalia</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                Biblical Symbolism of the Consecration Vestments & Rites
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Each sacred instrument used in the consecration liturgy carries profound scriptural covenant, apostolic authority, and holy significance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SACRED_SYMBOLS.map((sym) => (
                <div
                  key={sym.id}
                  className="rounded-2xl bg-slate-900/90 border border-amber-500/20 p-6 space-y-4 hover:border-amber-500/40 transition-all shadow-xl shadow-black/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-full">
                      {sym.scripture}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-serif text-amber-200">
                      {sym.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                      {sym.title}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {sym.meaning}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-amber-300/90 space-y-1">
                    <span className="font-semibold text-slate-400 block text-[10px] uppercase tracking-wider">
                      Role in the Service:
                    </span>
                    <p>{sym.ceremonyRole}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: LITURGICAL SCRIPTURES & HYMNS */}
        {activeTab === 'hymns' && (
          <div className="space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Scriptural Proclamation & Doxology</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                Consecration Scriptures, Hymns, and Covenant Vows
              </h2>
            </div>

            {/* Recessional Hymn Feature Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0c1427] via-slate-900 to-[#070c18] border-2 border-amber-500/30 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Music className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                      Official Recessional Hymn
                    </span>
                    <h3 className="text-xl font-bold font-serif text-slate-100">
                      {HYMNS_AND_LITURGY.recessionalHymn.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      By {HYMNS_AND_LITURGY.recessionalHymn.author}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsHymnModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  Open Full Sing-Along Hymnal
                </button>
              </div>

              {/* Hymn Stanzas Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {HYMNS_AND_LITURGY.recessionalHymn.stanzas.map((st) => (
                  <div
                    key={st.number}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2"
                  >
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Stanza {st.number}
                    </span>
                    <div className="text-xs font-serif text-slate-300 space-y-1 leading-relaxed">
                      {st.lines.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chorus */}
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-center space-y-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                  CHORUS
                </span>
                <p className="font-serif text-amber-100 font-semibold text-sm sm:text-base leading-relaxed">
                  {HYMNS_AND_LITURGY.recessionalHymn.chorus.join(' ')}
                </p>
              </div>
            </div>

            {/* Scripture Readings Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hebrews 5 */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    First Scripture
                  </span>
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-100">
                  Hebrews 5:1-10
                </h3>
                <p className="text-xs text-slate-300 italic font-serif">
                  "And no man taketh this honour unto himself, but he that is called of God, as was Aaron."
                </p>
                <button
                  onClick={() =>
                    openScripture(
                      'Hebrews 5:1-10',
                      CONSECRATION_PROGRAM.find((p) => p.id === 9)?.scriptureText || '',
                      'The Calling, Order, and Priesthood of Christ'
                    )
                  }
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all"
                >
                  Read Full Hebrew 5 Text
                </button>
              </div>

              {/* Isaiah 42 */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Second Scripture
                  </span>
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-100">
                  Isaiah 42:1-9
                </h3>
                <p className="text-xs text-slate-300 italic font-serif">
                  "Behold my servant, whom I uphold; mine elect, in whom my soul delighteth; I have put my spirit upon him..."
                </p>
                <button
                  onClick={() =>
                    openScripture(
                      'Isaiah 42:1-9',
                      CONSECRATION_PROGRAM.find((p) => p.id === 11)?.scriptureText || '',
                      'The Chosen Servant Endued with the Spirit'
                    )
                  }
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
                >
                  Read Full Isaiah 42 Text
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer / Secret Endpoint Discretion Notice */}
        <footer className="pt-10 border-t border-slate-800 text-center space-y-4 text-xs text-slate-500 no-print">
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Event QR Code Generator</span>
            </button>
            <button
              onClick={handlePrint}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Bulletin Layout</span>
            </button>
            <button
              onClick={() => setIsGivingModalOpen(true)}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Gift className="w-4 h-4" />
              <span>Give Altar Offering</span>
            </button>
            <button
              onClick={() => setIsPrayerModalOpen(true)}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4" />
              <span>Prayer Intercession</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 max-w-xl mx-auto">
            © {new Date().getFullYear()} {churchInfo?.name || 'Rhema Inner Court Gospel Church (Worldwide)'}. All sacred rites, liturgy, and ecclesiastical orders reserved.
          </p>
          <div className="text-[10px] text-amber-500/60 font-mono">
            Unlisted Ecclesiastical Liturgy Portal • Scan to Connect
          </div>
        </footer>
      </main>

      {/* MODALS */}
      <QRCodeHubModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        defaultPath="/consecration"
      />

      <ScriptureModal
        isOpen={scriptureModalData.isOpen}
        onClose={() => setScriptureModalData((prev) => ({ ...prev, isOpen: false }))}
        scriptureRef={scriptureModalData.ref}
        scriptureTitle={scriptureModalData.title}
        scriptureText={scriptureModalData.text}
      />

      <HymnViewerModal
        isOpen={isHymnModalOpen}
        onClose={() => setIsHymnModalOpen(false)}
      />

      <GivingModal
        isOpen={isGivingModalOpen}
        onClose={() => setIsGivingModalOpen(false)}
        defaultCategory="Sacrificial Offering"
      />

      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />
    </div>
  );
};

export default ConsecrationProgram;
