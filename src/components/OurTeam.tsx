import { Card, CardContent } from './ui/card';
import { User } from 'lucide-react';

export function OurTeam() {
  const teamMembers = [
    { name: 'Ali Hadi', role: 'UI/UX Designer' },
    { name: 'Taqi Abbas', role: 'Technical Lead' },
    { name: 'Momin Imran', role: 'Project Lead' },
    { name: 'Abdullah Kashif', role: 'Project Manager' },
    { name: 'Dania Khan', role: 'Content Manager' },
    { name: 'Maryam Afzal', role: 'Content Manager' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Our Team</h1>
          <p className="text-lg text-gray-600">
            Meet the dedicated team behind Talash-e-Blood
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="bg-red-100 size-24 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="size-12 text-red-600" />
                  </div>
                  <h3 className="text-xl mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mt-16">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <h2 className="text-2xl mb-4 text-center">Our Mission</h2>
              <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
                At Talash-e-Blood, we are committed to connecting blood donors with those in need
                across Sindh, Pakistan. Our platform aims to make blood donation more accessible,
                efficient, and life-saving. Every drop of blood donated through our network
                represents hope and a second chance at life.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl mb-2">Purpose</h3>
              <p className="text-gray-600">
                Connecting donors with recipients to save lives across Sindh
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-xl mb-2">Community</h3>
              <p className="text-gray-600">
                Building a network of compassionate donors and healthcare providers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl mb-2">Efficiency</h3>
              <p className="text-gray-600">
                Making blood donation quick, easy, and accessible 24/7
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
