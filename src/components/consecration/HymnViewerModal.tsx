import { Music, X, Sparkles, Volume2, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { HYMNS_AND_LITURGY } from '../../data/consecrationData';

interface HymnViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HymnViewerModal = ({ isOpen, onClose }: HymnViewerModalProps) => {
  const [copied, setCopied] = useState(false);
  const hymn = HYMNS_AND_LITURGY.recessionalHymn;

  if (!isOpen) return null;

  const handleCopy = () => {
    const fullHymnText = `${hymn.title}\nBy ${hymn.author}\n\n` +
      hymn.stanzas
        .map(
          (s) =>
            `Stanza ${s.number}:\n${s.lines.join('\n')}\n\nRefrain:\n${hymn.chorus.join('\n')}`
        )
        .join('\n\n');

    navigator.clipboard.writeText(fullHymnText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-950/50 text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Gold Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-500/20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>Recessional Hymn of Doxology</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-amber-200 tracking-wide mt-0.5">
                {hymn.title}
              </h2>
              <p className="text-xs text-slate-400">
                Author: {hymn.author} • Tune: {hymn.tune}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close hymn modal"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hymn Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950">
          {/* Sing along note */}
          <div className="bg-amber-950/40 border border-amber-500/20 rounded-xl p-3.5 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Sing triumphantly in faith as the sacred procession recesses from the altar</span>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 ml-2 shrink-0 font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Stanzas & Refrain */}
          <div className="space-y-6">
            {hymn.stanzas.map((stanza) => (
              <div
                key={stanza.number}
                className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 hover:border-amber-500/30 transition-all space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                    {stanza.number}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Stanza {stanza.number}
                  </span>
                </div>

                <div className="font-serif text-slate-100 leading-relaxed text-base sm:text-lg pl-8 space-y-1">
                  {stanza.lines.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Refrain / Chorus Card */}
            <div className="bg-gradient-to-br from-amber-950/40 to-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 text-center space-y-3 shadow-lg shadow-amber-950/30">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CHORUS / REFRAIN (All Sing)</span>
              </div>

              <div className="font-serif text-amber-100 font-semibold text-lg sm:text-xl leading-relaxed space-y-1.5 pt-2">
                {hymn.chorus.map((line, idx) => (
                  <p key={idx} className={idx % 2 === 0 ? 'text-amber-200' : 'text-amber-100/90'}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 italic">
            "Praise the Lord, let the people rejoice!"
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Close Hymnal
          </button>
        </div>
      </div>
    </div>
  );
};
