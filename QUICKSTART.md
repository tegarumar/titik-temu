# TitikTemu - Quick Start Guide

## Welcome to TitikTemu! 🎯

TitikTemu is a bold, interactive event discovery and creation platform built with Next.js, React, and the striking Neo-Brutalism design aesthetic.

## 🚀 Getting Started (60 seconds)

### Prerequisites
- Node.js 18+ installed
- pnpm (or npm/yarn)

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start the development server
pnpm dev

# 3. Open in browser
# Visit: http://localhost:3000
```

**That's it!** The application will automatically open with hot module replacement enabled.

## 🎮 Using the App

### The Two Roles

TitikTemu lets you experience two different modes:

#### 🔵 Discover Events (Event Joiner)
- Click **"Discover"** button in the top navigation
- See all available events in a beautiful grid layout
- **Search**: Type event names in the search bar
- **Filter**: Click category buttons (Gaming, Sports, Fitness, Hangout, Other)
- **View Details**: Click any event card to see full details
- **Join**: From the modal, click "Join Event" button

#### 🔴 Create Events (Event Creator)
- Click **"Create"** button in the top navigation
- See your created events and other events you've joined
- **Create New**: Click the yellow "Create New Event" button
- **Fill Form**: Enter event details (title, location, date, capacity, etc.)
- **Submit**: Click "Create Event" to save

### Interactive Features

**Navigation Bar**
- Logo and app name on the left
- Role switcher buttons in the center
- Calendar and settings buttons on the right

**Event Cards**
- Title and category emoji badge
- Short description preview
- Date, time, and location
- Participant count and available spots
- Approval requirement indicator

**Event Details Modal**
- Full event information
- Complete participant list
- Creator information
- Event tags
- Join/Leave action buttons

**Category Filter**
- Click any category to filter
- Click again to deselect
- Real-time results update
- Shows event count

## 🎨 Design Features

### Neo-Brutalism Design
TitikTemu embraces **Neo-Brutalism** - a bold, modern design style featuring:

- **Thick Black Borders**: 4px solid borders on all elements
- **Hard Shadows**: 4px drop shadows for depth
- **Vibrant Colors**: Red, Yellow, Blue, Green, Purple
- **Bold Typography**: Heavy fonts and large sizes
- **Sharp Corners**: No rounded edges
- **High Contrast**: Clear, legible content

### Color Meanings
- 🔴 **Red**: Primary actions, important buttons
- 🟡 **Yellow**: Highlights, badges, headers
- 🔵 **Blue**: Information, filters, secondary actions
- 🟢 **Green**: Success states, available spots
- 🟣 **Purple**: Special elements, sections
- ⚫ **Black**: Borders, text, shadows
- ⚪ **White**: Backgrounds, clean space

## 📱 Responsive Design

The app works great on all screen sizes:

- **Mobile** (< 640px): Single column event grid
- **Tablet** (640px - 1024px): Two column grid
- **Desktop** (> 1024px): Three column Bento grid

Try resizing your browser to see the layout adapt!

## 🧪 Sample Data

The app comes with pre-loaded events for demonstration:

1. **Mobile Legends Tournament** - Gaming, 3/5 players
2. **Basketball Game 5v5** - Sports, 7/10 players (Approval needed)
3. **Morning Gym Session** - Fitness, 12/20 participants
4. **Board Game Hangout** - Social, 5/8 attendees
5. **Badminton Tournament** - Sports, 6/8 players (Approval needed)

All events have detailed information, participant lists, and event descriptions.

## ⌨️ Keyboard Navigation

- **Tab**: Move between interactive elements
- **Enter/Space**: Activate buttons and click elements
- **Escape**: Close modals and dialogs

## 🔧 Customization

### Change Colors
Edit `app/globals.css` to modify the color palette:

```css
:root {
  --primary: #ff3333;        /* Change primary red */
  --secondary: #ffff00;      /* Change secondary yellow */
  --accent: #0066ff;         /* Change accent blue */
  /* ... etc */
}
```

### Modify Text
All event text is in `lib/mock-data.ts`. Edit titles, descriptions, locations to customize.

### Add More Events
In `lib/mock-data.ts`, add to the `mockEvents` array:

```typescript
{
  id: 'event-6',
  title: 'Your Event Title',
  description: 'Event description...',
  category: 'gaming',
  date: new Date(2024, 11, 20),
  // ... other properties
}
```

## 🛠️ Development Commands

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Check types
pnpm type-check
```

## 📁 Project Structure

```
/components      - React components
  /EventCard.tsx - Individual event card
  /Navigation.tsx - Top navigation bar
  /JoinerView.tsx - Discovery interface
  /CreatorView.tsx - Creation interface
  /NeoButton.tsx - Styled button component

/lib
  /types.ts      - TypeScript interfaces
  /mock-data.ts  - Sample events & users
  /utils.ts      - Utility functions

/app
  /page.tsx      - Main page
  /layout.tsx    - Root layout
  /globals.css   - Global styles
```

## 🎓 Learn More

- **Design System**: See `DESIGN_SYSTEM.md` for complete design documentation
- **README**: See `README.md` for full feature list
- **Implementation**: See `IMPLEMENTATION_NOTES.md` for technical details

## 🐛 Troubleshooting

### App won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm dev
```

### Styling looks wrong?
- Make sure CSS is loaded: Check browser dev tools for `globals.css`
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

### Events not showing?
- Check that mock data is imported in `page.tsx`
- Open browser console (F12) for any errors
- Verify no TypeScript errors: `pnpm type-check`

## 🚀 Next Steps

1. **Explore the Code**: Look at how components are structured
2. **Modify Data**: Change event details in `mock-data.ts`
3. **Customize Colors**: Update color palette in `globals.css`
4. **Add Features**: Build additional components following the patterns
5. **Deploy**: Use `vercel deploy` or deploy to your hosting

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## 💡 Tips

- **Hot Reload**: Changes to `.tsx` files auto-update in browser
- **Dev Tools**: Use React DevTools browser extension for debugging
- **Responsive Testing**: Use browser dev tools (F12) to test mobile sizes
- **Color Picker**: Use browser color picker to tweak design colors

## 🎉 Have Fun!

TitikTemu is ready to explore, customize, and extend. The Neo-Brutalism design aesthetic makes it unique and memorable.

---

**Questions?** Check the documentation files or explore the component code!

Happy coding! 🚀
