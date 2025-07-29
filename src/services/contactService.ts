import { Contact, ContactService } from '../types/contact';

const STORAGE_KEY = 'rolo-contacts';

class LocalStorageContactService implements ContactService {
  private getContacts(): Contact[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveContacts(contacts: Contact[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  async getAll(): Promise<Contact[]> {
    return this.getContacts();
  }

  async getById(id: string): Promise<Contact | null> {
    const contacts = this.getContacts();
    return contacts.find(contact => contact.id === id) || null;
  }

  async create(contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    const contacts = this.getContacts();
    const newContact: Contact = {
      ...contactData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    contacts.push(newContact);
    this.saveContacts(contacts);
    return newContact;
  }

  async update(id: string, contactData: Partial<Contact>): Promise<Contact> {
    const contacts = this.getContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    
    if (index === -1) {
      throw new Error('Contact not found');
    }

    contacts[index] = {
      ...contacts[index],
      ...contactData,
      updatedAt: new Date().toISOString(),
    };

    this.saveContacts(contacts);
    return contacts[index];
  }

  async delete(id: string): Promise<void> {
    const contacts = this.getContacts();
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    this.saveContacts(filteredContacts);
  }

  async search(query: string): Promise<Contact[]> {
    const contacts = this.getContacts();
    const lowercaseQuery = query.toLowerCase();
    
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(lowercaseQuery) ||
      contact.company?.toLowerCase().includes(lowercaseQuery) ||
      contact.position?.toLowerCase().includes(lowercaseQuery) ||
      contact.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      contact.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
    );
  }

  async filterByTags(tags: string[]): Promise<Contact[]> {
    const contacts = this.getContacts();
    
    if (tags.length === 0) return contacts;
    
    return contacts.filter(contact =>
      tags.some(tag => contact.tags.includes(tag))
    );
  }
}

export const contactService = new LocalStorageContactService(); 