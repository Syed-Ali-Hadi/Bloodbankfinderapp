import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useRef } from 'react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isEmergency?: boolean;
}

export function ChatModal({ isOpen, onClose, children, isEmergency = false }: ChatModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center p-0 md:p-4 pointer-events-none">
        <div 
          ref={modalRef}
          className={`bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:w-[600px] h-[85vh] md:h-[700px] flex flex-col pointer-events-auto transform transition-all duration-300 ${
            isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full md:translate-y-0 scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`flex items-center gap-3 p-4 border-b ${isEmergency ? 'bg-red-50 border-red-200' : ''}`}>
            {/* Avatar */}
            <div className={`size-10 rounded-full flex items-center justify-center ${isEmergency ? 'bg-red-600' : 'bg-red-600'}`}>
              <svg 
                viewBox="0 0 24 24" 
                fill="white" 
                className="size-5"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            
            <div className="flex-1">
              <h2 className="text-lg">Talash AI</h2>
              <p className="text-xs text-gray-600">
                {isEmergency ? 'Emergency Mode Active' : 'Find blood banks • Request units • Donor info'}
              </p>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="flex-shrink-0"
              aria-label="Close chat"
            >
              <X className="size-5" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
