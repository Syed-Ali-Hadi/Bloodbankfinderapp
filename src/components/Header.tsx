import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import logo from 'figma:asset/536a7fd03fa76df48adf91b3a163115b6684cc7c.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'team', label: 'Our Team' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDonationDrives = () => {
    setOpen(false);
    onNavigate('home');
    setTimeout(() => {
      const element = document.querySelector('#donation-drives-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo and Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="bg-white p-2 rounded">
              <img src={logo} alt="Talash-e-Blood" className="h-16 w-auto" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg">Talash-e-Blood</h1>
              <p className="text-xs text-gray-600">Aik Qatra, Hazaar Umeedein</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick('home')}
              className="bg-red-600 hover:bg-red-700"
            >
              Find Blood Bank
            </Button>
          </nav>

          {/* Mobile Quick Access Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Quick Access Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-3 rounded-lg text-left transition-colors ${
                      currentPage === item.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-700 hover:bg-red-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t pt-3 mt-2">
                  <p className="text-xs text-gray-500 mb-3 px-4">Quick Links</p>
                  <button
                    onClick={scrollToDonationDrives}
                    className="px-4 py-3 rounded-lg text-left w-full text-gray-700 hover:bg-red-50"
                  >
                    Donation Drives
                  </button>
                  <button
                    onClick={() => {
                      handleNavClick('home');
                    }}
                    className="px-4 py-3 rounded-lg text-left w-full text-gray-700 hover:bg-red-50 mt-2"
                  >
                    Blood Banks
                  </button>
                </div>
                <Button
                  onClick={() => handleNavClick('home')}
                  className="bg-red-600 hover:bg-red-700 w-full mt-4"
                >
                  Find Blood Bank
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
