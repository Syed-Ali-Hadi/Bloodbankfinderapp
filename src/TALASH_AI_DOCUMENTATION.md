# Talash AI - Chatbot Design Documentation

## Overview
Talash AI is an intelligent chatbot assistant integrated into the Talash-e-Blood website, designed to help users find blood banks, check availability, request blood units, register as donors, and handle emergency situations.

---

## Design System

### Color Palette
- **Background**: `#FFFFFF` (White)
- **Primary Red**: `#D8232A` (Main brand color)
- **Accent Red**: `#E8646A` (Lighter red for highlights)
- **Surface**: `#F7F7F8` (Light gray for cards)
- **Text**: `#111827` (Near black)
- **Text Muted**: `#6B7280` (Gray for secondary text)
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Yellow)
- **Error**: `#EF4444` (Red)

### Typography
- **Font Family**: Inter (system sans-serif fallback)
- **Headings**: 18–22px, semibold (600)
- **Body Text**: 14px, regular (400)
- **Small Text**: 12px, regular (400)
- **Line Height**: 1.5

### Component States
- **Buttons**: Default / Hover / Disabled / Loading
- **Widget**: Closed / Open / Emergency / Unread Badge
- **Bank Cards**: Compact / Expanded
- **Messages**: Bot (left-aligned) / User (right-aligned)

---

## Sample Content Blocks

### Welcome Message
```
Hi — I'm Talash AI. How can I help?

💡 Try: 'Find nearest O- blood' or choose an action below.
```

### Quick Action Labels
1. **Find nearest blood bank** - Locates nearby blood banks
2. **Check blood availability** - Search for specific blood types
3. **Request blood** - Submit a blood request form
4. **Become a donor** - Donor eligibility screening
5. **Emergency** - Activate emergency mode for urgent needs

### Location Permission Prompt
```
Allow location to find nearby blood banks?
```

### Blood Search Results Introduction
```
Found 3 blood banks near you:
```

### Example Blood Bank Card (Compact)
```
Aga Khan University Hospital Blood Bank
📍 2.3 km away
6 types available

[Details] [Call] [Go]
```

### Example Blood Bank Card (Expanded)
```
Aga Khan University Hospital Blood Bank

📍 Address
Stadium Road, Karachi

🏢 District
Karachi East

📞 Phone Number
+92-21-34864196

🕐 Working Hours
24/7

Blood Availability (Updated 10 mins ago)
A+: 45 units  A-: 12 units
B+: 38 units  B-: 8 units
O+: 52 units  O-: 15 units
AB+: 22 units AB-: 5 units

[Navigate] [Call Now]
[Request Blood]
```

---

## Request Form Fields & Labels

### Form Fields
1. **Blood Type*** (dropdown)
   - Options: A+, A-, B+, B-, O+, O-, AB+, AB-
   
2. **Number of Units*** (number input)
   - Placeholder: "e.g., 2"
   - Min: 1
   
3. **Delivery Type** (radio buttons)
   - Pickup
   - Delivery
   
4. **Recipient Type** (radio buttons)
   - Patient
   - Hospital
   
5. **Patient/Hospital Name*** (text input)
   - Placeholder: "Enter patient name" / "Enter hospital name"
   
6. **Contact Number*** (tel input)
   - Placeholder: "+92 XXX XXXXXXX"
   
7. **Urgency Level** (dropdown)
   - Routine (within 24-48 hours)
   - Urgent (within 6-12 hours)
   - Critical (immediate)
   
8. **Additional Notes** (textarea, optional)
   - Placeholder: "Any special requirements or additional information..."

### Error Messages
- **Blood type is required** - Shown when blood type not selected
- **Valid number of units is required** - Shown when units field is empty or invalid
- **Recipient name is required** - Shown when name field is empty
- **Contact number is required** - Shown when phone field is empty
- **Invalid phone number format** - Shown when phone format is incorrect

### Form Disclaimer
```
Note: For life-threatening emergencies, call 1122 (Rescue) or 115 (Aman Ambulance) immediately.
```

### Success Confirmation
```
Request Submitted ✓

Your blood request has been submitted successfully.

Reference ID
TBL87654321

The blood bank will contact you within 30 minutes. Please keep your phone accessible.

[Done]
```

---

## Donor Eligibility Questions

### Screening Questions (7 total)
1. Are you between 18-60 years of age?
2. Do you weigh at least 50 kg (110 lbs)?
3. Are you in good general health?
4. Have you had any illness or infection in the past 2 weeks?
5. Have you had any surgery in the past 6 months?
6. Are you currently taking antibiotics or other medications?
7. Have you donated blood in the past 3 months?

### Eligibility Success Message
```
You're Eligible! ✓

Great! You appear to be eligible to donate blood. Schedule an appointment to proceed.

Select Appointment Date
[Calendar Widget]

Note: Blood banks are closed on Sundays

Before you donate:
• Get adequate sleep (6-8 hours)
• Eat a healthy meal before donation
• Drink plenty of water
• Bring a valid ID

[Cancel] [Confirm Appointment]
```

### Not Eligible Message
```
Not Eligible at This Time ✗

Based on your responses, you may not be eligible to donate blood at this time. Please consult with a healthcare provider for more information.

Common temporary deferral reasons include:
• Recent illness or infection
• Recent surgery or dental work
• Certain medications
• Recent blood donation

[Close]
```

