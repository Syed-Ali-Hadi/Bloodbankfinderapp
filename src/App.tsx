import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BloodBankList } from './components/BloodBankList';
import { DonationDrives } from './components/DonationDrives';
import { FilterPanel } from './components/FilterPanel';
import { ContactUs } from './components/ContactUs';
import { OurTeam } from './components/OurTeam';
import { TalashAI } from './components/TalashAI';

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  area: string;
  district: string;
  lat: number;
  lng: number;
  phone: string;
  availability: {
    'A+': number;
    'A-': number;
    'B+': number;
    'B-': number;
    'O+': number;
    'O-': number;
    'AB+': number;
    'AB-': number;
  };
  hours: string;
  distance: number;
}

export interface DonationDrive {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  lat: number;
  lng: number;
  slotsAvailable: number;
  totalSlots: number;
  urgentNeeds: string[];
}

const mockBloodBanks: BloodBank[] = [
  // Karachi Central
  {
    id: '1',
    name: 'Jinnah Postgraduate Medical Centre (JPMC) Blood Bank',
    address: 'Rafiqui Shaheed Road, Karachi',
    area: 'Garden',
    district: 'Karachi Central',
    lat: 24.8829,
    lng: 67.0661,
    phone: '021-99215740',
    availability: {
      'A+': 52,
      'A-': 14,
      'B+': 38,
      'B-': 9,
      'O+': 68,
      'O-': 16,
      'AB+': 22,
      'AB-': 6,
    },
    hours: '24/7',
    distance: 2.3,
  },
  {
    id: '2',
    name: 'Civil Hospital Karachi Blood Bank',
    address: 'Baba-e-Urdu Road, Karachi',
    area: 'Saddar',
    district: 'Karachi South',
    lat: 24.8664,
    lng: 67.0230,
    phone: '021-99215092',
    availability: {
      'A+': 45,
      'A-': 11,
      'B+': 32,
      'B-': 7,
      'O+': 59,
      'O-': 13,
      'AB+': 18,
      'AB-': 4,
    },
    hours: '24/7',
    distance: 3.8,
  },
  {
    id: '3',
    name: 'National Institute of Blood Disease (NIBD)',
    address: 'ST-2/A Block 17, Gulshan-e-Iqbal, Karachi',
    area: 'Gulshan-e-Iqbal',
    district: 'Karachi East',
    lat: 24.9237,
    lng: 67.0822,
    phone: '021-34970614',
    availability: {
      'A+': 78,
      'A-': 22,
      'B+': 54,
      'B-': 15,
      'O+': 95,
      'O-': 28,
      'AB+': 31,
      'AB-': 9,
    },
    hours: 'Mon-Sat: 8AM-8PM, Sun: 9AM-2PM',
    distance: 1.5,
  },
  {
    id: '4',
    name: 'Aga Khan University Hospital Blood Bank',
    address: 'Stadium Road, Karachi',
    area: 'Karsaz',
    district: 'Karachi East',
    lat: 24.8905,
    lng: 67.0713,
    phone: '021-34864516',
    availability: {
      'A+': 62,
      'A-': 18,
      'B+': 41,
      'B-': 11,
      'O+': 73,
      'O-': 20,
      'AB+': 26,
      'AB-': 7,
    },
    hours: '24/7',
    distance: 2.7,
  },
  // Karachi West
  {
    id: '5',
    name: 'Abbasi Shaheed Hospital Blood Bank',
    address: 'Abul Asar Hafeez Jalandhari Road, Karachi',
    area: 'Orangi Town',
    district: 'Karachi West',
    lat: 24.9246,
    lng: 66.9888,
    phone: '021-36635163',
    availability: {
      'A+': 38,
      'A-': 9,
      'B+': 27,
      'B-': 6,
      'O+': 51,
      'O-': 11,
      'AB+': 15,
      'AB-': 3,
    },
    hours: '24/7',
    distance: 5.4,
  },
  // Karachi Malir
  {
    id: '6',
    name: 'Jinnah Medical & Dental College Blood Bank',
    address: 'Shaheed-e-Millat Road, Karachi',
    area: 'Malir Cantt',
    district: 'Karachi Malir',
    lat: 24.8936,
    lng: 67.2006,
    phone: '021-34412470',
    availability: {
      'A+': 33,
      'A-': 7,
      'B+': 24,
      'B-': 5,
      'O+': 44,
      'O-': 9,
      'AB+': 13,
      'AB-': 2,
    },
    hours: 'Mon-Sat: 8AM-6PM',
    distance: 8.2,
  },
  // Karachi Korangi
  {
    id: '7',
    name: 'Patel Hospital Blood Bank',
    address: 'Main Shahrah-e-Faisal, Karachi',
    area: 'Drigh Road',
    district: 'Karachi Korangi',
    lat: 24.8869,
    lng: 67.0824,
    phone: '021-34412310',
    availability: {
      'A+': 41,
      'A-': 10,
      'B+': 29,
      'B-': 6,
      'O+': 55,
      'O-': 12,
      'AB+': 16,
      'AB-': 4,
    },
    hours: '24/7',
    distance: 3.2,
  },
  // Karachi Keamari
  {
    id: '8',
    name: 'Ziauddin Hospital Blood Bank',
    address: 'Shahrah-e-Ghalib, Clifton, Karachi',
    area: 'Clifton',
    district: 'Karachi South',
    lat: 24.8138,
    lng: 67.0299,
    phone: '021-35862937',
    availability: {
      'A+': 48,
      'A-': 13,
      'B+': 35,
      'B-': 8,
      'O+': 64,
      'O-': 14,
      'AB+': 19,
      'AB-': 5,
    },
    hours: '24/7',
    distance: 6.1,
  },
  {
    id: '9',
    name: 'Hussaini Blood Bank',
    address: 'Sharea Faisal, Karachi',
    area: 'Drigh Road',
    district: 'Karachi Korangi',
    lat: 24.8722,
    lng: 67.0603,
    phone: '021-34536647',
    availability: {
      'A+': 41,
      'A-': 10,
      'B+': 29,
      'B-': 6,
      'O+': 55,
      'O-': 12,
      'AB+': 16,
      'AB-': 4,
    },
    hours: '24/7',
    distance: 3.2,
  },
  {
    id: '10',
    name: 'Fatimid Foundation Blood Bank',
    address: 'Shahrah-e-Faisal, Karachi',
    area: 'Nursery',
    district: 'Karachi East',
    lat: 24.8755,
    lng: 67.0562,
    phone: '021-34534261',
    availability: {
      'A+': 55,
      'A-': 16,
      'B+': 39,
      'B-': 10,
      'O+': 71,
      'O-': 18,
      'AB+': 24,
      'AB-': 6,
    },
    hours: '24/7',
    distance: 2.9,
  },
  // Hyderabad
  {
    id: '11',
    name: 'Liaquat University Hospital Blood Bank',
    address: 'Jamshoro Road, Hyderabad',
    area: 'Jamshoro',
    district: 'Hyderabad',
    lat: 25.3960,
    lng: 68.3578,
    phone: '022-9213382',
    availability: {
      'A+': 35,
      'A-': 8,
      'B+': 25,
      'B-': 5,
      'O+': 48,
      'O-': 10,
      'AB+': 14,
      'AB-': 3,
    },
    hours: '24/7',
    distance: 165.2,
  },
  {
    id: '12',
    name: 'Hyderabad Civil Hospital Blood Bank',
    address: 'Hospital Road, Hyderabad',
    area: 'Civil Hospital',
    district: 'Hyderabad',
    lat: 25.3784,
    lng: 68.3667,
    phone: '022-9200571',
    availability: {
      'A+': 28,
      'A-': 6,
      'B+': 21,
      'B-': 4,
      'O+': 42,
      'O-': 8,
      'AB+': 12,
      'AB-': 2,
    },
    hours: '24/7',
    distance: 166.5,
  },
  // Sukkur
  {
    id: '13',
    name: 'Sukkur Civil Hospital Blood Bank',
    address: 'Minara Road, Sukkur',
    area: 'Civil Lines',
    district: 'Sukkur',
    lat: 27.7005,
    lng: 68.8573,
    phone: '071-9310235',
    availability: {
      'A+': 31,
      'A-': 7,
      'B+': 23,
      'B-': 5,
      'O+': 45,
      'O-': 9,
      'AB+': 13,
      'AB-': 3,
    },
    hours: 'Mon-Sun: 8AM-8PM',
    distance: 398.4,
  },
  // Larkana
  {
    id: '14',
    name: 'Chandka Medical College Hospital Blood Bank',
    address: 'Bunder Road, Larkana',
    area: 'Bunder Road',
    district: 'Larkana',
    lat: 27.5581,
    lng: 68.2121,
    phone: '074-9410394',
    availability: {
      'A+': 26,
      'A-': 5,
      'B+': 19,
      'B-': 4,
      'O+': 38,
      'O-': 7,
      'AB+': 11,
      'AB-': 2,
    },
    hours: '24/7',
    distance: 435.7,
  },
  // Mirpurkhas
  {
    id: '15',
    name: 'Sindh Government Hospital Blood Bank',
    address: 'Jail Road, Mirpurkhas',
    area: 'Jail Road',
    district: 'Mirpurkhas',
    lat: 25.5269,
    lng: 69.0111,
    phone: '0233-862395',
    availability: {
      'A+': 22,
      'A-': 4,
      'B+': 16,
      'B-': 3,
      'O+': 34,
      'O-': 6,
      'AB+': 9,
      'AB-': 2,
    },
    hours: 'Mon-Sat: 8AM-6PM',
    distance: 215.3,
  },
];

