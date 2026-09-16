import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BarChart3,
  Edit3,
  Sliders,
  HeartHandshake,
  MessageSquare,
  LogOut,
  Sparkles,
  Save,
  CheckCircle2,
  RefreshCw,
  Eye,
  Plus,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Heart,
  Church,
  Calendar,
  Layers,
  Download,
  Upload,
  ExternalLink,
  Smartphone,
  Laptop,
  Tablet,
  Check,
  Clock,
  Send,
  Lock,
  CreditCard,
  HelpCircle,
  FolderPlus,
  Users
} from 'lucide-react';
import { useChurch, PrayerItem } from '../context/ChurchContext';
import { getAnalyticsSummary, AnalyticsSummary } from '../utils/analytics';
import { IMAGES, Branch, MinistryItem, EventItem, FAQItem, SponsorshipProject, SponsorshipStat, SponsorshipSettings } from '../data/churchData';
import { calculateFundingPercent, createSponsorshipProject } from '../utils/sponsorshipUtils';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { TransactionRecord } from '../utils/paystackService';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    churchInfo,
    branches,
    events,
    ministries,
    projects,
    sponsorshipStats,
    sponsorshipSettings,
    faqs,
    themeSettings,
    prayerRequests,
    updateChurchInfo,
    updateThemeSettings,
    updateBranches,
    updateBranch,
    addBranch,
    deleteBranch,
    updateMinistries,
    updateMinistry,
    addMinistry,
    deleteMinistry,
    updateEvents,
    updateEvent,
    addEvent,
    deleteEvent,
    updateProjects,
    updateProject,
    addProject,
    deleteProject,
    updateSponsorshipStats,
    updateSponsorshipStat,
    updateSponsorshipSettings,
    updateFaqs,
    addFaq,
    deleteFaq,
    updatePrayerStatus,
    deletePrayerRequest,
    resetToDefaults,
  } = useChurch();

  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'branches' | 'ministries' | 'events' | 'sponsorship' | 'faqs' | 'appearance' | 'prayers' | 'feedback'>('analytics');
  const [analytics, setAnalytics] = useState<AnalyticsSummary>(getAnalyticsSummary());
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for Content Editor
  const [formData, setFormData] = useState({
    themeTitle: churchInfo.themeTitle,
    themeSubtitle: churchInfo.themeSubtitle,
    themeYear: churchInfo.themeYear,
    slogan: churchInfo.slogan,
    vision: churchInfo.vision,
    phone: churchInfo.contact.phone,
    email: churchInfo.contact.email,
    location: churchInfo.contact.location,
    youtube: churchInfo.contact.youtube,
    facebook: churchInfo.contact.facebook,
    instagram: churchInfo.contact.instagram,
  });

  // Form states for Appearance
  const [appearanceData, setAppearanceData] = useState({
    accentColor: themeSettings.accentColor,
    showAnnouncementBanner: themeSettings.showAnnouncementBanner,
    announcementBadge: themeSettings.announcementBadge,
    announcementText: themeSettings.announcementText,
    enableLiveStreamBadge: themeSettings.enableLiveStreamBadge,
    heroHeadline: themeSettings.heroHeadline,
    heroSubtitle: themeSettings.heroSubtitle,
  });

  // State for events (new + edit)
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: 'Mallam Main Sanctuary',
    category: 'Special Program',
    description: '',
    isFeatured: false,
  });
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // State for branches (new + edit)
  const [newBranch, setNewBranch] = useState({
    name: '',
    tagline: '',
    location: '',
    address: '',
    directions: '',
    phone: '',
    email: '',
    pastor: '',
  });
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  // State for ministries (new + edit)
  const [newMinistry, setNewMinistry] = useState({
    name: '',
    tagline: '',
    description: '',
    schedule: '',
    iconName: 'Users',
  });
  const [editingMinistry, setEditingMinistry] = useState<MinistryItem | null>(null);

  // State for new FAQ
  const [newFaq, setNewFaq] = useState({
    q: '',
    a: '',
  });

  // State for new Sponsorship Project
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Compassion & Mercy',
    target: 'GHS 50,000',
    raised: 'GHS 0',
    percent: 0,
    description: '',
    impact: 'Supporting believers in need',
  });

  // State for editing Sponsorship Project
  const [editingProject, setEditingProject] = useState<SponsorshipProject | null>(null);

  // Form states for Sponsorship Page Settings
  const [sponsorshipSettingsForm, setSponsorshipSettingsForm] = useState<SponsorshipSettings>({
    badge: sponsorshipSettings?.badge || 'Kingdom Partnership & Sponsorship',
    headline: sponsorshipSettings?.headline || "Partner with God's Work to Touch Lives Worldwide.",
    subtitle: sponsorshipSettings?.subtitle || 'Your financial seeds and sponsorship empower us to spread the Gospel, provide welfare to orphanages, support rural crusades, and expand church sanctuaries across Ghana and beyond.',
    gatewayBadge: sponsorshipSettings?.gatewayBadge || 'Paystack Instant Gateway',
    gatewayTitle: sponsorshipSettings?.gatewayTitle || 'One-Click Online Giving & Project Sponsorship',
    gatewaySubtitle: sponsorshipSettings?.gatewaySubtitle || 'Send tithes, offerings, covenant seeds, and project donations securely in seconds using MTN Mobile Money, Telecel Cash, AT Money, Visa, Mastercard, or Apple Pay.',
    ctaButtonText: sponsorshipSettings?.ctaButtonText || 'Give Online Now',
  });

  useEffect(() => {
    if (sponsorshipSettings) {
      setSponsorshipSettingsForm({
        badge: sponsorshipSettings.badge,
        headline: sponsorshipSettings.headline,
        subtitle: sponsorshipSettings.subtitle,
        gatewayBadge: sponsorshipSettings.gatewayBadge,
        gatewayTitle: sponsorshipSettings.gatewayTitle,
        gatewaySubtitle: sponsorshipSettings.gatewaySubtitle,
        ctaButtonText: sponsorshipSettings.ctaButtonText,
      });
    }
  }, [sponsorshipSettings]);

  // Client Feedback & Notes state
  const [adminNotes, setAdminNotes] = useState(() => {
    return 'Redesign goals: Modern hybrid editorial theme, lightning fast speeds, accurate Ghanaian phone lines (+233 244 485 7403), Paystack digital giving ready.';
  });

  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);

  // Listen to Firestore transactions in real-time
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(
        collection(db, 'transactions'),
        (snapshot) => {
          if (snapshot && !snapshot.empty) {
            const fetched = snapshot.docs.map((docSnap) => docSnap.data() as TransactionRecord);
            fetched.sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime());
            setTransactions(fetched);
          }
        },
        (error) => console.warn('Transactions live sync note:', error)
      );
      return () => unsub();
    } catch (err) {
      console.warn('Transactions subscription error:', err);
    }
  }, []);

  // Refresh analytics periodically
  useEffect(() => {
    const update = () => setAnalytics(getAnalyticsSummary());
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ricgcw_admin_session');
    sessionStorage.removeItem('ricgcw_admin_session');
    navigate('/admin/login');
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateChurchInfo({
      themeTitle: formData.themeTitle,
      themeSubtitle: formData.themeSubtitle,
      themeYear: formData.themeYear,
      slogan: formData.slogan,
      vision: formData.vision,
      contact: {
        ...churchInfo.contact,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        youtube: formData.youtube,
        facebook: formData.facebook,
        instagram: formData.instagram,
      },
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    updateThemeSettings({
      accentColor: appearanceData.accentColor as any,
      showAnnouncementBanner: appearanceData.showAnnouncementBanner,
      announcementBadge: appearanceData.announcementBadge,
      announcementText: appearanceData.announcementText,
      enableLiveStreamBadge: appearanceData.enableLiveStreamBadge,
      heroHeadline: appearanceData.heroHeadline,
      heroSubtitle: appearanceData.heroSubtitle,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    addEvent({
      id: 'ev-' + Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time || '09:00 AM',
      location: newEvent.location || 'Mallam Main Sanctuary',
      category: newEvent.category || 'Special Program',
      description: newEvent.description,
      isFeatured: newEvent.isFeatured,
    });
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: 'Mallam Main Sanctuary',
      category: 'Special Program',
      description: '',
      isFeatured: false,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEditEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    updateEvent(editingEvent.id, editingEvent);
    setEditingEvent(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch.name.trim()) return;
    addBranch({
      id: 'br-' + Date.now(),
      name: newBranch.name,
      tagline: newBranch.tagline || 'RICGCW Sanctuary Assembly',
      location: newBranch.location || 'Accra, Ghana',
      address: newBranch.address || 'Sanctuary Address',
      directions: newBranch.directions || '',
      phone: newBranch.phone || churchInfo.contact.phone,
      email: newBranch.email || churchInfo.contact.email,
      pastor: newBranch.pastor || 'Resident Pastor',
      services: [
        { day: 'Sunday', time: '9:00 AM - 11:30 AM', name: 'Glorious Worship Service', description: 'Word, Praise & Prophetic Deliverance', isMain: true },
        { day: 'Wednesday', time: '6:30 PM - 8:30 PM', name: 'Midweek Communion & Prayer', description: 'Spiritual Deepening' }
      ]
    });
    setNewBranch({ name: '', tagline: '', location: '', address: '', directions: '', phone: '', email: '', pastor: '' });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEditBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch) return;
    updateBranch(editingBranch.id, editingBranch);
    setEditingBranch(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddMinistrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMinistry.name.trim()) return;
    addMinistry({
      id: 'min-' + Date.now(),
      name: newMinistry.name,
      tagline: newMinistry.tagline || 'Kingdom Fellowship & Ministry',
      description: newMinistry.description || '',
      schedule: newMinistry.schedule || 'Weekly Gatherings',
      iconName: newMinistry.iconName || 'Users'
    });
    setNewMinistry({ name: '', tagline: '', description: '', schedule: '', iconName: 'Users' });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEditMinistrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMinistry) return;
    updateMinistry(editingMinistry.id, editingMinistry);
    setEditingMinistry(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.q || !newFaq.a) return;
    addFaq({
      id: 'faq-' + Date.now(),
      q: newFaq.q,
      a: newFaq.a,
    });
    setNewFaq({ q: '', a: '' });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const project = createSponsorshipProject(newProject);
    addProject(project);
    setNewProject({
      title: '',
      category: 'Compassion & Mercy',
      target: 'GHS 50,000',
      raised: 'GHS 0',
      percent: 0,
      description: '',
      impact: 'Supporting believers in need',
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleEditProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title.trim()) return;
    const percent = calculateFundingPercent(editingProject.raised, editingProject.target);
    updateProject(editingProject.id, {
      ...editingProject,
      percent,
    });
    setEditingProject(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveSponsorshipSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSponsorshipSettings(sponsorshipSettingsForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleUpdateStat = (id: string, label: string, value: string) => {
    updateSponsorshipStat(id, { label, value });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveNotes = () => {
    localStorage.setItem('ricgcw_admin_notes', adminNotes);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportBackup = () => {
    const backup = {
      churchInfo,
      branches,
      events,
      projects,
      faqs,
      themeSettings,
      prayerRequests,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ricgcw_website_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleOpenWhatsAppReply = (prayer: PrayerItem) => {
    const cleanPhone = prayer.phone.replace(/[^0-9]/g, '');
    const greeting = encodeURIComponent(
      `Shalom ${prayer.name},\n\nThis is Rev. Nicholas Dobeng and the Pastoral Council of Rhema Inner Court Gospel Church (Worldwide). We have received your prayer request regarding "${prayer.category}" and have brought your petition before the altar of intercession.\n\n"The Lord hear thee in the day of trouble; the name of the God of Jacob defend thee." (Psalm 20:1)\n\nGod bless you abundantly!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${greeting}`, '_blank');
    updatePrayerStatus(prayer.id, 'responded');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 border-b border-amber-500/20 px-4 sm:px-6 py-3.5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-500/40">
              <img src={IMAGES.logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm font-serif text-white tracking-wide">
                  RICGCW Control Center
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Dynamic CMS
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Rhema Inner Court Gospel Church (Worldwide)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Preview Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 flex-1 space-y-8">
        
        {/* Save Notification Toast */}
        {saveSuccess && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 className="w-5 h-5" />
            <div>
              <p className="font-bold text-sm">Changes Published Successfully!</p>
              <p className="text-xs text-emerald-100">Live website updated instantly across all client sessions.</p>
            </div>
          </div>
        )}

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'analytics', name: 'Analytics & Giving', icon: BarChart3, badge: `${analytics.totalVisitors}` },
            { id: 'content', name: 'Church Identity', icon: Edit3 },
            { id: 'events', name: 'Events', icon: Calendar, badge: `${events.length}` },
            { id: 'branches', name: 'Branches', icon: MapPin, badge: `${branches.length}` },
            { id: 'ministries', name: 'Ministries', icon: Users, badge: `${ministries.length}` },
            { id: 'sponsorship', name: 'Sponsorship & Projects', icon: Heart, badge: `${projects.length}` },
            { id: 'faqs', name: 'FAQs', icon: HelpCircle, badge: `${faqs.length}` },
            { id: 'prayers', name: 'Prayer Requests', icon: HeartHandshake, badge: `${prayerRequests.filter(p => p.status === 'new').length} New` },
            { id: 'appearance', name: 'Look & Feel', icon: Sliders },
            { id: 'feedback', name: 'System & Notes', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ANALYTICS & TRAFFIC HUB */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Stat Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Visitors</span>
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-3xl font-bold font-serif text-white">{analytics.totalVisitors}</p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  ↑ +24% visitor growth
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Prayer Petitions</span>
                  <HeartHandshake className="w-4 h-4 text-rose-400" />
                </div>
                <p className="text-3xl font-bold font-serif text-white">{prayerRequests.length}</p>
                <p className="text-[11px] text-slate-400">Online prayer requests</p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Giving Intent Clicks</span>
                  <Heart className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-3xl font-bold font-serif text-white">{analytics.givingClicksCount}</p>
                <p className="text-[11px] text-amber-400/80">Paystack checkout intents</p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Direct Enquiries</span>
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-3xl font-bold font-serif text-white">
                  {analytics.whatsappClicksCount + analytics.phoneCallsCount}
                </p>
                <p className="text-[11px] text-slate-400">WhatsApp & Direct Calls</p>
              </div>
            </div>

            {/* High Intent Conversion Actions */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Visitor Conversions & Engagement</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Tracking high-intent newcomer and member actions</p>
                </div>
                <span className="text-xs text-amber-400 font-mono">Live Tracking Active</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/50 space-y-1">
                  <p className="text-xs text-slate-400">WhatsApp Chats</p>
                  <p className="text-xl font-bold text-white font-mono">{analytics.whatsappClicksCount}</p>
                  <p className="text-[10px] text-emerald-400 font-medium">{churchInfo.contact.phone}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/50 space-y-1">
                  <p className="text-xs text-slate-400">Direct Phone Calls</p>
                  <p className="text-xl font-bold text-white font-mono">{analytics.phoneCallsCount}</p>
                  <p className="text-[10px] text-slate-400">Hotline taps</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/50 space-y-1">
                  <p className="text-xs text-slate-400">Branch Map Directions</p>
                  <p className="text-xl font-bold text-white font-mono">{analytics.directionsClicksCount}</p>
                  <p className="text-[10px] text-amber-400">3 Sanctuaries</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/50 space-y-1">
                  <p className="text-xs text-slate-400">Sermons & Broadcasts</p>
                  <p className="text-xl font-bold text-white font-mono">{analytics.sermonViewsCount}</p>
                  <p className="text-[10px] text-rose-400">YouTube Stream</p>
                </div>
              </div>
            </div>

            {/* 2-Column: 7-Day Chart & Device Breakdown */}
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <h3 className="font-serif font-bold text-lg text-white">7-Day Visitor Velocity</h3>
                <div className="h-48 flex items-end gap-3 pt-6">
                  {analytics.dailyViews.map((day, idx) => {
                    const heightPct = Math.min(100, Math.round((day.views / 60) * 100));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <div className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {day.views}
                        </div>
                        <div
                          style={{ height: `${heightPct}%` }}
                          className="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-xl transition-all group-hover:brightness-125 shadow-md shadow-amber-500/10"
                        />
                        <span className="text-[10px] text-slate-400 font-mono mt-1">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <h3 className="font-serif font-bold text-lg text-white">Device Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                      <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-amber-400" /> Mobile Phones</span>
                      <span className="font-mono font-bold">72%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[72%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                      <span className="flex items-center gap-2"><Laptop className="w-4 h-4 text-blue-400" /> Desktop & Laptops</span>
                      <span className="font-mono font-bold">23%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[23%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                      <span className="flex items-center gap-2"><Tablet className="w-4 h-4 text-emerald-400" /> Tablets & iPads</span>
                      <span className="font-mono font-bold">5%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[5%]" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ultra-fast mobile loading optimized for Ghanaian networks.</span>
                </div>
              </div>
            </div>

            {/* Live Digital Transactions Log */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Live Paystack Digital Giving Log</h3>
                    <p className="text-xs text-slate-400">Direct contributions settled to church subaccount <code className="text-amber-400 font-bold">ACCT_cm4xpwb0z8y7xou</code></p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 self-start sm:self-auto">
                  {transactions.length} Contributions Logged
                </span>
              </div>

              {transactions.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-slate-950/50 border border-slate-800 space-y-2">
                  <CreditCard className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-300">No digital transactions recorded yet</p>
                  <p className="text-xs text-slate-500">New donations submitted through the website will appear here in real-time.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Date &amp; Time</th>
                        <th className="py-3 px-4">Donor Name</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Reference</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {transactions.map((tx, idx) => (
                        <tr key={tx.paymentReference || idx} className="hover:bg-slate-850 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                            {new Date(tx.createdAt || tx.date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-white text-xs">{tx.donorName}</p>
                            {tx.donorPhone && <p className="text-[10px] text-slate-400 font-mono">{tx.donorPhone}</p>}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                              {tx.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 text-sm">
                            {tx.currency} {tx.amount.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">
                            {tx.paymentReference}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                              {tx.status || 'success'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CHURCH IDENTITY & GENERAL CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <form onSubmit={handleSaveContent} className="space-y-8">
              {/* Annual Theme */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="font-serif font-bold text-lg text-white">Annual Theme & Spiritual Mandate</h3>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Theme Year</label>
                    <input
                      type="text"
                      value={formData.themeYear}
                      onChange={(e) => setFormData({ ...formData, themeYear: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Theme Title</label>
                    <input
                      type="text"
                      value={formData.themeTitle}
                      onChange={(e) => setFormData({ ...formData, themeTitle: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Theme Subtitle</label>
                    <input
                      type="text"
                      value={formData.themeSubtitle}
                      onChange={(e) => setFormData({ ...formData, themeSubtitle: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Church Slogan</label>
                    <input
                      type="text"
                      value={formData.slogan}
                      onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Vision Statement</label>
                    <textarea
                      rows={2}
                      value={formData.vision}
                      onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Official Contact Details */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif font-bold text-lg text-white">Verified Contact Channels</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                      Primary Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">
                      Headquarters Address
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">YouTube Link</label>
                    <input
                      type="text"
                      value={formData.youtube}
                      onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Facebook Page</label>
                    <input
                      type="text"
                      value={formData.facebook}
                      onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Instagram Handle</label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" /> Save Content Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: EVENTS MANAGER */}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Events &amp; Holy Gatherings</h3>
                    <p className="text-xs text-slate-400">Manage church conferences, vigils, and outreaches (Synced with Live Database)</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  {events.length} Scheduled
                </span>
              </div>

              {/* Edit Event Form / Modal */}
              {editingEvent && (
                <form onSubmit={handleEditEventSubmit} className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Edit3 className="w-4 h-4" /> Editing Event: {editingEvent.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingEvent(null)}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={editingEvent.title}
                        onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Date</label>
                      <input
                        type="text"
                        required
                        value={editingEvent.date}
                        onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Time</label>
                      <input
                        type="text"
                        value={editingEvent.time}
                        onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Location</label>
                      <input
                        type="text"
                        value={editingEvent.location}
                        onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Category</label>
                      <input
                        type="text"
                        value={editingEvent.category}
                        onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-4 text-xs text-slate-300">
                      <input
                        type="checkbox"
                        id="editFeatCheck"
                        checked={Boolean(editingEvent.isFeatured)}
                        onChange={(e) => setEditingEvent({ ...editingEvent, isFeatured: e.target.checked })}
                        className="rounded bg-slate-800 border-slate-700 text-amber-500"
                      />
                      <label htmlFor="editFeatCheck" className="cursor-pointer">Highlight as Flagship</label>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editingEvent.description}
                      onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingEvent(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Event Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Event List */}
              <div className="space-y-3">
                {events.map((ev) => (
                  <div key={ev.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{ev.category}</span>
                        {ev.isFeatured && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300">
                            Featured Flagship
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold font-serif text-white text-base mt-0.5">{ev.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        📅 {ev.date} • ⏰ {ev.time} • 📍 {ev.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => setEditingEvent(ev)}
                        className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => deleteEvent(ev.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Event Form */}
              <form onSubmit={handleAddEventSubmit} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add New Event
                </h4>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Date (e.g. May 16, 2026)"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Time (e.g. 6:00 PM Daily)"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. Annual Conference / Vigil)"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      id="featCheck2"
                      checked={newEvent.isFeatured}
                      onChange={(e) => setNewEvent({ ...newEvent, isFeatured: e.target.checked })}
                      className="rounded bg-slate-800 border-slate-700 text-amber-500"
                    />
                    <label htmlFor="featCheck2" className="cursor-pointer">Highlight as Flagship</label>
                  </div>
                </div>

                <textarea
                  rows={2}
                  placeholder="Short event description..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Publish Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4.1: BRANCHES & SANCTUARIES MANAGER */}
        {activeTab === 'branches' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Branches &amp; Sanctuary Assemblies</h3>
                    <p className="text-xs text-slate-400">Manage church locations, addresses, resident pastors, and service schedules</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  {branches.length} Active Branches
                </span>
              </div>

              {/* Edit Branch Modal */}
              {editingBranch && (
                <form onSubmit={handleEditBranchSubmit} className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Edit3 className="w-4 h-4" /> Editing Branch: {editingBranch.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingBranch(null)}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Branch Name</label>
                      <input
                        type="text"
                        required
                        value={editingBranch.name}
                        onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editingBranch.tagline}
                        onChange={(e) => setEditingBranch({ ...editingBranch, tagline: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Location / Area</label>
                      <input
                        type="text"
                        value={editingBranch.location}
                        onChange={(e) => setEditingBranch({ ...editingBranch, location: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Address</label>
                      <input
                        type="text"
                        value={editingBranch.address}
                        onChange={(e) => setEditingBranch({ ...editingBranch, address: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Phone</label>
                      <input
                        type="text"
                        value={editingBranch.phone}
                        onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Resident Pastor</label>
                      <input
                        type="text"
                        value={editingBranch.pastor}
                        onChange={(e) => setEditingBranch({ ...editingBranch, pastor: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingBranch(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Branch Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Branches List */}
              <div className="space-y-3">
                {branches.map((br) => (
                  <div key={br.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold font-serif text-white text-base">{br.name}</h4>
                        {br.isHeadquarters && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Headquarters
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        📍 {br.address} • 📞 {br.phone} • 👤 {br.pastor}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => setEditingBranch(br)}
                        className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => deleteBranch(br.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Branch Form */}
              <form onSubmit={handleAddBranchSubmit} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add New Branch Sanctuary
                </h4>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Branch Name (e.g. Kasoa New Sanctuary)"
                    value={newBranch.name}
                    onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Tagline / Motto"
                    value={newBranch.tagline}
                    onChange={(e) => setNewBranch({ ...newBranch, tagline: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Location / Town"
                    value={newBranch.location}
                    onChange={(e) => setNewBranch({ ...newBranch, location: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Full Address / Landmark"
                    value={newBranch.address}
                    onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Phone Line"
                    value={newBranch.phone}
                    onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Resident Pastor Name"
                    value={newBranch.pastor}
                    onChange={(e) => setNewBranch({ ...newBranch, pastor: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Sanctuary Branch
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4.2: MINISTRIES MANAGER */}
        {activeTab === 'ministries' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Ministries &amp; Departmental Wings</h3>
                    <p className="text-xs text-slate-400">Manage church fellowship groups, meetings, and wings</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  {ministries.length} Active Ministries
                </span>
              </div>

              {/* Edit Ministry Modal */}
              {editingMinistry && (
                <form onSubmit={handleEditMinistrySubmit} className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Edit3 className="w-4 h-4" /> Editing Ministry: {editingMinistry.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingMinistry(null)}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Ministry Name</label>
                      <input
                        type="text"
                        required
                        value={editingMinistry.name}
                        onChange={(e) => setEditingMinistry({ ...editingMinistry, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editingMinistry.tagline}
                        onChange={(e) => setEditingMinistry({ ...editingMinistry, tagline: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Meeting Schedule</label>
                      <input
                        type="text"
                        value={editingMinistry.schedule}
                        onChange={(e) => setEditingMinistry({ ...editingMinistry, schedule: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={editingMinistry.description}
                        onChange={(e) => setEditingMinistry({ ...editingMinistry, description: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingMinistry(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Ministry Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Ministries List */}
              <div className="space-y-3">
                {ministries.map((min) => (
                  <div key={min.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold font-serif text-white text-base">{min.name}</h4>
                      <p className="text-xs text-amber-400">{min.tagline}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        📅 {min.schedule} • {min.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => setEditingMinistry(min)}
                        className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => deleteMinistry(min.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Ministry Form */}
              <form onSubmit={handleAddMinistrySubmit} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add New Ministry
                </h4>

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ministry Name (e.g. Royal Men of Valor)"
                    value={newMinistry.name}
                    onChange={(e) => setNewMinistry({ ...newMinistry, name: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Tagline (e.g. Building Priests and Kings)"
                    value={newMinistry.tagline}
                    onChange={(e) => setNewMinistry({ ...newMinistry, tagline: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Meeting Schedule (e.g. 1st Saturday Monthly @ 4:00 PM)"
                    value={newMinistry.schedule}
                    onChange={(e) => setNewMinistry({ ...newMinistry, schedule: e.target.value })}
                    className="sm:col-span-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <textarea
                    rows={2}
                    placeholder="Ministry Description..."
                    value={newMinistry.description}
                    onChange={(e) => setNewMinistry({ ...newMinistry, description: e.target.value })}
                    className="sm:col-span-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Ministry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4.5: SPONSORSHIP & KINGDOM PROJECTS MANAGER */}
        {activeTab === 'sponsorship' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Kingdom Projects &amp; Sponsorship Manager</h3>
                    <p className="text-xs text-slate-400">Add, update, and remove active church sponsorship projects and milestones</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  {projects.length} Active Projects
                </span>
              </div>

              {/* Edit Project Modal / Overlay */}
              {editingProject && (
                <form onSubmit={handleEditProjectSubmit} className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Edit3 className="w-4 h-4" /> Editing Project: {editingProject.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Category</label>
                      <input
                        type="text"
                        required
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Target Amount</label>
                      <input
                        type="text"
                        required
                        value={editingProject.target}
                        onChange={(e) => setEditingProject({ ...editingProject, target: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Amount Raised</label>
                      <input
                        type="text"
                        required
                        value={editingProject.raised}
                        onChange={(e) => setEditingProject({ ...editingProject, raised: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Impact Summary</label>
                      <input
                        type="text"
                        required
                        value={editingProject.impact}
                        onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 w-full text-center">
                        <span className="text-[10px] text-slate-400 uppercase block font-bold">Auto-Calculated %</span>
                        <span className="text-base font-bold font-mono text-amber-400">
                          {calculateFundingPercent(editingProject.raised, editingProject.target)}% Funded
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Description</label>
                    <textarea
                      rows={2}
                      required
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Project Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Projects List */}
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-850 border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {proj.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-300">
                          {proj.percent}% Funded
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-base text-white">{proj.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{proj.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                        <span>Raised: <strong className="text-amber-300">{proj.raised}</strong></span>
                        <span>Target: <strong className="text-slate-100">{proj.target}</strong></span>
                        <span className="text-slate-400">✨ {proj.impact}</span>
                      </div>

                      {/* Progress Bar Preview */}
                      <div className="w-full max-w-md h-1.5 rounded-full bg-slate-700 overflow-hidden mt-2">
                        <div
                          style={{ width: `${Math.min(100, Math.max(0, proj.percent))}%` }}
                          className="h-full bg-amber-500 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => setEditingProject(proj)}
                        className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-400" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteProject(proj.id);
                          setSaveSuccess(true);
                          setTimeout(() => setSaveSuccess(false), 3000);
                        }}
                        className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Sponsorship Project Form */}
              <form onSubmit={handleAddProjectSubmit} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add New Kingdom Project
                </h4>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Project Title (e.g. Rural Church Planting)"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Category (e.g. Evangelism & Missions / Education)"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Target Amount (e.g. GHS 60,000)"
                    value={newProject.target}
                    onChange={(e) => setNewProject({ ...newProject, target: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Amount Raised (e.g. GHS 15,000)"
                    value={newProject.raised}
                    onChange={(e) => setNewProject({ ...newProject, raised: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Impact Milestone (e.g. 100+ children supported)"
                    value={newProject.impact}
                    onChange={(e) => setNewProject({ ...newProject, impact: e.target.value })}
                    className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center flex items-center justify-between text-xs text-slate-300">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Funding:</span>
                    <span className="font-bold font-mono text-amber-400">
                      {calculateFundingPercent(newProject.raised, newProject.target)}%
                    </span>
                  </div>
                </div>

                <textarea
                  rows={2}
                  required
                  placeholder="Detailed project description and purpose..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" /> Publish Kingdom Project
                  </button>
                </div>
              </form>
            </div>

            {/* Impact Statistics Editor */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-serif font-bold text-lg text-white">Sponsorship Impact Statistics</h3>
                <p className="text-xs text-slate-400">Edit the 4 primary impact milestone metrics displayed on the Sponsorship page</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(sponsorshipStats || []).map((stat) => (
                  <div key={stat.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-700/60 space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Metric Value</label>
                      <input
                        type="text"
                        defaultValue={stat.value}
                        onBlur={(e) => handleUpdateStat(stat.id, stat.label, e.target.value)}
                        className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono font-bold outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Label</label>
                      <input
                        type="text"
                        defaultValue={stat.label}
                        onBlur={(e) => handleUpdateStat(stat.id, e.target.value, stat.value)}
                        className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsorship Page Header & Gateway Settings */}
            <form onSubmit={handleSaveSponsorshipSettings} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Sponsorship Page Copy &amp; Gateway Settings</h3>
                  <p className="text-xs text-slate-400">Customize the top headline, banner badge, and payment call-to-action text</p>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" /> Save Page Settings
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 uppercase font-bold block mb-1">Top Banner Badge</label>
                  <input
                    type="text"
                    value={sponsorshipSettingsForm.badge}
                    onChange={(e) => setSponsorshipSettingsForm({ ...sponsorshipSettingsForm, badge: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase font-bold block mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={sponsorshipSettingsForm.ctaButtonText}
                    onChange={(e) => setSponsorshipSettingsForm({ ...sponsorshipSettingsForm, ctaButtonText: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 uppercase font-bold block mb-1">Headline</label>
                  <input
                    type="text"
                    value={sponsorshipSettingsForm.headline}
                    onChange={(e) => setSponsorshipSettingsForm({ ...sponsorshipSettingsForm, headline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs text-slate-400 uppercase font-bold block mb-1">Subtitle</label>
                  <textarea
                    rows={2}
                    value={sponsorshipSettingsForm.subtitle}
                    onChange={(e) => setSponsorshipSettingsForm({ ...sponsorshipSettingsForm, subtitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase font-bold block mb-1">Gateway Card Title</label>
                  <input
                    type="text"
                    value={sponsorshipSettingsForm.gatewayTitle}
                    onChange={(e) => setSponsorshipSettingsForm({ ...sponsorshipSettingsForm, gatewayTitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase font-bold block mb-1">Gateway Card Subtitle</label>
                  <input
                    type="text"
                    value={sponsorshipSettingsForm.gatewaySubtitle}
                    onChange={(e) => setSponsorshipSettingsForm({ ...sponsorshipSettingsForm, gatewaySubtitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: FAQS MANAGER */}
        {activeTab === 'faqs' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Frequently Asked Questions Manager</h3>
                  <p className="text-xs text-slate-400">Add or edit questions displayed in the Connect section</p>
                </div>
              </div>

              {/* FAQs List */}
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-4 rounded-2xl bg-slate-850 border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-white">{faq.q}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                    </div>

                    <button
                      onClick={() => deleteFaq(faq.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-end sm:self-auto"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Add FAQ Form */}
              <form onSubmit={handleAddFaqSubmit} className="p-5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add New FAQ
                </h4>

                <input
                  type="text"
                  required
                  placeholder="Question (e.g. What should I wear on Sunday?)"
                  value={newFaq.q}
                  onChange={(e) => setNewFaq({ ...newFaq, q: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                />

                <textarea
                  rows={2}
                  required
                  placeholder="Answer..."
                  value={newFaq.a}
                  onChange={(e) => setNewFaq({ ...newFaq, a: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:border-amber-400"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add FAQ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 6: PRAYER REQUESTS INBOX */}
        {activeTab === 'prayers' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-2xl text-white flex items-center gap-2">
                  <HeartHandshake className="w-6 h-6 text-amber-400" />
                  Altar of Intercession & Prayer Inbox
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Confidential prayer requests submitted through the online prayer portal
                </p>
              </div>

              <span className="text-xs text-amber-400 font-mono self-start sm:self-auto px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                {prayerRequests.length} Total Requests
              </span>
            </div>

            {prayerRequests.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <HeartHandshake className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="font-bold text-base text-slate-300">No prayer requests in queue</p>
              </div>
            ) : (
              <div className="space-y-4">
                {prayerRequests.map((prayer) => (
                  <div
                    key={prayer.id}
                    className={`p-6 rounded-3xl border transition-all space-y-4 ${
                      prayer.status === 'new'
                        ? 'bg-slate-900 border-amber-500/50 shadow-lg'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-serif font-bold text-lg">
                          {prayer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-base text-white">{prayer.name}</h4>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              prayer.status === 'new'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : prayer.status === 'prayed'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {prayer.status === 'new' ? 'New Request' : prayer.status === 'prayed' ? 'Prayed Over' : 'Responded'}
                            </span>
                            {prayer.isConfidential && (
                              <span className="text-[10px] text-slate-400 font-mono">🔒 Confidential</span>
                            )}
                          </div>
                          <p className="text-xs text-amber-400/90 font-medium">{prayer.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(prayer.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm italic leading-relaxed">
                      "{prayer.message}"
                    </div>

                    {prayer.pastoralNotes && (
                      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300">
                        <strong>Pastoral Note:</strong> {prayer.pastoralNotes}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        {prayer.phone && (
                          <span className="flex items-center gap-1 font-mono">
                            <Phone className="w-3.5 h-3.5 text-amber-400" /> {prayer.phone}
                          </span>
                        )}
                        {prayer.email && (
                          <span className="flex items-center gap-1 font-mono">
                            <Mail className="w-3.5 h-3.5 text-amber-400" /> {prayer.email}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {prayer.phone && (
                          <button
                            onClick={() => handleOpenWhatsAppReply(prayer)}
                            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" /> Reply on WhatsApp
                          </button>
                        )}

                        <button
                          onClick={() => updatePrayerStatus(prayer.id, 'prayed', 'Covered on intercession altar')}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5 text-amber-400" /> Mark Prayed
                        </button>

                        <button
                          onClick={() => deletePrayerRequest(prayer.id)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: LOOK & FEEL */}
        {activeTab === 'appearance' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <form onSubmit={handleSaveAppearance} className="space-y-8">
              {/* Top Banner Customizer */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <Sliders className="w-5 h-5 text-amber-400" />
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white">Header Announcement Strip</h3>
                      <p className="text-xs text-slate-400">Control the top promotional bar</p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Appearance
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 rounded-2xl bg-slate-850 border border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appearanceData.showAnnouncementBanner}
                      onChange={(e) => setAppearanceData({ ...appearanceData, showAnnouncementBanner: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500"
                    />
                    <div>
                      <p className="font-bold text-sm text-white">Enable Top Announcement Bar</p>
                      <p className="text-xs text-slate-400">Display immediate theme updates & hotline at the top of every page</p>
                    </div>
                  </label>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Badge Text</label>
                      <input
                        type="text"
                        value={appearanceData.announcementBadge}
                        onChange={(e) => setAppearanceData({ ...appearanceData, announcementBadge: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Announcement Content</label>
                      <input
                        type="text"
                        value={appearanceData.announcementText}
                        onChange={(e) => setAppearanceData({ ...appearanceData, announcementText: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Statement */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <h3 className="font-serif font-bold text-lg text-white">Hero Welcome Statement</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Hero Headline</label>
                    <input
                      type="text"
                      value={appearanceData.heroHeadline}
                      onChange={(e) => setAppearanceData({ ...appearanceData, heroHeadline: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Hero Subtitle</label>
                    <textarea
                      rows={3}
                      value={appearanceData.heroSubtitle}
                      onChange={(e) => setAppearanceData({ ...appearanceData, heroSubtitle: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" /> Save Appearance
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 8: SYSTEM NOTES & BACKUP */}
        {activeTab === 'feedback' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Internal Notes &amp; Client Feedback</h3>
                    <p className="text-xs text-slate-400">Record directives and feedback on website improvements</p>
                  </div>
                </div>
                <button
                  onClick={handleSaveNotes}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" /> Save Notes
                </button>
              </div>

              <textarea
                rows={5}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-amber-400 leading-relaxed font-mono"
              />
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h3 className="font-serif font-bold text-lg text-white">Data Backup &amp; Reset Safeguards</h3>
              <p className="text-xs text-slate-400">Export current data as JSON or restore defaults.</p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleExportBackup}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
                >
                  <Download className="w-4 h-4 text-amber-400" /> Download JSON Backup
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset all website data to initial baseline defaults?')) {
                      resetToDefaults();
                      setSaveSuccess(true);
                      setTimeout(() => setSaveSuccess(false), 3000);
                    }
                  }}
                  className="px-5 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border border-rose-500/30"
                >
                  <RefreshCw className="w-4 h-4" /> Reset All to Baseline Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
