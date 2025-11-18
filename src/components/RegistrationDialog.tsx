import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { CheckCircle2 } from 'lucide-react';

interface RegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driveName: string;
}

export function RegistrationDialog({ open, onOpenChange, driveName }: RegistrationDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bloodType: '',
    age: '',
    lastDonation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      bloodType: '',
      age: '',
      lastDonation: '',
    });
    onOpenChange(false);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="size-16 text-green-600" />
            </div>
            <h2 className="text-2xl mb-2">Registration Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering for <strong>{driveName}</strong>. You will receive a confirmation SMS shortly with further details.
            </p>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Register for Blood Donation</DialogTitle>
          <DialogDescription>
            Fill in your details to register for {driveName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="03XX-XXXXXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bloodType">Blood Type *</Label>
            <Select
              required
              value={formData.bloodType}
              onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
            >
              <SelectTrigger id="bloodType">
                <SelectValue placeholder="Select your blood type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              required
              min="18"
              max="65"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter your age"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastDonation">Last Donation Date (Optional)</Label>
            <Input
              id="lastDonation"
              type="date"
              value={formData.lastDonation}
              onChange={(e) => setFormData({ ...formData, lastDonation: e.target.value })}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Registration
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
