import { MapPin, Phone, Navigation, Info, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { useState } from 'react';

interface BloodBankResult {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  availability: {
    [key: string]: number;
  };
  lat: number;
  lng: number;
  lastUpdated?: string;
}

interface BloodBankResultCardProps {
  bank: BloodBankResult;
  compact?: boolean;
  onRequestClick?: (bankId: string) => void;
}

export function BloodBankResultCard({ bank, compact = true, onRequestClick }: BloodBankResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAvailabilityColor = (units: number) => {
    if (units >= 40) return 'text-green-600';
    if (units >= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilitySummary = () => {
    const available = Object.entries(bank.availability).filter(([_, units]) => units > 0);
    return `${available.length} types available`;
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${bank.lat},${bank.lng}`;
    window.open(url, '_blank');
  };

  if (!compact || isExpanded) {
    return (
      <Card className="p-4 mb-3 bg-white border shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-sm mb-1">{bank.name}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="size-3" />
              <span>{bank.distance}</span>
            </div>
          </div>
          {compact && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="h-auto px-2 py-1"
            >
              Collapse
            </Button>
          )}
        </div>

        {/* Address */}
        <div className="mb-3 text-xs text-gray-700">
          <p>{bank.address}</p>
        </div>

        {/* Hours */}
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
          <Clock className="size-3" />
          <span>{bank.hours}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 mb-4 text-xs text-gray-600">
          <Phone className="size-3" />
          <a href={`tel:${bank.phone}`} className="text-blue-600 hover:underline">
            {bank.phone}
          </a>
        </div>

        {/* Full Availability */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-xs">Blood Availability</h5>
            {bank.lastUpdated && (
              <span className="text-xs text-gray-500">
                Updated {bank.lastUpdated}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(bank.availability).map(([type, units]) => (
              <div
                key={type}
                className="text-center p-2 border rounded bg-gray-50"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {units > 0 && <CheckCircle2 className={`size-3 ${getAvailabilityColor(units)}`} />}
                  <span className="text-xs">{type}</span>
                </div>
                <p className={`text-xs ${getAvailabilityColor(units)}`}>
                  {units} units
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGetDirections}
            className="text-xs"
          >
            <Navigation className="size-3 mr-1" />
            Navigate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`tel:${bank.phone}`)}
            className="text-xs"
          >
            <Phone className="size-3 mr-1" />
            Call
          </Button>
        </div>
        
        {onRequestClick && (
          <Button
            size="sm"
            onClick={() => onRequestClick(bank.id)}
            className="w-full mt-2 bg-red-600 hover:bg-red-700 text-xs"
          >
            Request Blood
          </Button>
        )}
      </Card>
    );
  }

  // Compact view
  return (
    <Card className="p-3 mb-2 bg-white border shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-red-200" onClick={() => setIsExpanded(true)}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="text-sm mb-1">{bank.name}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
            <MapPin className="size-3" />
            <span>{bank.distance}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {getAvailabilitySummary()}
          </Badge>
        </div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(true);
          }}
          className="flex-1 text-xs hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        >
          <Info className="size-3 mr-1" />
          Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${bank.phone}`);
          }}
          className="flex-1 text-xs hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        >
          <Phone className="size-3 mr-1" />
          Call
        </Button>
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleGetDirections();
          }}
          className="flex-1 bg-red-600 hover:bg-red-700 text-xs"
        >
          <Navigation className="size-3 mr-1" />
          Go
        </Button>
      </div>
    </Card>
  );
}