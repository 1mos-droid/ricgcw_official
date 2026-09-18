import React from 'react';
import { Quote, Sparkles, Heart, CheckCircle2, Phone, MessageCircle, ArrowRight, MapPin } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import { trackEvent } from '../utils/analytics';

interface WelcomeOverseerProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: () => void;
}

export const WelcomeOverseer = ({ onOpenPrayerModal, onOpenBranchModal }: WelcomeOverseerProps) => {
  const { churchInfo, branches } = useChurch();
  const branchNames = branches.map((b) => b.name.split(' ')[0]).join(', ');
  const founder = churchInfo.founder || {
    name: 'Rev. Nicholas Dobeng',
    title: 'General Overseer & Founder',
    quote: "We don't just build church buildings; we build people who build the kingdom of God across every sphere of life.",
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 md:px-8 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header Tag */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Apostolic Welcome &amp; Shepherding
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-950 tracking-tight">
            Welcome to the Inner Court of the King
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
            "{founder.quote}"
          </p>
        </div>

        {/* Overseer Feature Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Photos Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Primary Overseer Image Card */}
              <div className="rounded-3xl overflow-hidden p-2.5 bg-white border border-slate-200 shadow-xl">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <img
                    src={IMAGES.overseer}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
                      {founder.title}
                    </p>
                    <h3 className="text-2xl font-bold font-serif">{founder.name}</h3>
                  </div>
                </div>
              </div>

              {/* Overlapping Secondary Card: Pastor & Wife */}
              <div className="absolute -bottom-6 -right-4 w-44 sm:w-52 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl hidden sm:block">
                <div className="aspect-square rounded-xl overflow-hidden mb-2">
                  <img
                    src={IMAGES.couple2}
                    alt="Rev. & Mrs. Dobeng"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-1 pb-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">First Family of RICGCW</p>
                  <p className="text-xs font-bold text-slate-900">Rev. & Mrs. Dobeng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Overseer Address / Bio Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
                  <Quote className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
                    A Prophetic Mandate for Our Generation
                  </h3>
                  <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">
                    From the General Overseer's Desk
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Beloved in Christ, you are heartily welcome to <strong>{churchInfo.name}</strong>. God has uniquely positioned this ministry to be an altar of sacred encounter where ordinary men and women are transformed into royal champions of faith.
                </p>
                <p>
                  As recorded in <em>{churchInfo.scripturalAnchor.reference}</em>, when Queen Esther stepped into the inner court of the King, she obtained royal favor that altered the destiny of an entire nation. In this house, we believe in the absolute reality of God's spoken word (Rhema), the unquenchable fire of the Holy Spirit, and the power of sacrificial praise.
                </p>
                <p>
                  Whether you are seeking salvation, deeper discipleship, physical or emotional healing, marital restoration, or financial breakthrough, there is an open heaven waiting for you in any of our sanctuaries in <strong>{branchNames || 'Accra and beyond'}</strong>.
                </p>
              </div>
            </div>

            {/* Core Commitments List */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {(churchInfo.coreCommitments || [
                'Uncompromised Biblical Gospel Preaching',
                'Prophetic Deliverance & Breakthrough Altars',
                'Warm Community & Loving Fellowship',
                'Comprehensive Care for Spiritual & Physical Needs',
              ]).map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">{point}</span>
                </div>
              ))}
            </div>

            {/* Pastoral Signature & CTAs */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif font-bold text-lg text-slate-950">{founder.name}</p>
                <p className="text-xs text-slate-500">{founder.title}, {churchInfo.shortName}</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${churchInfo.contact.phone}`}
                  onClick={() => trackEvent('conversion', 'call_hotline', 'Overseer Section')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Hotline</span>
                </a>

                <button
                  onClick={() => {
                    trackEvent('conversion', 'prayer_modal_opened', 'Overseer Section');
                    onOpenPrayerModal?.();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Send Prayer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeOverseer;
