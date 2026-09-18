import React from 'react';
import { Heart, Globe2, ShieldCheck, Star, Target, Quote, BookOpen } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';

const iconMap: Record<string, any> = {
  Heart,
  Globe2,
  ShieldCheck,
  Target,
};

export const About = () => {
  const { churchInfo } = useChurch();

  const coreValues = (churchInfo.coreValues || []).map((val) => ({
    ...val,
    icon: iconMap[val.iconName] || Heart,
  }));

  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-8 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Top Story / Identity Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Our Divine Foundation
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-950 tracking-tight leading-tight">
                Rooted in Scripture. <br />
                <span className="text-amber-700 italic">Empowered by the Spoken Word.</span>
              </h2>
            </div>

            {/* Scriptural Anchor Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-300 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <Star className="w-4 h-4 text-amber-600" /> Scriptural Anchor
              </div>
              <p className="text-base sm:text-lg font-serif italic text-slate-900 leading-relaxed">
                "{churchInfo.scripturalAnchor.verse}"
              </p>
              <p className="text-xs font-bold text-amber-700 uppercase font-mono tracking-wider">
                ({churchInfo.scripturalAnchor.reference})
              </p>
            </div>

            {/* Motto & Slogan */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                  <Quote className="w-4 h-4 text-amber-600" /> Kingdom Motto
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {churchInfo.motto?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>
                        <strong>{item.title}</strong> {item.scripture ? `(${item.scripture})` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-orange-700 font-bold text-xs uppercase tracking-wider">
                  <Quote className="w-4 h-4 text-orange-600" /> Prophetic Slogan
                </div>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  "{churchInfo.slogan}"
                </p>
                <div className="pt-2">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Church Vision:</p>
                  <p className="text-xs text-slate-700 mt-0.5">{churchInfo.vision}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Banner */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden p-2.5 bg-white border border-slate-200 shadow-xl space-y-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={IMAGES.theme}
                  alt={`${churchInfo.themeYear} Theme Banner`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-800 border border-amber-500/20 inline-block">
                  {churchInfo.themeYear} Theme Banner
                </span>
                <h3 className="font-serif font-bold text-lg text-slate-900">{churchInfo.themeTitle}</h3>
                <p className="text-xs text-slate-600">{churchInfo.themeSubtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values 4-Grid */}
        {coreValues.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-950">
                The Four Pillars of Our Calling
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Guiding principles shaping our discipleship, ministries, and community engagement
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all space-y-3"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${val.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif font-bold text-lg text-slate-950">{val.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
