import { Button } from './ui/button';
import { Search, Droplet, MapPin, Calendar, Users } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const scrollToBloodBanks = () => {
    const element = document.getElementById('blood-banks-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDonationDrives = () => {
    const element = document.querySelector('#donation-drives-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
            <Droplet className="size-4" fill="currentColor" />
            <span className="text-sm">Blood Bank Finder - Sindh</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Save Lives,<br />
            Donate Blood
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-red-100 mb-6">
            Aik Qatra, Hazaar Umeedein
          </p>
          
          <p className="text-lg md:text-xl mb-10 text-red-50 max-w-2xl mx-auto">
            Find blood banks and donation drives across Sindh, Pakistan. Connect with those in need and make a difference today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 border-2 border-white text-lg px-8 py-6"
              onClick={scrollToBloodBanks}
            >
              <Search className="size-5 mr-2" />
              Find Blood Banks
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-red-600 text-lg px-8 py-6"
              onClick={scrollToDonationDrives}
            >
              <Users className="size-5 mr-2" />
              Register for Donation Drives
            </Button>
          </div>

          {/* Secondary Action */}
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white/60 text-white bg-white/10 hover:bg-white hover:text-red-600 text-lg px-8 py-6"
            onClick={() => onNavigate('contact')}
          >
            <Droplet className="size-5 mr-2" />
            Become a Donor
          </Button>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <MapPin className="size-10 mx-auto mb-3" />
              <div className="text-3xl mb-2">15+</div>
              <div className="text-red-100">Blood Banks Across Sindh</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Droplet className="size-10 mx-auto mb-3" />
              <div className="text-3xl mb-2">8 Types</div>
              <div className="text-red-100">Blood Groups Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Calendar className="size-10 mx-auto mb-3" />
              <div className="text-3xl mb-2">24/7</div>
              <div className="text-red-100">Service Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#F9FAFB"/>
        </svg>
      </div>
    </div>
  );
}
