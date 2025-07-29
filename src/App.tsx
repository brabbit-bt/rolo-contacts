import React, { useState } from 'react';
import { Contact } from './types/contact';
import { ContactsDashboard } from './components/ContactsDashboard';
import { ContactForm } from './components/ContactForm';
import { ContactDetail } from './components/ContactDetail';
import { Toast } from './components/ui/Toast';
import { useContactStore } from './store/contactStore';

type View = 'dashboard' | 'add' | 'edit' | 'detail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const { addContact, updateContact, deleteContact, isLoading } = useContactStore();

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleAddContact = () => {
    setSelectedContact(null);
    setCurrentView('add');
  };

  const handleEditContact = () => {
    setCurrentView('edit');
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setCurrentView('detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedContact(null);
  };

  const handleSaveContact = async (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (currentView === 'add') {
        await addContact(contactData);
        showToast('Contact saved successfully!');
      } else {
        if (selectedContact) {
          await updateContact(selectedContact.id, contactData);
          showToast('Contact updated successfully!');
        }
      }
      handleBackToDashboard();
    } catch (error) {
      showToast('Failed to save contact. Please try again.', 'error');
    }
  };

  const handleDeleteContact = async () => {
    if (!selectedContact) return;

    try {
      await deleteContact(selectedContact.id);
      showToast('Contact deleted successfully!');
      handleBackToDashboard();
    } catch (error) {
      showToast('Failed to delete contact. Please try again.', 'error');
    }
  };

  const handleCancelForm = () => {
    handleBackToDashboard();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        {currentView === 'dashboard' && (
          <ContactsDashboard
            onAddContact={handleAddContact}
            onViewContact={handleViewContact}
          />
        )}

        {currentView === 'add' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Add New Contact</h1>
              <p className="text-gray-600 mt-1">Fill in the details below to add a new contact</p>
            </div>
            <ContactForm
              onSave={handleSaveContact}
              onCancel={handleCancelForm}
              isLoading={isLoading}
            />
          </div>
        )}

        {currentView === 'edit' && selectedContact && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Edit Contact</h1>
              <p className="text-gray-600 mt-1">Update the contact information below</p>
            </div>
            <ContactForm
              contact={selectedContact}
              onSave={handleSaveContact}
              onCancel={handleCancelForm}
              isLoading={isLoading}
            />
          </div>
        )}

        {currentView === 'detail' && selectedContact && (
          <ContactDetail
            contact={selectedContact}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
            onBack={handleBackToDashboard}
          />
        )}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default App; 