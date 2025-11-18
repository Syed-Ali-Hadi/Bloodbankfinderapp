import { useState, useRef, useEffect } from 'react';
import { ChatWidget } from './chat/ChatWidget';
import { ChatModal } from './chat/ChatModal';
import { ChatMessage, TypingIndicator } from './chat/ChatMessage';
import { QuickActions } from './chat/QuickActions';
import { BloodBankResultCard } from './chat/BloodBankResultCard';
import { RequestBloodForm, RequestConfirmation, RequestFormData } from './chat/RequestBloodForm';
import { DonorEligibilityFlow } from './chat/DonorEligibilityFlow';
import { EmergencyMode } from './chat/EmergencyMode';
import { ChatComposer } from './chat/ChatComposer';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
  component?: React.ReactNode;
}

type ChatState = 'home' | 'blood-search' | 'request-form' | 'request-confirmation' | 'donor-eligibility' | 'emergency';

export function TalashAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('home');
  const [requestReferenceId, setRequestReferenceId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        addBotMessage(
          "Hi — I'm Talash AI. How can I help?\n\n💡 Try: 'Find nearest O- blood' or choose an action below."
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, component?: React.ReactNode) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      component,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'find-nearest':
        addUserMessage('Find nearest blood bank');
        simulateTyping(() => {
          setChatState('blood-search');
          handleFindNearestBank();
        });
        break;
      
      case 'check-availability':
        addUserMessage('Check blood availability');
        simulateTyping(() => {
          addBotMessage('Which blood type are you looking for?');
        });
        break;
      
      case 'request-blood':
        addUserMessage('Request blood');
        simulateTyping(() => {
          setChatState('request-form');
          addBotMessage('Please fill out the request form:', <RequestBloodForm onSubmit={handleRequestSubmit} onCancel={handleRequestCancel} />);
        });
        break;
      
      case 'become-donor':
        addUserMessage('I want to become a donor');
        simulateTyping(() => {
          setChatState('donor-eligibility');
          addBotMessage('Great! Let me check your eligibility. Please answer a few questions:', <DonorEligibilityFlow onComplete={handleDonorComplete} onCancel={handleDonorCancel} />);
        });
        break;
      
      case 'emergency':
        addUserMessage('Emergency - need blood urgently');
        simulateTyping(() => {
          setChatState('emergency');
          handleEmergencyMode();
        }, 500);
        break;
    }
  };

  const handleFindNearestBank = () => {
    addBotMessage('Allow location to find nearby blood banks?');
    
    // Simulate location permission and search
    setTimeout(() => {
      addBotMessage('Found 3 blood banks near you:', 
        <div className="mt-3 space-y-2">
          <BloodBankResultCard
            bank={mockBloodBanks[0]}
            onRequestClick={handleBankRequestClick}
          />
          <BloodBankResultCard
            bank={mockBloodBanks[1]}
            onRequestClick={handleBankRequestClick}
          />
          <BloodBankResultCard
            bank={mockBloodBanks[2]}
            onRequestClick={handleBankRequestClick}
          />
        </div>
      );
    }, 2000);
  };

  const handleBankRequestClick = (bankId: string) => {
    setChatState('request-form');
    addBotMessage('Please fill out the request form:', <RequestBloodForm onSubmit={handleRequestSubmit} onCancel={handleRequestCancel} />);
  };

  const handleRequestSubmit = (data: RequestFormData) => {
    const refId = `TBL${Date.now().toString().slice(-8)}`;
    setRequestReferenceId(refId);
    setChatState('request-confirmation');
    addBotMessage('', <RequestConfirmation referenceId={refId} onClose={handleRequestConfirmationClose} />);
  };

  const handleRequestCancel = () => {
    setChatState('home');
    addBotMessage('Request cancelled. How else can I help you?');
  };

  const handleRequestConfirmationClose = () => {
    setChatState('home');
    addBotMessage('Is there anything else I can help you with?');
  };

  const handleDonorComplete = (eligible: boolean, appointmentDate?: Date) => {
    if (eligible && appointmentDate) {
      setChatState('home');
      addBotMessage(`Appointment scheduled for ${appointmentDate.toLocaleDateString()}. We'll send you a confirmation SMS shortly. Thank you for being a hero! 🎉`);
    } else {
      setChatState('home');
      addBotMessage('Thank you for your interest. Please consult with a healthcare provider for more information.');
    }
  };

  const handleDonorCancel = () => {
    setChatState('home');
    addBotMessage('Eligibility check cancelled. How else can I help you?');
  };

  const handleBackToHome = () => {
    setChatState('home');
    addBotMessage('How else can I help you?');
  };

  const handleEmergencyMode = () => {
    addBotMessage('⚠️ EMERGENCY MODE ACTIVATED\n\nFor life-threatening situations, call 1122 (Rescue) or 115 (Aman Ambulance) immediately.\n\nShowing blood banks with immediate stock:', 
      <EmergencyMode 
        urgentBloodType="O-"
        emergencyBanks={mockEmergencyBanks}
      />
    );
  };

  const handleSendMessage = (message: string) => {
    addUserMessage(message);
    
    // Simple message handling
    simulateTyping(() => {
      if (message.toLowerCase().includes('nearest') || message.toLowerCase().includes('find')) {
        setChatState('blood-search');
        handleFindNearestBank();
      } else if (message.toLowerCase().includes('request')) {
        setChatState('request-form');
        addBotMessage('Please fill out the request form:', <RequestBloodForm onSubmit={handleRequestSubmit} onCancel={handleRequestCancel} />);
      } else if (message.toLowerCase().includes('donor') || message.toLowerCase().includes('donate')) {
        setChatState('donor-eligibility');
        addBotMessage('Great! Let me check your eligibility:', <DonorEligibilityFlow onComplete={handleDonorComplete} onCancel={handleDonorCancel} />);
      } else if (message.toLowerCase().includes('emergency')) {
        setChatState('emergency');
        handleEmergencyMode();
      } else {
        addBotMessage("I can help you with:\n• Finding blood banks\n• Checking availability\n• Requesting blood\n• Donor registration\n\nWhat would you like to do?");
      }
    });
  };

  return (
    <>
      <ChatWidget
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        unreadCount={0}
        isEmergency={chatState === 'emergency'}
      />

      <ChatModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        isEmergency={chatState === 'emergency'}
      >
        <div className="flex flex-col h-full">
          {/* Quick Actions - Sticky at top, only show in home state */}
          {chatState === 'home' && messages.length > 0 && (
            <div className="sticky top-0 bg-white border-b p-4 z-10 shadow-sm">
              <QuickActions onActionClick={handleQuickAction} />
            </div>
          )}

          {/* Back to Menu Button - Show when not in home state */}
          {chatState === 'blood-search' && (
            <div className="sticky top-0 bg-gray-50 border-b p-3 z-10">
              <button
                onClick={handleBackToHome}
                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Menu
              </button>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Messages */}
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
              >
                {message.component}
              </ChatMessage>
            ))}

            {/* Typing Indicator */}
            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Composer - Hide during forms */}
          {!['request-form', 'donor-eligibility', 'emergency'].includes(chatState) && (
            <ChatComposer 
              onSendMessage={handleSendMessage}
              disabled={isTyping}
            />
          )}
        </div>
      </ChatModal>
    </>
  );
}

