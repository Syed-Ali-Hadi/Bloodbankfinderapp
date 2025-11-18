import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Phone, Clock, Navigation, Building2 } from 'lucide-react';
import type { BloodBank } from '../App';

interface BloodBankInfoDialogProps {
  bank: BloodBank | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BloodBankInfoDialog({ bank, open, onOpenChange }: BloodBankInfoDialogProps) {
  if (!bank) return null;

  const getAvailabilityColor = (units: number) => {
    if (units >= 40) return 'bg-green-500';
    if (units >= 15) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${bank.lat},${bank.lng}`;
    window.open(url, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl pr-8">{bank.name}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Detailed information about the blood bank.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Location Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p>{bank.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="size-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">District</p>
                <Badge variant="secondary">{bank.district}</Badge>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="size-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <a href={`tel:${bank.phone}`} className="text-blue-600 hover:underline">
                  {bank.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="size-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600">Working Hours</p>
                <p>{bank.hours}</p>
              </div>
            </div>
          </div>

          {/* Blood Availability */}
          <div>
            <h3 className="mb-3">Blood Availability</h3>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(bank.availability).map(([type, units]) => (
                <div
                  key={type}
                  className="text-center p-3 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div
                      className={`size-2 rounded-full ${getAvailabilityColor(units)}`}
                    ></div>
                    <span className="text-sm">{type}</span>
                  </div>
                  <p className="text-lg">{units} units</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleGetDirections}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <Navigation className="size-4 mr-2" />
              Get Directions
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(`tel:${bank.phone}`)}
              className="flex-1"
            >
              <Phone className="size-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}