import { MapPin, Droplet, Phone, Heart, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  variant?: 'default' | 'emergency';
}

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const quickActions: QuickAction[] = [
  {
    id: 'find-nearest',
    label: 'Find nearest blood bank',
    icon: <MapPin className="size-4" />,
  },
  {
    id: 'check-availability',
    label: 'Check blood availability',
    icon: <Droplet className="size-4" />,
  },
  {
    id: 'request-blood',
    label: 'Request blood',
    icon: <Phone className="size-4" />,
  },
  {
    id: 'become-donor',
    label: 'Become a donor',
    icon: <Heart className="size-4" />,
  },
  {
    id: 'emergency',
    label: 'Emergency',
    icon: <AlertCircle className="size-4" />,
    variant: 'emergency',
  },
];

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {quickActions.map((action) => (
        <Button
          key={action.id}
          variant={action.variant === 'emergency' ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => onActionClick(action.id)}
          className={`text-xs transition-all hover:scale-105 ${
            action.variant === 'emergency' 
              ? 'bg-red-600 hover:bg-red-700 text-white shadow-md' 
              : 'bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700'
          }`}
        >
          {action.icon}
          <span className="ml-1.5">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}