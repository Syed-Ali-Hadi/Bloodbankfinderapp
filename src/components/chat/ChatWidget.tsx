import { MessageCircle, X, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  unreadCount?: number;
  isEmergency?: boolean;
}

export function ChatWidget({ isOpen, onToggle, unreadCount = 0, isEmergency = false }: ChatWidgetProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="icon"
        onClick={onToggle}
        className={`size-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isEmergency 
            ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
            : 'bg-red-600 hover:bg-red-700'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat with Talash AI'}
      >
        {isOpen ? (
          <X className="size-6" />
        ) : (
          <div className="relative">
            {/* Blood Drop Icon */}
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="size-7"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            
            {/* Unread Badge */}
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
            
            {/* Emergency Indicator */}
            {isEmergency && (
              <div className="absolute -top-1 -right-1">
                <AlertCircle className="size-5 text-white animate-pulse" fill="currentColor" />
              </div>
            )}
          </div>
        )}
      </Button>
      
      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Chat with Talash AI
        </div>
      )}
    </div>
  );
}
