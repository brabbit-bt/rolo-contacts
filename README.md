# Rolo Contacts

A modern contact management web application built with React, TypeScript, and TailwindCSS. Designed for professionals who want to maintain meaningful relationships with their network.

## 🚀 Features

### Core Functionality
- **Contact Management**: Add, edit, view, and delete contacts
- **Rich Contact Profiles**: Store comprehensive information including LinkedIn URLs, company details, and relationship context
- **Priority System**: Rate relationship importance (0-10) with color-coded priority badges
- **Search & Filter**: Find contacts by name, company, tags, or keywords
- **Tag System**: Organize contacts with custom tags and keywords

### Advanced Features
- **Meeting Notes**: Track meeting history with dates, locations, and detailed notes
- **Reminders**: Set follow-up reminders with dates and custom text
- **Interests & Hobbies**: Store personal interests for better relationship building
- **Podcasts & Channels**: Track media preferences and content consumption
- **Form Auto-save**: Drafts are automatically saved to localStorage
- **Toast Notifications**: User-friendly feedback for all actions

### Design & UX
- **Modern UI**: Clean, Crunchbase-inspired design with teal accent color (#14B8A6)
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Hover effects and transitions powered by Framer Motion
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom design system
- **State Management**: Zustand for global state
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Data Persistence**: localStorage (easily swappable to API)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rolo-contacts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── FormField.tsx
│   │   ├── AccordionSection.tsx
│   │   ├── PrioritySlider.tsx
│   │   ├── TagInput.tsx
│   │   └── Toast.tsx
│   ├── ContactCard.tsx     # Contact card for dashboard
│   ├── ContactForm.tsx     # Add/edit contact form
│   ├── ContactDetail.tsx   # Contact detail view
│   └── ContactsDashboard.tsx # Main dashboard
├── services/
│   └── contactService.ts   # Data persistence layer
├── store/
│   └── contactStore.ts     # Zustand state management
├── types/
│   └── contact.ts          # TypeScript interfaces
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Teal (#14B8A6) - Main accent color
- **Success**: Green (#10B981) - Priority 0-3
- **Warning**: Yellow (#F59E0B) - Priority 4-6
- **Danger**: Red (#EF4444) - Priority 7-10
- **Neutral**: Gray scale for text and backgrounds

### Components
- **Cards**: Rounded corners (2xl), subtle shadows, hover effects
- **Buttons**: Primary (teal) and secondary (gray) variants with hover animations
- **Forms**: Consistent input styling with focus states
- **Tags**: Pill-shaped chips with color coding

## 🔧 Configuration

### TailwindCSS
The project uses a custom TailwindCSS configuration with:
- Extended color palette
- Custom border radius (2xl)
- Custom animations (fade-in, slide-up)
- Component classes for consistent styling

### TypeScript
Strict TypeScript configuration with:
- Strict mode enabled
- No unused locals/parameters
- React JSX runtime

## 📱 Usage

### Adding a Contact
1. Click "Add Contact" on the dashboard
2. Fill in required fields (Name, Relationship Context)
3. Set relationship priority using the slider
4. Add optional information in expandable sections
5. Click "Save Contact"

### Managing Contacts
- **View**: Click any contact card to see full details
- **Edit**: Click "Edit" in contact detail view
- **Delete**: Click "Delete" in contact detail view
- **Search**: Use the search bar to find contacts
- **Filter**: Use tag filters to narrow down results

### Form Features
- **Auto-save**: Drafts are saved automatically
- **Validation**: Required fields are validated
- **Expandable Sections**: Optional information is organized in collapsible sections
- **Tag Input**: Add tags by typing and pressing Enter or comma

## 🔄 Data Persistence

The app currently uses localStorage for data persistence. The `ContactService` interface is designed to be easily swappable with an API implementation:

```typescript
interface ContactService {
  getAll(): Promise<Contact[]>;
  getById(id: string): Promise<Contact | null>;
  create(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact>;
  update(id: string, contact: Partial<Contact>): Promise<Contact>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Contact[]>;
  filterByTags(tags: string[]): Promise<Contact[]>;
}
```

## 🚀 Future Enhancements

- **API Integration**: Replace localStorage with backend API
- **Authentication**: User accounts and data isolation
- **Import/Export**: CSV/JSON data import/export
- **Advanced Search**: Full-text search with filters
- **Reminders**: Push notifications for follow-ups
- **Analytics**: Relationship insights and metrics
- **Mobile App**: React Native companion app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspired by Crunchbase and modern SaaS applications
- Icons from Lucide React
- Built with Vite for fast development experience 