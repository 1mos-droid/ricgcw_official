import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Copy,
  Check,
  X,
  Share2,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Palette,
  LayoutTemplate,
} from 'lucide-react';
import { QRCanvaCard } from './QRCanvaCard';

interface QRCodeHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPath?: string;
}

const getInitialBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.endsWith('.local')) {
      return 'https://ricgcw.me';
    }
    return window.location.origin;
  }
  return 'https://ricgcw.me';
};

export const QRCodeHubModal = ({ isOpen, onClose, defaultPath = '/consecration' }: QRCodeHubModalProps) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'canva' | 'raw-qr'>('canva');
  const [activeTheme, setActiveTheme] = useState<'gold' | 'dark' | 'classic'>('gold');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [selectedPath, setSelectedPath] = useState(defaultPath);

  const baseUrl = getInitialBaseUrl();
  const fullUrl = `${baseUrl}${selectedPath}`;

  const availablePaths = [
    { path: '/consecration', label: 'Primary Lineup (/consecration)' },
    { path: '/consecration-service', label: 'Consecration Service (/consecration-service)' },
    { path: '/order-of-service', label: 'Order of Service (/order-of-service)' },
    { path: '/lineup', label: 'Short URL (/lineup)' },
    { path: '/program', label: 'Program Bulletin (/program)' },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const generateQR = async () => {
      try {
        let darkColor = '#070c18';
        let lightColor = '#ffffff';

        if (activeTheme === 'gold') {
          darkColor = '#0c1427';
          lightColor = '#fef3c7'; // Gold tinted warm background
        } else if (activeTheme === 'dark') {
          darkColor = '#fbbf24'; // Amber Gold QR
          lightColor = '#070c18'; // Sanctuary Navy
        } else {
          darkColor = '#000000';
          lightColor = '#ffffff';
        }

        const url = await QRCode.toDataURL(fullUrl, {
          width: 800,
          margin: 2,
          color: {
            dark: darkColor,
            light: lightColor,
          },
          errorCorrectionLevel: 'H',
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    generateQR();
  }, [isOpen, fullUrl, activeTheme]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPNG = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `RICGCW-Consecration-Program-QR-${activeTheme}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSVG = async () => {
    try {
      let darkColor = '#070c18';
      let lightColor = '#ffffff';
      if (activeTheme === 'gold') {
        darkColor = '#0c1427';
        lightColor = '#fef3c7';
      } else if (activeTheme === 'dark') {
        darkColor = '#fbbf24';
        lightColor = '#070c18';
      }

      const svgString = await QRCode.toString(fullUrl, {
        type: 'svg',
        margin: 2,
        color: { dark: darkColor, light: lightColor },
        errorCorrectionLevel: 'H',
      });

      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `RICGCW-Consecration-Program-QR-${activeTheme}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Error downloading SVG:', e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RICGCW Consecration & Ordination Service Program Lineup',
          text: 'Access the official digital program lineup for the Consecration and Ordination Service.',
          url: fullUrl,
        });
      } catch (err) {
        // Share cancelled or not supported
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-amber-500/40 rounded-3xl shadow-2xl shadow-amber-950/60 text-slate-100 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Ornate Gold Top Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 animate-pulse" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-amber-500/20 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-amber-300 tracking-wide">
                Digital Program QR Code & Canva Hub
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Official framed Canva posters and unlisted QR codes for church media & print
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close QR modal"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="px-5 pt-3 pb-1 border-b border-slate-800/80 bg-slate-950/90 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('canva')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'canva'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Custom Canva Poster Frame</span>
          </button>

          <button
            onClick={() => setActiveTab('raw-qr')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'raw-qr'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Standalone QR Code Exporter</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-gradient-to-b from-slate-950 via-[#070c18] to-slate-950">
          {/* Unlisted Notice */}
          <div className="bg-amber-950/30 border border-amber-500/20 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-amber-200/90">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-300">Unlisted Endpoint Protected: </span>
              This page is hidden from website menus. Attendees open it directly by scanning this QR code on church brochures or projector screens.
            </div>
          </div>

          {/* TAB 1: CUSTOM CANVA CARD PREVIEW & GENERATOR */}
          {activeTab === 'canva' && (
            <div className="space-y-4">
              <QRCanvaCard path={selectedPath} />
            </div>
          )}

          {/* TAB 2: STANDALONE RAW QR EXPORTER */}
          {activeTab === 'raw-qr' && (
            <div className="space-y-6">
              {/* QR Code Card Display */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="relative shrink-0 flex flex-col items-center">
                  <div
                    className={`p-3 rounded-2xl border-2 shadow-xl transition-all duration-300 ${
                      activeTheme === 'gold'
                        ? 'bg-amber-50 border-amber-400 shadow-amber-500/20'
                        : activeTheme === 'dark'
                        ? 'bg-slate-950 border-amber-500/40 shadow-slate-950'
                        : 'bg-white border-slate-300 shadow-slate-900/50'
                    }`}
                  >
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="Consecration Program QR Code"
                        className="w-48 h-48 rounded-lg object-contain"
                      />
                    ) : (
                      <div className="w-48 h-48 flex items-center justify-center text-amber-400">
                        <Sparkles className="w-8 h-8 animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-[10px] text-amber-400/80 font-medium flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    <span>Scan with phone camera</span>
                  </div>
                </div>

                {/* Controls and Details */}
                <div className="space-y-4 w-full text-center sm:text-left">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                      Live Destination
                    </span>
                    <p className="text-sm font-semibold text-amber-200 break-all font-mono mt-0.5 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                      {fullUrl}
                    </p>
                  </div>

                  {/* Endpoint selector */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Select Target Endpoint:
                    </label>
                    <select
                      value={selectedPath}
                      onChange={(e) => setSelectedPath(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
                    >
                      {availablePaths.map((item) => (
                        <option key={item.path} value={item.path}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Theme Selector */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5 justify-center sm:justify-start">
                      <Palette className="w-3 h-3 text-amber-400" />
                      <span>QR Aesthetic Style:</span>
                    </label>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <button
                        type="button"
                        onClick={() => setActiveTheme('gold')}
                        className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all ${
                          activeTheme === 'gold'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        Royal Gold
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTheme('dark')}
                        className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all ${
                          activeTheme === 'dark'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        Midnight Navy
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTheme('classic')}
                        className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all ${
                          activeTheme === 'classic'
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        Classic Print
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">URL Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadPNG}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download QR (PNG)</span>
                </button>

                <button
                  onClick={handleDownloadSVG}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Vector SVG</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share via Phone</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
