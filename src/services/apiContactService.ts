import { Contact, ContactService } from '../types/contact';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiContactService implements ContactService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async getAll(): Promise<Contact[]> {
    return this.request<Contact[]>('/contacts');
  }

  async getById(id: string): Promise<Contact | null> {
    try {
      return await this.request<Contact>(`/contacts/${id}`);
    } catch (error) {
      return null;
    }
  }

  async create(contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    return this.request<Contact>('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async update(id: string, contactData: Partial<Contact>): Promise<Contact> {
    return this.request<Contact>(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
  }

  async delete(id: string): Promise<void> {
    await this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  async search(query: string): Promise<Contact[]> {
    if (!query.trim()) {
      return this.getAll();
    }
    return this.request<Contact[]>(`/contacts/search/${encodeURIComponent(query)}`);
  }

  async filterByTags(tags: string[]): Promise<Contact[]> {
    if (tags.length === 0) {
      return this.getAll();
    }
    const queryParams = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
    return this.request<Contact[]>(`/contacts/filter/tags?${queryParams}`);
  }
}

export const apiContactService = new ApiContactService(); 