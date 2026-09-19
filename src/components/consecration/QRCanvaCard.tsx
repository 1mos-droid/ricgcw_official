import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Crown,
  Sparkles,
  Download,
  Copy,
  Check,
  Smartphone,
  Palette,
  Image as ImageIcon,
  Globe,
  Settings2,
} from 'lucide-react';
import { IMAGES } from '../../data/churchData';

interface QRCanvaCardProps {
  path?: string;
  className?: string;
  showDownloadButton?: boolean;
}

const getInitialBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    // When running locally on dev server, default to production domain so posters are ready for print
    if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.endsWith('.local')) {
      return 'https://ricgcw.me';
    }
    return window.location.origin;
  }
  return 'https://ricgcw.me';
};

export const QRCanvaCard = ({
  path = '/consecration',
  className = '',
  showDownloadButton = true,
}: QRCanvaCardProps) => {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGeneratingFlyer, setIsGeneratingFlyer] = useState(false);
  const [cardTheme, setCardTheme] = useState<'royal-midnight' | 'imperial-gold' | 'sanctuary-white'>('royal-midnight');
  const [customDomain, setCustomDomain] = useState<string>(getInitialBaseUrl());
  const [showDomainSettings, setShowDomainSettings] = useState<boolean>(false);

  // Clean trailing slash on customDomain
  const normalizedBase = customDomain.replace(/\/+$/, '');
  const fullUrl = `${normalizedBase}${path.startsWith('/') ? path : `/${path}`}`;

  // Generate QR Code data URL whenever theme or URL changes
  useEffect(() => {
    const generateQR = async () => {
      try {
        let darkColor = '#070c18';
        let lightColor = '#ffffff';

        if (cardTheme === 'royal-midnight') {
          darkColor = '#070c18';
          lightColor = '#fef3c7'; // warm gold paper
        } else if (cardTheme === 'imperial-gold') {
          darkColor = '#1e1b4b'; // deep indigo
          lightColor = '#ffffff';
        } else {
          darkColor = '#0f172a';
          lightColor = '#ffffff';
        }

        const qr = await QRCode.toDataURL(fullUrl, {
          width: 800,
          margin: 2,
          color: {
            dark: darkColor,
            light: lightColor,
          },
          errorCorrectionLevel: 'H',
        });
        setQrCodeUrl(qr);
      } catch (err) {
        console.error('Failed to generate QR:', err);
      }
    };

    generateQR();
  }, [fullUrl, cardTheme]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // High Resolution (1200 x 1600) Canva Poster Generator
  const handleDownloadCanvaPoster = async () => {
    setIsGeneratingFlyer(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1200;
      const height = 1600;
      canvas.width = width;
      canvas.height = height;

      // 1. Background Fill
      if (cardTheme === 'royal-midnight') {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#040711');
        bgGrad.addColorStop(0.3, '#0c1427');
        bgGrad.addColorStop(0.7, '#070c18');
        bgGrad.addColorStop(1, '#02040a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Ambient Gold Glow
        const aura = ctx.createRadialGradient(width / 2, 450, 50, width / 2, 450, 500);
        aura.addColorStop(0, 'rgba(212, 175, 55, 0.18)');
        aura.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);
      } else if (cardTheme === 'imperial-gold') {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#1a1005');
        bgGrad.addColorStop(0.4, '#2d1c08');
        bgGrad.addColorStop(0.8, '#1a1005');
        bgGrad.addColorStop(1, '#0d0702');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        const aura = ctx.createRadialGradient(width / 2, 500, 50, width / 2, 500, 550);
        aura.addColorStop(0, 'rgba(251, 191, 36, 0.25)');
        aura.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);
      } else {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#ffffff');
        bgGrad.addColorStop(1, '#f8fafc');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Ornate Double Gold Borders
      const isDark = cardTheme !== 'sanctuary-white';
      const borderGold = isDark ? '#d4af37' : '#b45309';
      const goldSubtle = isDark ? 'rgba(212, 175, 55, 0.35)' : 'rgba(180, 83, 9, 0.25)';

      ctx.lineWidth = 6;
      ctx.strokeStyle = borderGold;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      ctx.lineWidth = 2;
      ctx.strokeStyle = goldSubtle;
      ctx.strokeRect(55, 55, width - 110, height - 110);

      // Ornate Corner Flourishes
      const drawCorner = (x: number, y: number, angle: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.strokeStyle = borderGold;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-25, 0);
        ctx.lineTo(25, 0);
        ctx.moveTo(0, -25);
        ctx.lineTo(0, 25);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fillStyle = borderGold;
        ctx.fill();
        ctx.restore();
      };

      drawCorner(70, 70, 0);
      drawCorner(width - 70, 70, Math.PI / 2);
      drawCorner(width - 70, height - 70, Math.PI);
      drawCorner(70, height - 70, -Math.PI / 2);

      // Helper to load image
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
          img.src = src;
        });
      };

      // 3. Draw Church Logo Header
      try {
        const logoImg = await loadImage(IMAGES.logo);
        const logoSize = 150;
        const logoX = width / 2 - logoSize / 2;
        const logoY = 110;

        // Circular clip with gold ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, logoY + logoSize / 2, logoSize / 2 + 8, 0, Math.PI * 2);
        ctx.fillStyle = borderGold;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(width / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        ctx.restore();
      } catch (e) {
        console.warn('Could not render logo in canvas:', e);
      }

      // 4. Church Title & Headers
      ctx.textAlign = 'center';

      // Small Badge
      ctx.fillStyle = isDark ? '#fbbf24' : '#b45309';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('RHEMA INNER COURT GOSPEL CHURCH (WORLDWIDE)', width / 2, 310);

      // Main Event Title
      ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
      ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
      ctx.fillText('Solemn Consecration & Ordination', width / 2, 375);
      ctx.fillText('Official Program Lineup', width / 2, 430);

      // Subtitle / Motto
      ctx.fillStyle = isDark ? '#fef3c7' : '#475569';
      ctx.font = 'italic 24px "Playfair Display", Georgia, serif';
      ctx.fillText('“Esther 5:1 • Inner Court: Where Sacrifices Are Made Unto Heaven”', width / 2, 480);

      // Horizontal Divider Ribbon
      ctx.strokeStyle = goldSubtle;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(200, 515);
      ctx.lineTo(width - 200, 515);
      ctx.stroke();

      // 5. Draw QR Code Frame & Image
      const qrBoxSize = 560;
      const qrBoxX = width / 2 - qrBoxSize / 2;
      const qrBoxY = 560;

      // QR Box Background Card
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 15;
      ctx.fillStyle = isDark ? '#fef3c7' : '#ffffff';
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, [36]);
      ctx.fill();

      ctx.lineWidth = 8;
      ctx.strokeStyle = borderGold;
      ctx.stroke();
      ctx.restore();

      // Draw QR Image inside
      try {
        const qrImg = await loadImage(qrCodeUrl);
        const padding = 40;
        ctx.drawImage(
          qrImg,
          qrBoxX + padding,
          qrBoxY + padding,
          qrBoxSize - padding * 2,
          qrBoxSize - padding * 2
        );

        // Draw Central Gold Crest / Cross Badge in center of QR
        const badgeSize = 90;
        const badgeX = width / 2 - badgeSize / 2;
        const badgeY = qrBoxY + qrBoxSize / 2 - badgeSize / 2;

        ctx.save();
        ctx.fillStyle = isDark ? '#070c18' : '#ffffff';
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, [18]);
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = borderGold;
        ctx.stroke();

        // Draw Cross / Emblem in center
        ctx.fillStyle = borderGold;
        ctx.font = 'bold 44px "Cinzel", serif';
        ctx.fillText('✝', width / 2, badgeY + 60);
        ctx.restore();
      } catch (e) {
        console.warn('Could not draw QR in canvas:', e);
      }

      // 6. Action Callouts below QR
      ctx.fillStyle = isDark ? '#fbbf24' : '#b45309';
      ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('📱 SCAN WITH YOUR PHONE CAMERA', width / 2, 1200);

      ctx.fillStyle = isDark ? '#e2e8f0' : '#334155';
      ctx.font = '24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Instant Access to the 33-Step Consecration Order of Service', width / 2, 1250);

      // Direct URL Box
      const urlBoxWidth = 700;
      const urlBoxHeight = 70;
      const urlBoxX = width / 2 - urlBoxWidth / 2;
      const urlBoxY = 1310;

      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
      ctx.beginPath();
      ctx.roundRect(urlBoxX, urlBoxY, urlBoxWidth, urlBoxHeight, [20]);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = goldSubtle;
      ctx.stroke();

      ctx.fillStyle = isDark ? '#fde68a' : '#1e293b';
      ctx.font = 'bold 26px "Plus Jakarta Sans", monospace';
      ctx.fillText(fullUrl, width / 2, urlBoxY + 45);

      // 7. Footer Seal & Year
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
      ctx.font = '20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('2026 Divine Manifestation • Taking Territories • Perfecting the Saints', width / 2, 1460);

      ctx.fillStyle = isDark ? 'rgba(212, 175, 55, 0.7)' : '#b45309';
      ctx.font = 'italic 18px "Playfair Display", Georgia, serif';
      ctx.fillText('Unlisted Ecclesiastical Digital Liturgy Portal', width / 2, 1500);

      // 8. Download PNG
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `RICGCW-Consecration-Canva-Flyer-${cardTheme}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error rendering Canva poster:', err);
    } finally {
      setIsGeneratingFlyer(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls Bar: Theme & Domain Config */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs no-print">
        {/* Theme Picker */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Theme:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCardTheme('royal-midnight')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                cardTheme === 'royal-midnight'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Royal Midnight
            </button>
            <button
              onClick={() => setCardTheme('imperial-gold')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                cardTheme === 'imperial-gold'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Imperial Velvet
            </button>
            <button
              onClick={() => setCardTheme('sanctuary-white')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                cardTheme === 'sanctuary-white'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Classic Print
            </button>
          </div>
        </div>

        {/* Domain Config Toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setShowDomainSettings(!showDomainSettings)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Target Domain URL</span>
            <Settings2 className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>
        </div>
      </div>

      {/* Expandable Domain Customizer */}
      {showDomainSettings && (
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-amber-500/30 space-y-3 text-xs text-slate-300 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-300">Set QR Target Base Domain:</span>
            <span className="text-[11px] text-slate-400">Default: https://ricgcw.me</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="https://ricgcw.me"
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono text-xs focus:border-amber-400 focus:outline-none w-full"
            />
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setCustomDomain('https://ricgcw.me')}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold"
              >
                Official (ricgcw.me)
              </button>
              {typeof window !== 'undefined' && (
                <button
                  onClick={() => setCustomDomain(window.location.origin)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Current Host
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* THE CANVA POSTER CARD */}
      <div
        className={`relative rounded-3xl p-6 sm:p-8 md:p-10 border-4 shadow-2xl transition-all duration-500 overflow-hidden text-center max-w-lg mx-auto ${
          cardTheme === 'royal-midnight'
            ? 'bg-gradient-to-b from-[#040711] via-[#0c1427] to-[#02040a] border-amber-500/60 shadow-amber-950/60 text-slate-100'
            : cardTheme === 'imperial-gold'
            ? 'bg-gradient-to-b from-[#1a1005] via-[#2d1c08] to-[#0d0702] border-amber-400 shadow-amber-900/60 text-amber-50'
            : 'bg-white border-amber-600/40 shadow-slate-300 text-slate-900'
        }`}
      >
        {/* Inner Gold Foil Framing Line */}
        <div
          className={`absolute inset-3.5 sm:inset-4.5 rounded-2xl border pointer-events-none ${
            cardTheme === 'sanctuary-white'
              ? 'border-amber-600/20'
              : 'border-amber-400/30'
          }`}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Church Logo & Crest */}
        <div className="relative z-10 flex flex-col items-center space-y-3">
          {/* Logo with Golden Crest Ring */}
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-600 shadow-xl shadow-amber-500/30">
              <img
                src={IMAGES.logo}
                alt="Church Logo"
                className="w-full h-full rounded-full object-cover border-2 border-slate-950"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-950 border border-amber-400 flex items-center justify-center text-amber-400 shadow-md">
              <Crown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Church Name & Title */}
          <div>
            <span
              className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest block font-cinzel ${
                cardTheme === 'sanctuary-white' ? 'text-amber-800' : 'text-amber-400'
              }`}
            >
              Rhema Inner Court Gospel Church (Worldwide)
            </span>
            <h3
              className={`text-xl sm:text-2xl font-bold font-serif tracking-tight mt-1 ${
                cardTheme === 'sanctuary-white' ? 'text-slate-950' : 'text-white'
              }`}
            >
              Solemn Consecration & Ordination
            </h3>
            <p
              className={`text-xs sm:text-sm font-serif italic mt-0.5 ${
                cardTheme === 'sanctuary-white' ? 'text-slate-600' : 'text-amber-200/90'
              }`}
            >
              "Inner Court: Where Sacrifices Are Made Unto Heaven"
            </p>
          </div>
        </div>

        {/* Central QR Code Showcase Frame */}
        <div className="relative z-10 my-6 flex justify-center">
          <div
            className={`relative p-4 sm:p-5 rounded-3xl border-2 shadow-2xl transition-all ${
              cardTheme === 'royal-midnight'
                ? 'bg-amber-50 border-amber-400 shadow-amber-500/20'
                : cardTheme === 'imperial-gold'
                ? 'bg-amber-50 border-amber-400 shadow-amber-600/30'
                : 'bg-white border-slate-300 shadow-xl'
            }`}
          >
            {qrCodeUrl ? (
              <div className="relative">
                <img
                  src={qrCodeUrl}
                  alt="Consecration Program QR Code"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-xl"
                />

                {/* Central Crest on the QR Code */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border-2 border-amber-400 shadow-xl flex items-center justify-center text-amber-400">
                    <Crown className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-amber-400">
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Scan Instructions */}
        <div className="relative z-10 space-y-2">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              cardTheme === 'sanctuary-white'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Scan to View Program Lineup</span>
          </div>

          <p
            className={`text-xs max-w-xs mx-auto leading-relaxed ${
              cardTheme === 'sanctuary-white' ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            Point your smartphone camera at this code to immediately open the order of service on your device.
          </p>

          {/* Clean URL Box */}
          <div
            className={`mt-4 p-2.5 rounded-xl border font-mono text-xs font-bold break-all flex items-center justify-center gap-2 ${
              cardTheme === 'sanctuary-white'
                ? 'bg-slate-100 border-slate-200 text-slate-800'
                : 'bg-slate-950/80 border-slate-800 text-amber-300'
            }`}
          >
            <span>{fullUrl}</span>
            <button
              onClick={handleCopyLink}
              className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              title="Copy URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Card Footer Slogan */}
        <div
          className={`relative z-10 mt-6 pt-4 border-t text-[10px] tracking-wider uppercase font-semibold ${
            cardTheme === 'sanctuary-white'
              ? 'border-slate-200 text-slate-500'
              : 'border-slate-800 text-amber-400/80'
          }`}
        >
          2026 Divine Manifestation • Taking Territories
        </div>
      </div>

      {/* Action Buttons */}
      {showDownloadButton && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 no-print max-w-lg mx-auto">
          <button
            onClick={handleDownloadCanvaPoster}
            disabled={isGeneratingFlyer}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isGeneratingFlyer ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Rendering High-Res Poster...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4" />
                <span>Download Canva Poster (PNG)</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
