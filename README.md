# TitikTemu - Event Discovery & Creation Platform

## Overview

**TitikTemu** is a vibrant social platform for discovering, creating, and joining casual events in your community. Whether you want to join a gaming session, basketball game, gym workout, or hangout - TitikTemu connects you with people and events.

The application features a bold **Neo-Brutalism** design aesthetic with:
- Vibrant solid colors (red, yellow, blue, green, purple)
- Thick black 4px borders on all elements
- Hard drop shadows (4px offset)
- Sharp corners (no rounded edges)
- Bento Grid layout for event discovery
- Bold, expressive typography

## Features

### 🎯 Event Joiner (Discover & Join)

- **Event Discovery Feed**: Browse all available events in a responsive Bento Grid layout
- **Search & Filter**: Search by event title or filter by category (Gaming, Sports, Fitness, Hangout, Other)
- **Event Details**: View comprehensive event information including:
  - Event title, description, and category
  - Date, time, and location with address
  - Participant count and available spots
  - Approval requirements
  - List of joined participants
  - Event creator information
  - Event tags
- **Event Actions**: Join events, leave events, view event details in modal
- **Category Filtering**: Multi-select category filtering with visual feedback

### 🔴 Event Creator (Create & Manage)

- **Create New Events**: Comprehensive form to create events with:
  - Event title, description, and detailed location
  - Date, time, and participant capacity
  - Category selection
  - Optional approval requirement for participants
- **Your Events Dashboard**: View all events you've created
- **Participant Management**: See joined and pending participants
- **Events Joined**: Display of other events you're participating in

### 👤 User Profile

- User avatar and name
- Bio and rating system (star-based)
- Statistics: Events Created, Events Joined
- Edit profile and settings options

## Design System

### Neo-Brutalism Aesthetic

The application embraces **Neo-Brutalism** design principles with:

**Colors:**
- Primary Red: `#ff3333` - Used for primary actions and accent
- Secondary Yellow: `#ffff00` - Used for highlights and category badges
- Accent Blue: `#0066ff` - Used for info and interactive states
- Green: `#00cc00` - Used for success states
- Black: `#000000` - Borders, text, shadows
- White: `#ffffff` - Backgrounds and contrast

**Typography:**
- DM Sans for body text (sans-serif)
- Bold and heavy font weights throughout
- Large, readable typography for clear hierarchy
- Text-balance for optimal line breaking

**Components:**
- 4px solid black borders on all UI elements
- 4px hard drop shadows with black
- Sharp corners (0px border-radius)
- Clear visual hierarchy through size and color
- Strong visual feedback on interactions (lift effect on hover)

**Layout:**
- Flexbox for primary layout method
- CSS Grid for complex 2D layouts (Bento)
- Responsive design with mobile-first approach
- Generous spacing and padding

## Project Structure

```
/app
  /layout.tsx          # Root layout with navigation
  /page.tsx            # Main page with role switching
  /globals.css         # Global styles and design tokens

/components
  /Navigation.tsx      # Role switcher and main navigation
  /JoinerView.tsx      # Event discovery interface
  /CreatorView.tsx     # Event creation and management
  /EventCard.tsx       # Individual event card component
  /EventGrid.tsx       # Grid layout for events
  /EventDetailModal.tsx # Comprehensive event details modal
  /CategoryFilter.tsx   # Category filtering component
  /CalendarView.tsx    # Calendar-style event view
  /UserProfile.tsx     # User profile card component
  /ParticipantCard.tsx # Participant listing component
  /NeoButton.tsx       # Neo-Brutalism styled button
  /Modal.tsx           # Reusable modal component
  /PageHeader.tsx      # Section header component

/lib
  /types.ts            # TypeScript interfaces
  /mock-data.ts        # Mock event and user data
  /utils.ts            # Utility functions (shadcn)
  /utils-custom.ts     # Custom utility functions
```

## Mock Data

The application comes with sample data including:
- **5 Events** covering different categories (Gaming, Sports, Fitness, Hangout)
- **Sample User** (Alex Wijaya) with event history
- **Multiple Participants** for each event with different statuses (Joined, Pending)

## Key Components

### EventCard
Displays event summary with:
- Event title and category badge
- Short description
- Date, time, and location
- Participant count and available spots
- Status indicator
- Approval requirement badge

### EventDetailModal
Full event details including:
- Large category emoji display
- Complete event information
- Location with address
- Full participant list with status
- Creator information
- Tags
- Action buttons (Join/Leave or Edit/Close)

### NeoButton
Styled button component with variants:
- Primary (Red)
- Secondary (Yellow)
- Success (Green)
- Danger (Red)
- Outline (White with border)

Includes interactive animations:
- Hover: Increased shadow and slight lift
- Active: Reduced shadow and depression effect
- Transition: Smooth 100ms duration

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

### Using the App

1. **Discover Events**: Start as an Event Joiner to browse available events
2. **Filter Events**: Use category filters to narrow down events
3. **View Details**: Click on any event card to see full details
4. **Switch Roles**: Use the "Create" button to switch to Event Creator mode
5. **Create Events**: Fill out the form to create new events
6. **Manage Events**: View your created events and their participants

## Technologies Used

- **Framework**: Next.js 16+ with React 19
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Icons**: Lucide React
- **Date Utilities**: date-fns
- **Language**: TypeScript

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Tested on desktop and tablet viewports

## Future Enhancements

Potential features for expansion:
- Backend integration with real database
- User authentication and accounts
- Real-time event notifications
- Direct messaging between users
- Event reviews and ratings
- Calendar integration
- Location-based event discovery
- Payment integration for paid events
- Event attendance tracking
- Social features (follow, friend requests)

## Design Philosophy

TitikTemu embraces Neo-Brutalism as a deliberate design choice because:

1. **Bold & Confident**: The thick borders and solid colors make a clear statement
2. **Accessible**: High contrast and large text improve readability
3. **Playful**: The vibrant color palette and sharp edges create a casual, fun atmosphere
4. **Modern**: Contemporary design style that feels fresh and trendy
5. **Casual**: Perfect for a platform focused on informal, social events

## Notes

- This is a frontend-only demo with mock data
- Event interactions are simulated (no persistence)
- Approval workflows are displayed but not functional
- All timestamps use mock dates for demonstration

---

Built with ❤️ using Neo-Brutalism design principles. Perfect for discovering and creating casual events in your community!
