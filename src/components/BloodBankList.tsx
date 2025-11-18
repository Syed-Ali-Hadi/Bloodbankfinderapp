import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, Building2, Info } from 'lucide-react';
import { BloodBankInfoDialog } from './BloodBankInfoDialog';
import type { BloodBank } from '../App';

interface BloodBankListProps {
  bloodBanks: BloodBank[];
  selectedBank: string | null;
  onSelectBank: (id: string | null) => void;
}

export function BloodBankList({ bloodBanks, selectedBank, onSelectBank }: BloodBankListProps) {
  const [dialogBank, setDialogBank] = useState<BloodBank | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getAvailabilityColor = (units: number) => {
    if (units >= 40) return 'bg-green-500';
    if (units >= 15) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleGetInfo = (bank: BloodBank) => {
    setDialogBank(bank);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl">Blood Banks ({bloodBanks.length})</h2>
        <p className="text-gray-600">Find blood banks across Sindh</p>
      </div>
      
      {bloodBanks.map((bank) => (
        <Card 
          key={bank.id}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedBank === bank.id ? 'ring-2 ring-red-600' : ''
          }`}
          onClick={() => onSelectBank(bank.id === selectedBank ? null : bank.id)}
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg">{bank.name}</CardTitle>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="size-4 flex-shrink-0" />
                    <span className="truncate">{bank.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="size-4 text-gray-600 flex-shrink-0" />
                    <Badge variant="secondary">{bank.district}</Badge>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="flex-shrink-0">{bank.distance} km</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Hours */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="size-4" />
                <span>{bank.hours}</span>
              </div>

              {/* Blood Availability Grid */}
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(bank.availability).map(([type, units]) => (
                  <div
                    key={type}
                    className="text-center p-2 border rounded bg-gray-50"
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div
                        className={`size-2 rounded-full ${getAvailabilityColor(units)}`}
                      ></div>
                      <span className="text-xs">{type}</span>
                    </div>
                    <p className="text-sm">{units}</p>
                  </div>
                ))}
              </div>

              {/* Get Info Button */}
              <Button 
                variant="default" 
                className="w-full bg-red-600 hover:bg-red-700" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetInfo(bank);
                }}
              >
                <Info className="size-4 mr-2" />
                Get Info
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <BloodBankInfoDialog
        bank={dialogBank}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
