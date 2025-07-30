import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Contact, ContactService } from '../types/contact';

class FirebaseContactService implements ContactService {
  private collectionName = 'contacts';

  async getAll(): Promise<Contact[]> {
    try {
      console.log('📊 Fetching contacts from Firestore...');
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      const contacts: Contact[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        contacts.push({
          id: doc.id,
          name: data.name,
          linkedinUrl: data.linkedinUrl || '',
          company: data.company || '',
          position: data.position || '',
          relationshipContext: data.relationshipContext || '',
          relationshipPriority: data.relationshipPriority || 0,
          notes: data.notes || '',
          tags: data.tags || [],
          keywords: data.keywords || [],
          meetingNotes: data.meetingNotes || [],
          reminders: data.reminders || [],
          podcasts: data.podcasts || [],
          interests: data.interests || [],
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        });
      });
      
      console.log(`✅ Fetched ${contacts.length} contacts from Firestore`);
      return contacts;
    } catch (error) {
      console.error('❌ Error fetching contacts from Firestore:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Contact | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name,
          linkedinUrl: data.linkedinUrl || '',
          company: data.company || '',
          position: data.position || '',
          relationshipContext: data.relationshipContext || '',
          relationshipPriority: data.relationshipPriority || 0,
          notes: data.notes || '',
          tags: data.tags || [],
          keywords: data.keywords || [],
          meetingNotes: data.meetingNotes || [],
          reminders: data.reminders || [],
          podcasts: data.podcasts || [],
          interests: data.interests || [],
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        };
      }
      return null;
    } catch (error) {
      console.error('❌ Error fetching contact from Firestore:', error);
      return null;
    }
  }

  async create(contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    try {
      console.log('📝 Creating contact in Firestore:', contactData.name);
      
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...contactData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      console.log('✅ Contact created in Firestore with ID:', docRef.id);
      
      // Return the created contact with the new ID
      return {
        ...contactData,
        id: docRef.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error creating contact in Firestore:', error);
      throw error;
    }
  }

  async update(id: string, contactData: Partial<Contact>): Promise<Contact> {
    try {
      console.log('📝 Updating contact in Firestore:', id);
      
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...contactData,
        updatedAt: serverTimestamp(),
      });
      
      console.log('✅ Contact updated in Firestore:', id);
      
      // Return the updated contact
      const updatedDoc = await getDoc(docRef);
      const data = updatedDoc.data();
      if (!data) {
        throw new Error('Contact not found after update');
      }
      return {
        id: updatedDoc.id,
        name: data.name,
        linkedinUrl: data.linkedinUrl || '',
        company: data.company || '',
        position: data.position || '',
        relationshipContext: data.relationshipContext || '',
        relationshipPriority: data.relationshipPriority || 0,
        notes: data.notes || '',
        tags: data.tags || [],
        keywords: data.keywords || [],
        meetingNotes: data.meetingNotes || [],
        reminders: data.reminders || [],
        podcasts: data.podcasts || [],
        interests: data.interests || [],
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error updating contact in Firestore:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      console.log('🗑️ Deleting contact from Firestore:', id);
      
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
      
      console.log('✅ Contact deleted from Firestore:', id);
    } catch (error) {
      console.error('❌ Error deleting contact from Firestore:', error);
      throw error;
    }
  }

  async search(query: string): Promise<Contact[]> {
    try {
      if (!query.trim()) {
        return this.getAll();
      }
      
      console.log('🔍 Searching contacts in Firestore:', query);
      const allContacts = await this.getAll();
      
      const filteredContacts = allContacts.filter(contact => 
        contact.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.company?.toLowerCase().includes(query.toLowerCase()) ||
        contact.position?.toLowerCase().includes(query.toLowerCase()) ||
        contact.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        contact.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
      );
      
      console.log(`✅ Found ${filteredContacts.length} contacts matching "${query}"`);
      return filteredContacts;
    } catch (error) {
      console.error('❌ Error searching contacts in Firestore:', error);
      throw error;
    }
  }

  async filterByTags(tags: string[]): Promise<Contact[]> {
    try {
      if (tags.length === 0) {
        return this.getAll();
      }
      
      console.log('🏷️ Filtering contacts by tags in Firestore:', tags);
      const allContacts = await this.getAll();
      
      const filteredContacts = allContacts.filter(contact =>
        tags.some(tag => contact.tags.includes(tag))
      );
      
      console.log(`✅ Found ${filteredContacts.length} contacts with tags:`, tags);
      return filteredContacts;
    } catch (error) {
      console.error('❌ Error filtering contacts by tags in Firestore:', error);
      throw error;
    }
  }
}

export const firebaseContactService = new FirebaseContactService(); 