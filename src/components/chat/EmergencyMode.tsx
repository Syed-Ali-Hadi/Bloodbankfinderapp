import { AlertCircle, Phone, Navigation, MapPin, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface EmergencyBank {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  availableTypes: string[];
  totalUnits: number;
  lat: number;
  lng: number;
}

interface EmergencyModeProps {
  urgentBloodType?: string;
  emergencyBanks: EmergencyBank[];
}

export function EmergencyMode({ urgentBloodType, emergencyBanks }: EmergencyModeProps) {
  const handleEmergencyCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleGetDirections = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="size-5 animate-pulse" />
          <h3 className="text-base">Emergency Mode Active</h3>
        </div>
        <p className="text-sm text-red-100">
          Showing blood banks with {urgentBloodType || 'critical'} stock available
        </p>
      </div>

      {/* Emergency Services */}
      <div className="bg-red-50 border-b border-red-200 p-4">
        <p className="text-xs text-gray-700 mb-3">
          <strong>For life-threatening emergencies:</strong>
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            size="sm"
            variant="destructive"
            onClick={() => handleEmergencyCall('1122')}
            className="bg-red-700 hover:bg-red-800"
          >
            <Phone className="size-4 mr-1" />
            1122 Rescue
          </Button>
          <Button 
            size="sm"
            variant="destructive"
            onClick={() => handleEmergencyCall('115')}
            className="bg-red-700 hover:bg-red-800"
          >
            <Phone className="size-4 mr-1" />
            115 Aman
          </Button>
        </div>
      </div>

      {/* Banks with Stock */}
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="text-sm mb-3">
          {emergencyBanks.length} Blood Banks with Available Stock
        </h4>
        
        <div className="space-y-3">
          {emergencyBanks.map((bank) => (
            <div 
              key={bank.id}
              className="border-2 border-red-200 rounded-lg p-3 bg-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h5 className="text-sm mb-1">{bank.name}</h5>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="size-3" />
                    <span className="text-red-600">{bank.distance}</span>
                  </div>
                </div>
                <Badge variant="destructive" className="flex-shrink-0">
                  {bank.totalUnits} units
                </Badge>
              </div>

              {/* Available Types */}
              <div className="flex flex-wrap gap-1 mb-3">
                {bank.availableTypes.map((type) => (
                  <Badge 
                    key={type} 
                    variant="secondary" 
                    className={`text-xs ${urgentBloodType === type ? 'bg-red-100 text-red-700 border border-red-300' : ''}`}
                  >
                    {type}
                  </Badge>
                ))}
              </div>

              {/* Info */}
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                <Clock className="size-3" />
                <span>{bank.hours}</span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleGetDirections(bank.lat, bank.lng)}
                  className="text-xs border-red-300 text-red-700 hover:bg-red-50"
                >
                  <Navigation className="size-3 mr-1" />
                  Navigate
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleEmergencyCall(bank.phone)}
                  className="text-xs bg-red-600 hover:bg-red-700"
                >
                  <Phone className="size-3 mr-1" />
                  Call Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="border-t p-4 bg-gray-50">
        <p className="text-xs text-gray-600 text-center">
          Stock information updated in real-time. Always call ahead to confirm availability.
        </p>
      </div>
    </div>
  );
}
