import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CHURCH_INFO as defaultChurchInfo,
  BRANCHES as defaultBranches,
  UPCOMING_EVENTS as defaultEvents,
  MINISTRIES as defaultMinistries,
  SPONSORSHIP_PROJECTS as defaultProjects,
  FAQS as defaultFaqs,
  LEADERSHIP as defaultLeadership,
  CHURCH_COLORS as defaultChurchColors,
  DEFAULT_SPONSORSHIP_STATS as defaultSponsorshipStats,
  DEFAULT_SPONSORSHIP_SETTINGS as defaultSponsorshipSettings,
  Branch,
  EventItem,
  MinistryItem,
  SponsorshipProject,
  SponsorshipStat,
  SponsorshipSettings,
  FAQItem,
  GivingConfig,
  LeadershipMember,
  ChurchColor,
} from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { normalizeFirestoreEvent, toFirestoreEvent, sortEventsChronologically } from '../utils/eventAdapter';

export type ChurchInfoType = typeof defaultChurchInfo;

export interface PrayerItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  isConfidential: boolean;
  timestamp: string;
  status: 'new' | 'prayed' | 'responded';
  pastoralNotes?: string;
}

export interface ChurchThemeSettings {
  accentColor: 'gold' | 'amber' | 'emerald' | 'flame';
  showAnnouncementBanner: boolean;
  announcementText: string;
  announcementBadge: string;
  enableLiveStreamBadge: boolean;
  enableRadioPlayer: boolean;
  heroHeadline: string;
  heroSubtitle: string;
}

export interface ChurchContextType {
  churchInfo: ChurchInfoType;
  branches: Branch[];
  events: EventItem[];
  ministries: MinistryItem[];
  projects: SponsorshipProject[];
  sponsorshipStats: SponsorshipStat[];
  sponsorshipSettings: SponsorshipSettings;
  faqs: FAQItem[];
  leadership: LeadershipMember[];
  churchColors: ChurchColor[];
  themeSettings: ChurchThemeSettings;
  prayerRequests: PrayerItem[];
  
  // Actions (Local state + Global Firestore sync)
  updateChurchInfo: (info: Partial<ChurchInfoType>) => Promise<void>;
  updateGivingConfig: (config: Partial<GivingConfig>) => Promise<void>;
  updateThemeSettings: (settings: Partial<ChurchThemeSettings>) => Promise<void>;
  
  // Branches
  updateBranches: (branches: Branch[]) => Promise<void>;
  updateBranch: (id: string, branch: Partial<Branch>) => Promise<void>;
  addBranch: (branch: Branch) => Promise<void>;
  deleteBranch: (id: string) => Promise<void>;
  
  // Events
  updateEvents: (events: EventItem[]) => Promise<void>;
  updateEvent: (id: string, event: Partial<EventItem>) => Promise<void>;
  addEvent: (event: EventItem) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  
  // Ministries
  updateMinistries: (ministries: MinistryItem[]) => Promise<void>;
  updateMinistry: (id: string, ministry: Partial<MinistryItem>) => Promise<void>;
  addMinistry: (ministry: MinistryItem) => Promise<void>;
  deleteMinistry: (id: string) => Promise<void>;

  // Projects & Sponsorship
  updateProjects: (projects: SponsorshipProject[]) => Promise<void>;
  updateProject: (id: string, project: Partial<SponsorshipProject>) => Promise<void>;
  addProject: (project: SponsorshipProject) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateSponsorshipStats: (stats: SponsorshipStat[]) => Promise<void>;
  updateSponsorshipStat: (id: string, stat: Partial<SponsorshipStat>) => Promise<void>;
  updateSponsorshipSettings: (settings: Partial<SponsorshipSettings>) => Promise<void>;

  // FAQs
  updateFaqs: (faqs: FAQItem[]) => Promise<void>;
  addFaq: (faq: FAQItem) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;

  // Prayers
  addPrayerRequest: (request: Omit<PrayerItem, 'id' | 'timestamp' | 'status'>) => Promise<void>;
  updatePrayerStatus: (id: string, status: PrayerItem['status'], notes?: string) => Promise<void>;
  deletePrayerRequest: (id: string) => Promise<void>;

