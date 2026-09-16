import { useState } from 'react';
import { Shield, Palette, BookOpen, Scroll, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';

export const Identity = () => {
  const { churchColors, churchInfo } = useChurch();
  const [selectedColor, setSelectedColor] = useState(churchColors[1] || churchColors[0]);

  const definitions = churchInfo.definitions || [];
  const loyalty = churchInfo.loyaltyCulture || {
    quote: "RICGCW believes in our HEAD PASTOR and the ASSOCIATES, also the LEADERS and all the DEPARTMENTAL HEAD EXECUTIVES as well as all the MEMBERS too. We do not speak evil things and will not allow anybody from within or outside to speak evil about them — internally (inside the church) or externally (outside the church). This is the way we think and do our things as a LOYAL PEOPLE unto God.",
    scripture: 'Proverbs 21:21',
  };

  return (
    <section id="identity" className="relative py-24 px-4 sm:px-6 md:px-8 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Culture of Loyalty */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5 text-amber-600" /> Church Culture
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-950 tracking-tight">
                A Consecrated Culture of <br />
                <span className="text-amber-700 italic">Honor & Loyalty.</span>
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-md space-y-4">
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed italic font-serif">
                "{loyalty.quote}"
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-amber-800 font-bold uppercase tracking-wider">
                <span>Core Value: Honor & Protection</span>
                <span>{loyalty.scripture}</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              We cultivate a godly atmosphere where mutual respect, spiritual covering, and sincere brotherly love preserve the peace and power of the Holy Spirit.
            </p>
          </div>

          {/* Visual Meaning Box */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Scroll className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">Etymology of RICGCW</h3>
                  <p className="text-xs text-amber-400/90 font-mono">Spiritual Name Breakdown</p>
                </div>
              </div>

              <div className="space-y-3">
                {definitions.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
                    <p className="font-bold font-serif text-xs text-amber-300">{item.term}</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Church Colors & Spiritual Meanings */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
              <Palette className="w-3.5 h-3.5 text-amber-600" /> Sanctuary Symbolism
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
              The 5 Sacred Colors of the Tabernacle
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Each color within our ministry carries deep biblical revelation, prophetic identity, and spiritual symbolism.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {churchColors.map((col) => {
              const isSelected = selectedColor.name === col.name;
              return (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col)}
                  className={`p-5 rounded-3xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-8 h-8 rounded-full border border-slate-300 shadow-sm"
                      style={{ backgroundColor: col.hex }}
                    />
                    {isSelected && <Check className="w-4 h-4 text-amber-700" />}
                  </div>
                  <h4 className="font-bold text-base text-slate-950">{col.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono uppercase">{col.biblicalReference.split(',')[0]}</p>
                </button>
              );
            })}
          </div>

          {/* Selected Color Breakdown */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl border-2 border-slate-300 shadow-md shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-xl text-slate-950">{selectedColor.name} Color</h3>
                  <span className="text-xs font-mono font-bold text-slate-500">{selectedColor.hex}</span>
                </div>
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Biblical Anchor: {selectedColor.biblicalReference}
                </p>
                <p className="text-sm text-slate-700 font-medium">{selectedColor.spiritualMeaning}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Identity;