// Mock Data
const mockBloodBanks = [
  {
    id: '1',
    name: 'Aga Khan University Hospital Blood Bank',
    address: 'Stadium Road, Karachi',
    distance: '2.3 km',
    phone: '+92-21-34864196',
    hours: '24/7',
    availability: {
      'A+': 45,
      'A-': 12,
      'B+': 38,
      'B-': 8,
      'O+': 52,
      'O-': 15,
      'AB+': 22,
      'AB-': 5,
    },
    lat: 24.8898,
    lng: 67.0722,
    lastUpdated: '10 mins ago',
  },
  {
    id: '2',
    name: 'Liaquat National Hospital Blood Bank',
    address: 'National Stadium Road, Karachi',
    distance: '3.1 km',
    phone: '+92-21-34120368',
    hours: '8:00 AM - 8:00 PM',
    availability: {
      'A+': 32,
      'A-': 18,
      'B+': 28,
      'B-': 11,
      'O+': 41,
      'O-': 9,
      'AB+': 19,
      'AB-': 7,
    },
    lat: 24.8768,
    lng: 67.0661,
    lastUpdated: '25 mins ago',
  },
  {
    id: '3',
    name: 'Jinnah Postgraduate Medical Centre',
    address: 'Rafiqui Shaheed Road, Karachi',
    distance: '4.5 km',
    phone: '+92-21-99201300',
    hours: '24/7',
    availability: {
      'A+': 55,
      'A-': 22,
      'B+': 44,
      'B-': 14,
      'O+': 62,
      'O-': 19,
      'AB+': 31,
      'AB-': 9,
    },
    lat: 24.8786,
    lng: 67.0446,
    lastUpdated: '5 mins ago',
  },
];

const mockEmergencyBanks = [
  {
    id: '1',
    name: 'Aga Khan University Hospital',
    address: 'Stadium Road, Karachi',
    distance: '2.3 km',
    phone: '+92-21-34864196',
    hours: '24/7 Emergency',
    availableTypes: ['A+', 'B+', 'O+', 'O-', 'AB+'],
    totalUnits: 184,
    lat: 24.8898,
    lng: 67.0722,
  },
  {
    id: '3',
    name: 'Jinnah Postgraduate Medical Centre',
    address: 'Rafiqui Shaheed Road, Karachi',
    distance: '4.5 km',
    phone: '+92-21-99201300',
    hours: '24/7 Emergency',
    availableTypes: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    totalUnits: 256,
    lat: 24.8786,
    lng: 67.0446,
  },
];