const mockDonationDrives: DonationDrive[] = [
  {
    id: '1',
    title: 'Karachi Blood Donation Camp',
    organizer: 'Sindh Blood Transfusion Authority',
    date: '2025-11-15',
    time: '10:00 AM - 6:00 PM',
    location: 'Expo Centre, Karachi',
    lat: 24.8935,
    lng: 67.0351,
    slotsAvailable: 342,
    totalSlots: 500,
    urgentNeeds: ['O-', 'AB-', 'B-'],
  },
  {
    id: '2',
    title: 'Emergency Blood Collection Drive',
    organizer: 'Pakistan Red Crescent Society',
    date: '2025-11-13',
    time: '9:00 AM - 5:00 PM',
    location: 'NED University, University Road, Karachi',
    lat: 24.9261,
    lng: 67.1105,
    slotsAvailable: 178,
    totalSlots: 500,
    urgentNeeds: ['O+', 'O-', 'A-'],
  },
  {
    id: '3',
    title: 'Hyderabad Community Blood Drive',
    organizer: 'Liaquat University Hospital',
    date: '2025-11-18',
    time: '11:00 AM - 7:00 PM',
    location: 'Hyderabad Press Club, Thandi Sarak, Hyderabad',
    lat: 25.3780,
    lng: 68.3712,
    slotsAvailable: 425,
    totalSlots: 500,
    urgentNeeds: ['B+', 'AB+', 'O-'],
  },
  {
    id: '4',
    title: 'Youth Blood Donation Campaign',
    organizer: 'FAST National University of Computer and Emerging Sciences',
    date: '2025-11-20',
    time: '10:00 AM - 4:00 PM',
    location: 'FAST NUCES, Karachi',
    lat: 24.8607,
    lng: 67.0700,
    slotsAvailable: 289,
    totalSlots: 500,
    urgentNeeds: ['A-', 'B-'],
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBloodType, setSelectedBloodType] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  // Filter blood banks based on blood type and area
  const filteredBloodBanks = mockBloodBanks.filter((bank) => {
    const bloodTypeMatch =
      selectedBloodType === 'all' ||
      bank.availability[selectedBloodType as keyof typeof bank.availability] > 0;
    
    const areaMatch = selectedArea === 'all' || bank.district === selectedArea;
    
    return bloodTypeMatch && areaMatch;
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Filter Panel */}
                <div className="lg:col-span-1">
                  <FilterPanel
                    selectedBloodType={selectedBloodType}
                    onBloodTypeChange={setSelectedBloodType}
                    selectedArea={selectedArea}
                    onAreaChange={setSelectedArea}
                  />
                </div>

                {/* Blood Banks List */}
                <div className="lg:col-span-2">
                  <BloodBankList
                    bloodBanks={filteredBloodBanks}
                    selectedBank={selectedBank}
                    onSelectBank={setSelectedBank}
                  />
                </div>
              </div>

              {/* Donation Drives Section */}
              <div className="mt-16" id="donation-drives-section">
                <h2 className="text-3xl mb-6">Upcoming Donation Drives</h2>
                <DonationDrives drives={mockDonationDrives} />
              </div>
            </div>
          </>
        );
      case 'contact':
        return <ContactUs />;
      case 'team':
        return <OurTeam />;
      case 'talashai':
        return <TalashAI />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <TalashAI />
    </div>
  );
}