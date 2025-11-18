import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { CheckCircle2, XCircle, Info, ChevronRight } from 'lucide-react';

interface DonorEligibilityFlowProps {
  onComplete: (eligible: boolean, appointmentDate?: Date) => void;
  onCancel: () => void;
}

interface Question {
  id: string;
  question: string;
  disqualifyOn: 'yes' | 'no';
}

const eligibilityQuestions: Question[] = [
  {
    id: 'age',
    question: 'Are you between 18-60 years of age?',
    disqualifyOn: 'no',
  },
  {
    id: 'weight',
    question: 'Do you weigh at least 50 kg (110 lbs)?',
    disqualifyOn: 'no',
  },
  {
    id: 'health',
    question: 'Are you in good general health?',
    disqualifyOn: 'no',
  },
  {
    id: 'illness',
    question: 'Have you had any illness or infection in the past 2 weeks?',
    disqualifyOn: 'yes',
  },
  {
    id: 'surgery',
    question: 'Have you had any surgery in the past 6 months?',
    disqualifyOn: 'yes',
  },
  {
    id: 'medication',
    question: 'Are you currently taking antibiotics or other medications?',
    disqualifyOn: 'yes',
  },
  {
    id: 'recentDonation',
    question: 'Have you donated blood in the past 3 months?',
    disqualifyOn: 'yes',
  },
];

export function DonorEligibilityFlow({ onComplete, onCancel }: DonorEligibilityFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const currentQuestion = eligibilityQuestions[currentStep];
  const progress = ((currentStep + 1) / eligibilityQuestions.length) * 100;

  const handleAnswer = (answer: 'yes' | 'no') => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    // Check if this answer disqualifies
    if (
      (currentQuestion.disqualifyOn === 'yes' && answer === 'yes') ||
      (currentQuestion.disqualifyOn === 'no' && answer === 'no')
    ) {
      setIsEligible(false);
      return;
    }

    // Move to next question or show eligibility
    if (currentStep < eligibilityQuestions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setIsEligible(true);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isEligible === false) {
    return (
      <div className="p-6 text-center">
        <div className="size-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="size-8 text-red-600" />
        </div>
        
        <h3 className="text-lg mb-2">Not Eligible at This Time</h3>
        <p className="text-sm text-gray-600 mb-6">
          Based on your responses, you may not be eligible to donate blood at this time. Please consult with a healthcare provider for more information.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <div className="flex gap-2">
            <Info className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-700">
              <p className="mb-2">Common temporary deferral reasons include:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Recent illness or infection</li>
                <li>Recent surgery or dental work</li>
                <li>Certain medications</li>
                <li>Recent blood donation</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => onComplete(false)}
          variant="outline"
          className="w-full"
        >
          Close
        </Button>
      </div>
    );
  }

  if (isEligible === true) {
    return (
      <div className="p-4">
        <div className="text-center mb-6">
          <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="size-8 text-green-600" />
          </div>
          <h3 className="text-lg mb-2">You're Eligible!</h3>
          <p className="text-sm text-gray-600">
            Great! You appear to be eligible to donate blood. Schedule an appointment to proceed.
          </p>
        </div>

        <div className="mb-6">
          <Label className="mb-3 block">Select Appointment Date</Label>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className="rounded-md border"
            />
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center">
            Blood banks are closed on Sundays
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 mb-6">
          <div className="flex gap-2">
            <Info className="size-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-700">
              <p className="mb-2"><strong>Before you donate:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Get adequate sleep (6-8 hours)</li>
                <li>Eat a healthy meal before donation</li>
                <li>Drink plenty of water (avoid caffeine)</li>
                <li>Bring a valid ID (CNIC or Passport)</li>
                <li>Avoid fatty foods 24 hours before</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => onComplete(true, selectedDate)}
            disabled={!selectedDate}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Confirm Appointment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {eligibilityQuestions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-base mb-6">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          <button
            onClick={() => handleAnswer('yes')}
            className="w-full flex items-center justify-between p-4 border-2 rounded-lg hover:bg-gray-50 hover:border-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <span className="text-sm">Yes</span>
            <ChevronRight className="size-4 text-gray-400" />
          </button>
          <button
            onClick={() => handleAnswer('no')}
            className="w-full flex items-center justify-between p-4 border-2 rounded-lg hover:bg-gray-50 hover:border-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <span className="text-sm">No</span>
            <ChevronRight className="size-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2">
        {currentStep > 0 && (
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex-1"
          >
            Back
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}