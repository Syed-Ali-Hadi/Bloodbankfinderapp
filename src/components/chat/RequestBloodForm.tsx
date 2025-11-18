import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface RequestBloodFormProps {
  onSubmit: (data: RequestFormData) => void;
  onCancel: () => void;
}

export interface RequestFormData {
  bloodType: string;
  units: string;
  deliveryType: 'pickup' | 'delivery';
  recipientType: 'patient' | 'hospital';
  recipientName: string;
  contactNumber: string;
  urgency: 'routine' | 'urgent' | 'critical';
  notes: string;
}

export function RequestBloodForm({ onSubmit, onCancel }: RequestBloodFormProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    bloodType: '',
    units: '',
    deliveryType: 'pickup',
    recipientType: 'patient',
    recipientName: '',
    contactNumber: '',
    urgency: 'routine',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof RequestFormData, string>> = {};

    if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
    if (!formData.units || parseInt(formData.units) < 1) newErrors.units = 'Valid number of units is required';
    if (!formData.recipientName.trim()) newErrors.recipientName = 'Recipient name is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!/^[\d\s\-+()]+$/.test(formData.contactNumber)) newErrors.contactNumber = 'Invalid phone number format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-base mb-4">Request Blood</h3>

      {/* Blood Type */}
      <div>
        <Label htmlFor="bloodType">Blood Type *</Label>
        <Select 
          value={formData.bloodType} 
          onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
        >
          <SelectTrigger id="bloodType" className={errors.bloodType ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select blood type" />
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
        {errors.bloodType && (
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="size-3" />
            {errors.bloodType}
          </p>
        )}
      </div>

      {/* Units */}
      <div>
        <Label htmlFor="units">Number of Units *</Label>
        <Input
          id="units"
          type="number"
          min="1"
          placeholder="e.g., 2"
          value={formData.units}
          onChange={(e) => setFormData({ ...formData, units: e.target.value })}
          className={errors.units ? 'border-red-500' : ''}
        />
        {errors.units && (
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="size-3" />
            {errors.units}
          </p>
        )}
      </div>

      {/* Delivery Type */}
      <div>
        <Label>Delivery Type</Label>
        <RadioGroup 
          value={formData.deliveryType} 
          onValueChange={(value) => setFormData({ ...formData, deliveryType: value as 'pickup' | 'delivery' })}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup" className="cursor-pointer">Pickup</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery" className="cursor-pointer">Delivery</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Recipient Type */}
      <div>
        <Label>Recipient Type</Label>
        <RadioGroup 
          value={formData.recipientType} 
          onValueChange={(value) => setFormData({ ...formData, recipientType: value as 'patient' | 'hospital' })}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="patient" id="patient" />
            <Label htmlFor="patient" className="cursor-pointer">Patient</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hospital" id="hospital" />
            <Label htmlFor="hospital" className="cursor-pointer">Hospital</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Recipient Name */}
      <div>
        <Label htmlFor="recipientName">
          {formData.recipientType === 'patient' ? 'Patient Name' : 'Hospital Name'} *
        </Label>
        <Input
          id="recipientName"
          placeholder={formData.recipientType === 'patient' ? 'Enter patient name' : 'Enter hospital name'}
          value={formData.recipientName}
          onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
          className={errors.recipientName ? 'border-red-500' : ''}
        />
        {errors.recipientName && (
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="size-3" />
            {errors.recipientName}
          </p>
        )}
      </div>

      {/* Contact Number */}
      <div>
        <Label htmlFor="contactNumber">Contact Number *</Label>
        <Input
          id="contactNumber"
          type="tel"
          placeholder="+92 XXX XXXXXXX"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          className={errors.contactNumber ? 'border-red-500' : ''}
        />
        {errors.contactNumber && (
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="size-3" />
            {errors.contactNumber}
          </p>
        )}
      </div>

      {/* Urgency */}
      <div>
        <Label htmlFor="urgency">Urgency Level</Label>
        <Select 
          value={formData.urgency} 
          onValueChange={(value) => setFormData({ ...formData, urgency: value as 'routine' | 'urgent' | 'critical' })}
        >
          <SelectTrigger id="urgency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="routine">Routine (within 24-48 hours)</SelectItem>
            <SelectItem value="urgent">Urgent (within 6-12 hours)</SelectItem>
            <SelectItem value="critical">Critical (immediate)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any special requirements or additional information..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="flex-1 bg-red-600 hover:bg-red-700"
        >
          Submit Request
        </Button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-600 pt-2 border-t">
        <strong>Note:</strong> For life-threatening emergencies, call 1122 (Rescue) or 115 (Aman Ambulance) immediately.
      </p>
    </form>
  );
}

interface RequestConfirmationProps {
  referenceId: string;
  onClose: () => void;
}

export function RequestConfirmation({ referenceId, onClose }: RequestConfirmationProps) {
  return (
    <div className="p-6 text-center">
      <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="size-8 text-green-600" />
      </div>
      
      <h3 className="text-lg mb-2">Request Submitted</h3>
      <p className="text-sm text-gray-600 mb-4">
        Your blood request has been submitted successfully.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-xs text-gray-600 mb-1">Reference ID</p>
        <p className="text-lg">{referenceId}</p>
      </div>
      
      <p className="text-xs text-gray-700 mb-6">
        The blood bank will contact you within 30 minutes. Please keep your phone accessible.
      </p>
      
      <Button 
        onClick={onClose}
        className="w-full bg-red-600 hover:bg-red-700"
      >
        Done
      </Button>
    </div>
  );
}
