export interface Contact {
  id: string;
  name: string;
  linkedinUrl?: string;
  company?: string;
  position?: string;
  relationshipContext: string;
  relationshipPriority: number;
  notes?: string;
  tags: string[];
  keywords: string[];
  meetingNotes: MeetingNote[];
  reminders: Reminder[];
  podcasts: string[];
  interests: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MeetingNote {
  id: string;
  date: string;
  location?: string;
  notes: string;
}

export interface Reminder {
  id: string;
  date: string;
  text: string;
}

export interface ContactFormData {
  name: string;
  linkedinUrl: string;
  company: string;
  position: string;
  relationshipContext: string;
  relationshipPriority: number;
  notes: string;
  tags: string[];
  keywords: string[];
  meetingNotes: MeetingNote[];
  reminders: Reminder[];
  podcasts: string[];
  interests: string[];
}

export interface ContactService {
  getAll(): Promise<Contact[]>;
  getById(id: string): Promise<Contact | null>;
  create(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact>;
  update(id: string, contact: Partial<Contact>): Promise<Contact>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Contact[]>;
  filterByTags(tags: string[]): Promise<Contact[]>;
} 