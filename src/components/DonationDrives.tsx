import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock, MapPin, Users, AlertCircle } from 'lucide-react';
import { RegistrationDialog } from './RegistrationDialog';
import { useState } from 'react';
import type { DonationDrive } from '../App';

interface DonationDrivesProps {
  drives: DonationDrive[];
}

export function DonationDrives({ drives }: DonationDrivesProps) {
  const [selectedDrive, setSelectedDrive] = useState<DonationDrive | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getSlotStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return { color: 'text-green-600', label: 'Many slots available' };
    if (percentage > 20) return { color: 'text-yellow-600', label: 'Limited slots' };
    return { color: 'text-red-600', label: 'Few slots left' };
  };

  const handleRegister = (drive: DonationDrive) => {
    setSelectedDrive(drive);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      {drives.map((drive) => {
        const slotStatus = getSlotStatus(drive.slotsAvailable, drive.totalSlots);
        const hasUrgentNeeds = drive.urgentNeeds.length > 0;

        return (
          <Card key={drive.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{drive.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Organized by {drive.organizer}
                  </p>
                </div>
                {hasUrgentNeeds && (
                  <Badge variant="destructive">
                    <AlertCircle className="size-3 mr-1" />
                    Urgent
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Calendar className="size-4 text-gray-500 mt-0.5" />
                    <div>
                      <div>{formatDate(drive.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="size-4 text-gray-500 mt-0.5" />
                    <div>{drive.time}</div>
                  </div>
                  <div className="flex items-start gap-2 md:col-span-2">
                    <MapPin className="size-4 text-gray-500 mt-0.5" />
                    <div>{drive.location}</div>
                  </div>
                </div>

                {/* Slots Available */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-gray-600" />
                      <span className="text-sm">Slots Available</span>
                    </div>
                    <span className={`text-sm ${slotStatus.color}`}>
                      {slotStatus.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${((drive.totalSlots - drive.slotsAvailable) / drive.totalSlots) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm">
                      {drive.slotsAvailable} / {drive.totalSlots}
                    </span>
                  </div>
                </div>

                {/* Urgent Needs */}
                {hasUrgentNeeds && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="size-4 text-red-600" />
                      <span className="text-sm text-red-900">
                        Urgently Needed Blood Types
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {drive.urgentNeeds.map((type) => (
                        <Badge key={type} variant="destructive">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button className="w-full" size="lg" onClick={() => handleRegister(drive)}>
                  Register for this Drive
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {drives.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No upcoming donation drives scheduled
          </CardContent>
        </Card>
      )}

      {selectedDrive && (
        <RegistrationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          driveName={selectedDrive.title}
        />
      )}
    </div>
  );
}