  // Reset
  resetToDefaults: () => Promise<void>;
}

const defaultThemeSettings: ChurchThemeSettings = {
  accentColor: 'gold',
  showAnnouncementBanner: true,
  announcementBadge: '2026 Mandate',
  announcementText: 'Divine Manifestation: Touching Lives Worldwide across Accra & Beyond',
  enableLiveStreamBadge: true,
  enableRadioPlayer: true,
  heroHeadline: 'Where Impossibilities Become Divine Reality',
  heroSubtitle: 'Rhema Inner Court Gospel Church (Worldwide) is a sacred sanctuary dedicated to perfecting the saints, empowering families, and taking territories through the unadulterated word of God.',
};

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const ChurchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [churchInfo, setChurchInfo] = useState<ChurchInfoType>(defaultChurchInfo);
  const [branches, setBranches] = useState<Branch[]>(defaultBranches);
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);
  const [ministries, setMinistries] = useState<MinistryItem[]>(defaultMinistries);
  const [projects, setProjects] = useState<SponsorshipProject[]>(defaultProjects);
  const [sponsorshipStats, setSponsorshipStatsState] = useState<SponsorshipStat[]>(defaultSponsorshipStats);
  const [sponsorshipSettings, setSponsorshipSettingsState] = useState<SponsorshipSettings>(defaultSponsorshipSettings);
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);
  const [leadership] = useState<LeadershipMember[]>(defaultLeadership);
  const [churchColors] = useState<ChurchColor[]>(defaultChurchColors);
  const [themeSettings, setThemeSettingsState] = useState<ChurchThemeSettings>(defaultThemeSettings);
  const [prayerRequests, setPrayerRequests] = useState<PrayerItem[]>([]);

  // -------------------------------------------------------------
  // Global Real-time Firestore Subscriptions
  // -------------------------------------------------------------

  // 1. Events Subscription
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(
        collection(db, 'events'),
        (snapshot) => {
          if (snapshot && !snapshot.empty) {
            const fetched = snapshot.docs.map((docSnap) =>
              normalizeFirestoreEvent({ id: docSnap.id, ...docSnap.data() })
            );
            const sorted = sortEventsChronologically(fetched);
            setEvents(sorted);
          }
        },
        (error) => {
          console.warn('Firestore events live sync note:', error);
        }
      );
      return () => unsub();
    } catch (err) {
      console.warn('Events subscription error:', err);
    }
  }, []);

  // 2. Branches Subscription
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(
        collection(db, 'branches'),
        (snapshot) => {
          if (snapshot && !snapshot.empty) {
            const fetched = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as Branch[];
            setBranches(fetched);
          }
        },
        (error) => console.warn('Branches live sync note:', error)
      );
      return () => unsub();
    } catch (err) {
      console.warn('Branches subscription error:', err);
    }
  }, []);

  // 3. Ministries Subscription
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(
        collection(db, 'ministries'),
        (snapshot) => {
          if (snapshot && !snapshot.empty) {
            const fetched = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as MinistryItem[];
            setMinistries(fetched);
          }
        },
        (error) => console.warn('Ministries live sync note:', error)
      );
      return () => unsub();
    } catch (err) {
      console.warn('Ministries subscription error:', err);
    }
  }, []);

  // 4. Sponsorship Projects Subscription
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(
        collection(db, 'sponsorshipProjects'),
        (snapshot) => {
          if (snapshot && !snapshot.empty) {
            const fetched = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as SponsorshipProject[];
            setProjects(fetched);
          }
        },
        (error) => console.warn('Projects live sync note:', error)
      );
      return () => unsub();
    } catch (err) {
      console.warn('Projects subscription error:', err);
    }
  }, []);

  // 5. FAQs Subscription
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(
        collection(db, 'faqs'),
        (snapshot) => {
          if (snapshot && !snapshot.empty) {
            const fetched = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as FAQItem[];
            setFaqs(fetched);
          }
        },
        (error) => console.warn('FAQs live sync note:', error)
      );
      return () => unsub();
    } catch (err) {
      console.warn('FAQs subscription error:', err);
    }
  }, []);

  // 6. Prayers Subscription
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(
        collection(db, 'prayers'),
        (snapshot) => {
          if (snapshot && !snapshot.empty) {
            const fetched = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as PrayerItem[];
            // Sort newest first
            fetched.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setPrayerRequests(fetched);
          }
        },
        (error) => console.warn('Prayers live sync note:', error)
      );
      return () => unsub();
    } catch (err) {
      console.warn('Prayers subscription error:', err);
    }
  }, []);

  // 7. Global Settings (Church Info, Theme, Sponsorship Settings)
  useEffect(() => {
    if (!db) return;
    try {
      const unsubInfo = onSnapshot(
        doc(db, 'settings', 'churchInfo'),
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setChurchInfo((prev) => ({
              ...prev,
              ...data,
              contact: { ...prev.contact, ...(data.contact || {}) },
              giving: { ...prev.giving, ...(data.giving || {}) },
            }));
          }
        },
        (error) => console.warn('ChurchInfo live sync note:', error)
      );

      const unsubTheme = onSnapshot(
        doc(db, 'settings', 'themeSettings'),
        (docSnap) => {
          if (docSnap.exists()) {
            setThemeSettingsState((prev) => ({ ...prev, ...docSnap.data() }));
          }
        },
        (error) => console.warn('Theme live sync note:', error)
      );

      const unsubSponsorship = onSnapshot(
        doc(db, 'settings', 'sponsorship'),
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.stats) setSponsorshipStatsState(data.stats);
            if (data.settings) setSponsorshipSettingsState((prev) => ({ ...prev, ...data.settings }));
          }
        },
        (error) => console.warn('Sponsorship settings live sync note:', error)
      );

      return () => {
        unsubInfo();
        unsubTheme();
        unsubSponsorship();
      };
    } catch (err) {
      console.warn('Settings subscription error:', err);
    }
  }, []);

  // -------------------------------------------------------------
  // Global Actions (Mutate state & sync to Firestore)
  // -------------------------------------------------------------

  const updateChurchInfo = async (info: Partial<ChurchInfoType>) => {
    const updated: ChurchInfoType = {
      ...churchInfo,
      ...info,
      contact: { ...churchInfo.contact, ...(info.contact || {}) },
      giving: { ...churchInfo.giving, ...(info.giving || {}) },
    };
    setChurchInfo(updated);
    try {
      if (db) {
        await setDoc(doc(db, 'settings', 'churchInfo'), updated, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync church info to Firestore:', err);
    }
  };

  const updateGivingConfig = async (config: Partial<GivingConfig>) => {
    const updatedGiving = { ...churchInfo.giving, ...config };
    setChurchInfo((prev) => ({ ...prev, giving: updatedGiving }));
    try {
      if (db) {
        await setDoc(doc(db, 'settings', 'churchInfo'), { giving: updatedGiving }, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync giving config to Firestore:', err);
    }
  };

  const updateThemeSettings = async (settings: Partial<ChurchThemeSettings>) => {
    const updated = { ...themeSettings, ...settings };
    setThemeSettingsState(updated);
    try {
      if (db) {
        await setDoc(doc(db, 'settings', 'themeSettings'), updated, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync theme settings to Firestore:', err);
    }
  };

  // Branches CRUD
  const updateBranches = async (newBranches: Branch[]) => {
    setBranches(newBranches);
  };

  const updateBranch = async (id: string, branchUpdate: Partial<Branch>) => {
    setBranches((prev) => prev.map((b) => (b.id === id ? { ...b, ...branchUpdate } : b)));
    try {
      if (db) {
        await setDoc(doc(db, 'branches', id), branchUpdate, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync branch update to Firestore:', err);
    }
  };

  const addBranch = async (newBranch: Branch) => {
    setBranches((prev) => [...prev, newBranch]);
    try {
      if (db) {
        await setDoc(doc(db, 'branches', newBranch.id), newBranch);
      }
    } catch (err) {
      console.warn('Could not sync added branch to Firestore:', err);
    }
  };

  const deleteBranch = async (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
    try {
      if (db) {
        await deleteDoc(doc(db, 'branches', id));
      }
    } catch (err) {
      console.warn('Could not sync deleted branch to Firestore:', err);
    }
  };

  // Events CRUD
  const updateEvents = async (newEvents: EventItem[]) => {
    setEvents(newEvents);
  };
  
  const addEvent = async (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
    try {
      if (db) {
        const payload = toFirestoreEvent(newEvent);
        if (newEvent.id && !newEvent.id.startsWith('ev-')) {
          await setDoc(doc(db, 'events', newEvent.id), payload);
        } else {
          const docRef = await addDoc(collection(db, 'events'), payload);
          newEvent.id = docRef.id;
        }
      }
    } catch (err) {
      console.warn('Could not sync added event to Firestore:', err);
    }
  };

  const updateEvent = async (id: string, eventUpdate: Partial<EventItem>) => {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, ...eventUpdate } : ev)));
    try {
      if (db) {
        const existing = events.find((e) => e.id === id);
        const merged = { ...existing, ...eventUpdate, id };
        const payload = toFirestoreEvent(merged);
        await setDoc(doc(db, 'events', id), payload, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync updated event to Firestore:', err);
    }
  };

  const deleteEvent = async (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    try {
      if (db) {
        await deleteDoc(doc(db, 'events', id));
      }
    } catch (err) {
      console.warn('Could not sync deleted event to Firestore:', err);
    }
  };

  // Ministries CRUD
  const updateMinistries = async (newMinistries: MinistryItem[]) => {
    setMinistries(newMinistries);
  };

  const updateMinistry = async (id: string, ministryUpdate: Partial<MinistryItem>) => {
    setMinistries((prev) => prev.map((m) => (m.id === id ? { ...m, ...ministryUpdate } : m)));
    try {
      if (db) {
        await setDoc(doc(db, 'ministries', id), ministryUpdate, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync ministry update to Firestore:', err);
    }
  };

  const addMinistry = async (newMin: MinistryItem) => {
    setMinistries((prev) => [...prev, newMin]);
    try {
      if (db) {
        await setDoc(doc(db, 'ministries', newMin.id), newMin);
      }
    } catch (err) {
      console.warn('Could not sync added ministry to Firestore:', err);
    }
  };

  const deleteMinistry = async (id: string) => {
    setMinistries((prev) => prev.filter((m) => m.id !== id));
    try {
      if (db) {
        await deleteDoc(doc(db, 'ministries', id));
      }
    } catch (err) {
      console.warn('Could not sync deleted ministry to Firestore:', err);
    }
  };

  // Projects & Sponsorship CRUD
  const updateProjects = async (newProjects: SponsorshipProject[]) => {
    setProjects(newProjects);
  };

  const updateProject = async (id: string, projectUpdate: Partial<SponsorshipProject>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...projectUpdate } : p)));
    try {
      if (db) {
        await setDoc(doc(db, 'sponsorshipProjects', id), projectUpdate, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync project update to Firestore:', err);
    }
  };

  const addProject = async (newProj: SponsorshipProject) => {
    setProjects((prev) => [newProj, ...prev]);
    try {
      if (db) {
        await setDoc(doc(db, 'sponsorshipProjects', newProj.id), newProj);
      }
    } catch (err) {
      console.warn('Could not sync added project to Firestore:', err);
    }
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      if (db) {
        await deleteDoc(doc(db, 'sponsorshipProjects', id));
      }
    } catch (err) {
      console.warn('Could not sync deleted project to Firestore:', err);
    }
  };

  const updateSponsorshipStats = async (newStats: SponsorshipStat[]) => {
    setSponsorshipStatsState(newStats);
    try {
      if (db) {
        await setDoc(doc(db, 'settings', 'sponsorship'), { stats: newStats }, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync stats to Firestore:', err);
    }
  };

  const updateSponsorshipStat = async (id: string, statUpdate: Partial<SponsorshipStat>) => {
    const updated = sponsorshipStats.map((s) => (s.id === id ? { ...s, ...statUpdate } : s));
    setSponsorshipStatsState(updated);
    try {
      if (db) {
        await setDoc(doc(db, 'settings', 'sponsorship'), { stats: updated }, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync stat update to Firestore:', err);
    }
  };

  const updateSponsorshipSettings = async (settingsUpdate: Partial<SponsorshipSettings>) => {
    const updated = { ...sponsorshipSettings, ...settingsUpdate };
    setSponsorshipSettingsState(updated);
    try {
      if (db) {
        await setDoc(doc(db, 'settings', 'sponsorship'), { settings: updated }, { merge: true });
      }
    } catch (err) {
      console.warn('Could not sync sponsorship settings to Firestore:', err);
    }
  };

  // FAQs CRUD
  const updateFaqs = async (newFaqs: FAQItem[]) => {
    setFaqs(newFaqs);
  };

  const addFaq = async (newFaq: FAQItem) => {
    setFaqs((prev) => [...prev, newFaq]);
    try {
      if (db) {
        await setDoc(doc(db, 'faqs', newFaq.id), newFaq);
      }
    } catch (err) {
      console.warn('Could not sync added FAQ to Firestore:', err);
    }
  };

  const deleteFaq = async (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    try {
      if (db) {
        await deleteDoc(doc(db, 'faqs', id));
      }
    } catch (err) {
      console.warn('Could not sync deleted FAQ to Firestore:', err);
    }
  };

  // Prayers (Submitted globally by visitors, managed by Pastors)
  const addPrayerRequest = async (req: Omit<PrayerItem, 'id' | 'timestamp' | 'status'>) => {
    const tempId = 'pr_' + Date.now();
    const newItem: PrayerItem = {
      ...req,
      id: tempId,
      timestamp: new Date().toISOString(),
      status: 'new',
    };
    setPrayerRequests((prev) => [newItem, ...prev]);
    trackEvent('conversion', 'prayer_request_submitted', req.category);

    try {
      if (db) {
        const docRef = await addDoc(collection(db, 'prayers'), {
          name: req.name,
          phone: req.phone,
          email: req.email || '',
          category: req.category,
          message: req.message,
          isConfidential: req.isConfidential !== false,
          timestamp: newItem.timestamp,
          status: 'new',
        });
        newItem.id = docRef.id;
      }
    } catch (err) {
      console.warn('Could not save prayer request to Firestore:', err);
    }
  };

  const updatePrayerStatus = async (id: string, status: PrayerItem['status'], notes?: string) => {
    setPrayerRequests((prev) =>
      prev.map((pr) =>
        pr.id === id ? { ...pr, status, ...(notes !== undefined ? { pastoralNotes: notes } : {}) } : pr
      )
    );
    try {
      if (db) {
        await setDoc(
          doc(db, 'prayers', id),
          { status, ...(notes !== undefined ? { pastoralNotes: notes } : {}) },
          { merge: true }
        );
      }
    } catch (err) {
      console.warn('Could not update prayer status in Firestore:', err);
    }
  };

  const deletePrayerRequest = async (id: string) => {
    setPrayerRequests((prev) => prev.filter((pr) => pr.id !== id));
    try {
      if (db) {
        await deleteDoc(doc(db, 'prayers', id));
      }
    } catch (err) {
      console.warn('Could not delete prayer request from Firestore:', err);
    }
  };

  const resetToDefaults = async () => {
    setChurchInfo(defaultChurchInfo);
    setBranches(defaultBranches);
    setEvents(defaultEvents);
    setMinistries(defaultMinistries);
    setProjects(defaultProjects);
    setSponsorshipStatsState(defaultSponsorshipStats);
    setSponsorshipSettingsState(defaultSponsorshipSettings);
    setFaqs(defaultFaqs);
    setThemeSettingsState(defaultThemeSettings);
  };

  return (
    <ChurchContext.Provider
      value={{
        churchInfo,
        branches,
        events,
        ministries,
        projects,
        sponsorshipStats,
        sponsorshipSettings,
        faqs,
        leadership,
        churchColors,
        themeSettings,
        prayerRequests,
        updateChurchInfo,
        updateGivingConfig,
        updateThemeSettings,
        updateBranches,
        updateBranch,
        addBranch,
        deleteBranch,
        updateEvents,
        updateEvent,
        addEvent,
        deleteEvent,
        updateMinistries,
        updateMinistry,
        addMinistry,
        deleteMinistry,
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
        addPrayerRequest,
        updatePrayerStatus,
        deletePrayerRequest,
        resetToDefaults,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
};
