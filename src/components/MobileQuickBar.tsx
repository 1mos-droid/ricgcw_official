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

  // Spring up once Hero leaves view on Home, auto-hide when scrolling down further
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
      icon: <Phone className="w-4 h-4 text-gold-400" />,
      onClick: handleCall,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4 text-emerald-400" />,
      onClick: handleWhatsApp,
    },
    {
      id: 'branches',
      label: 'Branches',
      icon: <MapPin className="w-4 h-4 text-gold-400" />,
      onClick: handleBranchClick,
    },
    {
      id: 'give',
      label: 'Give',
      icon: <Heart className="w-4 h-4 fill-sanctuary-alabaster text-sanctuary-alabaster" />,
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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-sanctuary-950/92 border-t border-gold-400/15 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl backdrop-blur-xl"
    >
      <div className="grid grid-cols-4 gap-2 text-center">
        {actions.map((item) => {
          const isSelected = activeAction === item.id;
          return (
            <m.button
              key={item.id}
              type="button"
              whileTap={prefersReduced ? undefined : { scale: 0.92 }}
              transition={SPRING_TACTILE}
              onClick={item.onClick}
              className={`relative min-h-[44px] flex flex-col items-center justify-center p-1.5 rounded-xl transition-colors cursor-pointer ${
                item.isPrimary
                  ? 'bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster font-semibold shadow-sm'
                  : 'text-sanctuary-alabaster/85 hover:text-white'
              }`}
            >
              {isSelected && !item.isPrimary && (
                <m.span
                  layoutId="quickbar-active"
                  transition={SPRING_TACTILE}
                  className="absolute inset-0 rounded-xl bg-white/10 -z-0"
                />
              )}
              <span className="relative z-10 mb-0.5">{item.icon}</span>
              <span className="relative z-10 text-eyebrow font-medium">{item.label}</span>
            </m.button>
          );
        })}
      </div>
    </m.aside>
  );
};

export default MobileQuickBar;
