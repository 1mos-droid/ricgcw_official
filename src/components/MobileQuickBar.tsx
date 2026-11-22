import React, { useState, useRef } from 'react';
import { m, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toWhatsAppUrl } from '../utils/phoneUtils';
import { SPRING_TACTILE } from './motion';

interface MobileQuickBarProps {
  onOpenGivingModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

type QuickActionId = 'call' | 'whatsapp' | 'branches' | 'give';

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenGivingModal,
  onOpenBranchModal,
}) => {
  const { churchInfo } = useChurch();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const prefersReduced = useReducedMotion();

  const [isVisible, setIsVisible] = useState(!isHome);
  const [activeAction, setActiveAction] = useState<QuickActionId>('give');
  const lastYRef = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prevY = lastYRef.current;
    if (isHome && latest < 340) {
      setIsVisible((prev) => (prev ? false : prev));
    } else if (latest > prevY + 14 && latest > 500) {
      setIsVisible((prev) => (prev ? false : prev));
    } else if (latest < prevY - 8 || (!isHome && latest < 120)) {
      setIsVisible((prev) => (!prev ? true : prev));
    }
    lastYRef.current = latest;
  });

  const handleCall = () => {
    setActiveAction('call');
    trackEvent('conversion', 'call_hotline', churchInfo.contact.phone);
    window.location.href = toTelUrl(churchInfo.contact.phone);
  };

  const handleWhatsApp = () => {
    setActiveAction('whatsapp');
    trackEvent('conversion', 'whatsapp_chat', churchInfo.contact.phone);
    window.open(
      toWhatsAppUrl(churchInfo.contact.phone, 'Shalom Pastor, I am contacting you from the RICGCW website.'),
      '_blank'
    );
  };

  const handleBranchClick = () => {
    setActiveAction('branches');
    trackEvent('interaction', 'branch_directions', 'Mobile Quick Bar');
    onOpenBranchModal?.();
  };

  const handleGivingClick = () => {
    setActiveAction('give');
    trackEvent('conversion', 'giving_modal_opened', 'Mobile Quick Bar');
    onOpenGivingModal?.();
  };

  const actions: Array<{
    id: QuickActionId;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    isPrimary?: boolean;
  }> = [
    {
      id: 'call',
      label: 'Call',
      icon: <Phone className="w-4 h-4 text-public-accent" />,
      onClick: handleCall,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4 text-olive-500" />,
      onClick: handleWhatsApp,
    },
    {
      id: 'branches',
      label: 'Branches',
      icon: <MapPin className="w-4 h-4 text-public-accent" />,
      onClick: handleBranchClick,
    },
    {
      id: 'give',
      label: 'Give',
      icon: <Heart className="w-4 h-4" />,
      onClick: handleGivingClick,
      isPrimary: true,
    },
  ];

  return (
    <m.aside
      aria-label="Mobile quick actions"
      initial={false}
      animate={{ y: isVisible ? 0 : '115%' }}
      transition={prefersReduced ? { duration: 0.01 } : SPRING_TACTILE}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-public-surface/95 border-t border-public-border px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-lg backdrop-blur-md"
    >
      <div className="grid grid-cols-4 gap-2 text-center">
        {actions.map((item) => {
          const isSelected = activeAction === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`min-h-[44px] flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors cursor-pointer ${
                item.isPrimary
                  ? 'bg-public-ink hover:bg-public-accent text-white font-semibold'
                  : isSelected
                  ? 'bg-public-canvas text-public-ink font-semibold'
                  : 'text-public-ink-muted hover:text-public-ink font-medium'
              }`}
            >
              <span className="mb-0.5">{item.icon}</span>
              <span className="text-[11px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </m.aside>
  );
};

export default MobileQuickBar;