### Appointment Confirmation
```
Appointment scheduled for November 20, 2025. We'll send you a confirmation SMS shortly. Thank you for being a hero! 🎉
```

---

## Emergency Mode Content

### Emergency Banner
```
⚠️ EMERGENCY MODE ACTIVATED

Showing blood banks with O- stock available
```

### Emergency Call-to-Action
```
For life-threatening emergencies:

[1122 Rescue] [115 Aman]
```

### Emergency Bank Card
```
Aga Khan University Hospital

📍 2.3 km away
184 units available

Blood Types: A+ B+ O+ O- AB+

🕐 24/7 Emergency

[Navigate] [Call Now]
```

### Emergency Footer Note
```
Stock information updated in real-time. Always call ahead to confirm availability.
```

---

## Accessibility Features

### ARIA Labels
- Widget button: "Open chat with Talash AI" / "Close chat"
- Send button: "Send message"
- Voice button: "Voice input"
- Attachment button: "Attach file"
- Message input: "Type your message"

### Touch Targets
- Minimum size: 44×44 pixels
- Adequate spacing between interactive elements

### Focus States
- Visible focus indicators on all interactive elements
- Keyboard navigation support

### Contrast Ratios
- Text on background: 4.5:1 minimum
- Interactive elements: 3:1 minimum

---

## Interaction Patterns

### Widget Open Animation
- Duration: 300ms
- Easing: spring (bounce effect)
- Transform: scale(0.95) → scale(1)

### Message Send Flow
1. User types message
2. Clicks send or presses Enter
3. Message appears instantly in chat
4. Typing indicator shows (1 second)
5. Bot response appears

### Quick Action Flow
1. User clicks quick action chip
2. Message auto-sends with action text
3. Relevant UI opens (form, cards, etc.)

### Card Expansion
1. User clicks compact blood bank card
2. Card expands with slide-down animation
3. Full details and actions revealed

### Form Submission
1. User fills form and clicks submit
2. Validation runs
3. Success: Show confirmation with reference ID
4. Error: Highlight invalid fields with messages

---

## Bot Persona Guidelines

### Tone & Voice
- **Professional**: Medical and health-focused
- **Calm**: Non-alarming, reassuring language
- **Empathetic**: Understanding of urgent situations
- **Concise**: Clear, brief responses

### Safety Reminders
Talash AI always reminds users to:
- Call emergency services (1122 or 115) for life-threatening situations
- Verify blood availability by calling ahead
- Check timestamps for stock updates

### Example Bot Responses

**General Help**
```
I can help you with:
• Finding blood banks
• Checking availability
• Requesting blood
• Donor registration

What would you like to do?
```

**After Request Submission**
```
Request submitted successfully. The blood bank will contact you shortly. Is there anything else I can help you with?
```

**Request Cancellation**
```
Request cancelled. How else can I help you?
```

**After Donor Screening**
```
Thank you for your interest. Please consult with a healthcare provider for more information.
```

**Emergency Activation**
```
⚠️ EMERGENCY MODE ACTIVATED

For life-threatening situations, call 1122 (Rescue) or 115 (Aman Ambulance) immediately.

Showing blood banks with immediate stock:
```

---

## Component Variants

### ChatWidget States
1. **Idle** - Red blood drop icon, no badge
2. **Unread** - Red blood drop with count badge (e.g., "2")
3. **Emergency** - Pulsing red with alert icon
4. **Open** - X icon to close

### Button Variants
1. **Primary** - Red background, white text
2. **Secondary** - White background, gray border
3. **Destructive** - Dark red for emergency actions
4. **Outline** - Transparent with border
5. **Ghost** - No background or border

### Blood Bank Card Variants
1. **Compact** - Name, distance, summary, 3 action buttons
2. **Expanded** - Full details, availability grid, contact info

### Message Bubbles
1. **Bot** - Left-aligned, gray background, blood drop avatar
2. **User** - Right-aligned, red background, "You" label

---

## Mobile Optimization

### Widget Position
- Bottom-right corner
- 24px margin from edges
- Size: 64×64 pixels (perfect for thumb reach)

### Modal Behavior
- Mobile: Full-screen from bottom with slide-up
- Desktop: Centered, 600×700 pixels
- Rounded corners on desktop only

### Touch Interactions
- Swipe down to close on mobile
- Tap outside to close
- Large tap targets for all buttons

---

## Desktop Variant

### Modal Specifications
- Size: 600×700 pixels
- Position: Centered on screen
- Shadow: Large drop shadow for depth
- Backdrop: Semi-transparent dark overlay with blur

### Responsive Breakpoints
- Mobile: < 768px
- Desktop: ≥ 768px

---

## Timestamps & Updates

### Display Format
- Recent: "5 mins ago"
- Same day: "2:30 PM"
- Previous days: "Nov 15, 2:30 PM"

### Stock Updates
All blood availability data shows "Last updated" timestamp:
- "Updated 5 mins ago"
- "Updated 1 hour ago"
- "Updated today at 2:30 PM"

---

## Final Note

**Talash AI Bot Persona**: Professional & medical — always reminds users to call emergency services (1122 or 115) for life-threatening situations and provides last-updated timestamps for availability to ensure accurate, timely information.

The chatbot prioritizes user safety, provides clear guidance, and maintains a calm, empathetic tone throughout all interactions. Emergency mode is prominently accessible and clearly communicated, with visual cues (red accents, pulsing animations) to convey urgency when activated.
