import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FilterPanelProps {
  selectedBloodType: string;
  onBloodTypeChange: (value: string) => void;
  selectedArea: string;
  onAreaChange: (value: string) => void;
}

const bloodTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
];

const areas = [
  { value: 'all', label: 'All Areas' },
  { value: 'Karachi Central', label: 'Karachi Central' },
  { value: 'Karachi East', label: 'Karachi East' },
  { value: 'Karachi West', label: 'Karachi West' },
  { value: 'Karachi South', label: 'Karachi South' },
  { value: 'Karachi Malir', label: 'Karachi Malir' },
  { value: 'Karachi Korangi', label: 'Karachi Korangi' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Sukkur', label: 'Sukkur' },
  { value: 'Larkana', label: 'Larkana' },
  { value: 'Mirpurkhas', label: 'Mirpurkhas' },
];

export function FilterPanel({ selectedBloodType, onBloodTypeChange, selectedArea, onAreaChange }: FilterPanelProps) {
  return (
    <div id="blood-banks-section">
      <Card>
        <CardHeader>
          <CardTitle>Filter Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Area Selection */}
            <div>
              <Label htmlFor="area-select" className="mb-3 block">Select an Area</Label>
              <Select value={selectedArea} onValueChange={onAreaChange}>
                <SelectTrigger id="area-select">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.value} value={area.value}>
                      {area.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Blood Type Selection */}
            <div>
              <h3 className="mb-3">Blood Type</h3>
              <RadioGroup value={selectedBloodType} onValueChange={onBloodTypeChange}>
                <div className="grid grid-cols-2 gap-3">
                  {bloodTypes.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.value} id={type.value} />
                      <Label htmlFor={type.value} className="cursor-pointer">
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4 border-t">
              <h3 className="mb-2">Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-green-500"></div>
                  <span>High Availability (40+ units)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-yellow-500"></div>
                  <span>Medium (15-39 units)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500"></div>
                  <span>Low (&lt; 15 units)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}