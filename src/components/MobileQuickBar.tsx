import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, MapPin, Heart } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toWhatsAppUrl } from '../utils/phoneUtils';

interface MobileQuickBarProps {
  onOpenGivingModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenGivingModal,
  onOpenBranchModal,
}) => {
  const { churchInfo } = useChurch();
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  // Scroll-direction aware auto-hide so reading feels spacious on small screens
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 120) {
        setIsHidden(false);
      } else if (currentY > lastScrollY.current + 10) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current - 6) {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCall = () => {
    trackEvent('conversion', 'call_hotline', churchInfo.contact.phone);
    window.location.href = toTelUrl(churchInfo.contact.phone);
  };

  const handleWhatsApp = () => {
    trackEvent('conversion', 'whatsapp_chat', churchInfo.contact.phone);
    window.open(toWhatsAppUrl(churchInfo.contact.phone, 'Shalom Pastor, I am contacting you from the RICGCW website.'), '_blank');
  };

  const handleBranchClick = () => {
    trackEvent('interaction', 'branch_directions', 'Mobile Quick Bar');
    onOpenBranchModal?.();
  };

  const handleGivingClick = () => {
    trackEvent('conversion', 'giving_modal_opened', 'Mobile Quick Bar');
    onOpenGivingModal?.();
  };

  return (
    <aside
      aria-label="Mobile quick actions"
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-sanctuary-950/92 border-t border-gold-400/15 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isHidden ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="grid grid-cols-4 gap-2 text-center">
        <button
          onClick={handleCall}
          className="min-h-[44px] flex flex-col items-center justify-center p-1.5 rounded-xl text-sanctuary-alabaster/85 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
        >
          <Phone className="w-4 h-4 text-gold-400 mb-0.5" />
          <span className="text-[10px] font-medium">Call</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="min-h-[44px] flex flex-col items-center justify-center p-1.5 rounded-xl text-sanctuary-alabaster/85 hover:text-emerald-400 hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </button>

        <button
          onClick={handleBranchClick}
          className="min-h-[44px] flex flex-col items-center justify-center p-1.5 rounded-xl text-sanctuary-alabaster/85 hover:text-white hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-gold-400 mb-0.5" />
          <span className="text-[10px] font-medium">Branches</span>
        </button>

        <button
          onClick={handleGivingClick}
          className="min-h-[44px] flex flex-col items-center justify-center p-1.5 rounded-xl bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster active:scale-95 shadow-sm transition-all font-semibold cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-sanctuary-alabaster mb-0.5" />
          <span className="text-[10px] font-semibold">Give</span>
        </button>
      </div>
    </aside>
  );
};

export default MobileQuickBar;
