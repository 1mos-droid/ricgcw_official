import React from 'react';
import { Phone, MessageCircle, MapPin, Heart } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';

interface MobileQuickBarProps {
  onOpenGivingModal?: () => void;
  onOpenBranchModal?: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenGivingModal,
  onOpenBranchModal,
}) => {
  const { churchInfo } = useChurch();

  const handleCall = () => {
    trackEvent('conversion', 'call_hotline', churchInfo.contact.phone);
    window.location.href = `tel:${churchInfo.contact.phone}`;
  };

  const handleWhatsApp = () => {
    trackEvent('conversion', 'whatsapp_chat', churchInfo.contact.phone);
    const cleanPhone = churchInfo.contact.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
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
    <aside aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-amber-500/20 px-3 py-2 shadow-2xl backdrop-blur-md">
      <div className="grid grid-cols-4 gap-2 text-center">
        <button
          onClick={handleCall}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[10px] font-bold">Call</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-white/5 active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </button>

        <button
          onClick={handleBranchClick}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
        >
          <MapPin className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[10px] font-bold">Branches</span>
        </button>

        <button
          onClick={handleGivingClick}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-amber-500 text-slate-950 active:scale-95 shadow-md shadow-amber-500/20 transition-all font-black"
        >
          <Heart className="w-4 h-4 fill-slate-950 mb-0.5" />
          <span className="text-[10px] font-black">Give</span>
        </button>
      </div>
    </aside>
  );
};

export default MobileQuickBar;
