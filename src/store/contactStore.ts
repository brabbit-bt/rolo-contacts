import { create } from 'zustand';
import { Contact } from '../types/contact';
import { apiContactService } from '../services/apiContactService';

interface ContactStore {
  contacts: Contact[];
  selectedContact: Contact | null;
  isLoading: boolean;
  searchQuery: string;
  selectedTags: string[];
  
  // Actions
  loadContacts: () => Promise<void>;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  selectContact: (contact: Contact | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  searchContacts: () => Promise<void>;
  filterByTags: () => Promise<void>;
}

export const useContactStore = create<ContactStore>((set, get) => ({
  contacts: [],
  selectedContact: null,
  isLoading: false,
  searchQuery: '',
  selectedTags: [],

  loadContacts: async () => {
    set({ isLoading: true });
    try {
      const contacts = await apiContactService.getAll();
      set({ contacts, isLoading: false });
    } catch (error) {
      console.error('Failed to load contacts:', error);
      set({ isLoading: false });
    }
  },

  addContact: async (contactData) => {
    set({ isLoading: true });
    try {
      const newContact = await apiContactService.create(contactData);
      set(state => ({
        contacts: [...state.contacts, newContact],
        isLoading: false
      }));
    } catch (error) {
      console.error('Failed to add contact:', error);
      set({ isLoading: false });
    }
  },

  updateContact: async (id, contactData) => {
    set({ isLoading: true });
    try {
      const updatedContact = await apiContactService.update(id, contactData);
      set(state => ({
        contacts: state.contacts.map(contact => 
          contact.id === id ? updatedContact : contact
        ),
        selectedContact: state.selectedContact?.id === id ? updatedContact : state.selectedContact,
        isLoading: false
      }));
    } catch (error) {
      console.error('Failed to update contact:', error);
      set({ isLoading: false });
    }
  },

  deleteContact: async (id) => {
    set({ isLoading: true });
    try {
      await apiContactService.delete(id);
      set(state => ({
        contacts: state.contacts.filter(contact => contact.id !== id),
        selectedContact: state.selectedContact?.id === id ? null : state.selectedContact,
        isLoading: false
      }));
    } catch (error) {
      console.error('Failed to delete contact:', error);
      set({ isLoading: false });
    }
  },

  selectContact: (contact) => {
    set({ selectedContact: contact });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSelectedTags: (tags) => {
    set({ selectedTags: tags });
  },

  searchContacts: async () => {
    const { searchQuery } = get();
    if (!searchQuery.trim()) {
      get().loadContacts();
      return;
    }

    set({ isLoading: true });
    try {
      const contacts = await apiContactService.search(searchQuery);
      set({ contacts, isLoading: false });
    } catch (error) {
      console.error('Failed to search contacts:', error);
      set({ isLoading: false });
    }
  },

  filterByTags: async () => {
    const { selectedTags } = get();
    if (selectedTags.length === 0) {
      get().loadContacts();
      return;
    }

    set({ isLoading: true });
    try {
      const contacts = await apiContactService.filterByTags(selectedTags);
      set({ contacts, isLoading: false });
    } catch (error) {
      console.error('Failed to filter contacts:', error);
      set({ isLoading: false });
    }
  },
})); 