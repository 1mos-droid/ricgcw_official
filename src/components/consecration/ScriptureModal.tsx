import { BookOpen, X, Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ScriptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptureRef: string;
  scriptureTitle?: string;
  scriptureText: string;
}

export const ScriptureModal = ({
  isOpen,
  onClose,
  scriptureRef,
  scriptureTitle,
  scriptureText,
}: ScriptureModalProps) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('large');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${scriptureRef}\n\n${scriptureText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-950/50 text-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Gold Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-500/20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>Holy Scripture Reading</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-amber-200 tracking-wide mt-0.5">
                {scriptureRef}
              </h2>
              {scriptureTitle && (
                <p className="text-xs text-slate-400">{scriptureTitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close scripture modal"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Bar */}
        <div className="px-5 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Font Size:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                fontSize === 'normal' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                fontSize === 'large' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800'
              }`}
            >
              Large
            </button>
            <button
              onClick={() => setFontSize('huge')}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                fontSize === 'huge' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:bg-slate-800'
              }`}
            >
              Extra Large
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Scripture'}</span>
          </button>
        </div>

        {/* Modal Body: Scripture Text */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-gradient-to-b from-slate-950 via-[#070c18] to-slate-950">
          <div
            className={`font-serif leading-relaxed text-amber-50/90 whitespace-pre-line tracking-wide border-l-2 border-amber-500/40 pl-5 my-2 ${
              fontSize === 'normal'
                ? 'text-sm'
                : fontSize === 'large'
                ? 'text-base sm:text-lg'
                : 'text-lg sm:text-xl'
            }`}
          >
            {scriptureText}
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-amber-400/80 italic font-serif">
            "The grass withereth, the flower fadeth: but the word of our God shall stand for ever." — Isaiah 40:8
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
