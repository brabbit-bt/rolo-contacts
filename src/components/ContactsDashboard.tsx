import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, X } from 'lucide-react';
import { Contact } from '../types/contact';
import { ContactCard } from './ContactCard';
import { useContactStore } from '../store/contactStore';

interface ContactsDashboardProps {
  onAddContact: () => void;
  onViewContact: (contact: Contact) => void;
}

export const ContactsDashboard: React.FC<ContactsDashboardProps> = ({
  onAddContact,
  onViewContact,
}) => {
  const {
    contacts,
    isLoading,
    searchQuery,
    selectedTags,
    loadContacts,
    setSearchQuery,
    setSelectedTags,
    searchContacts,
    filterByTags,
  } = useContactStore();

  const [showFilters, setShowFilters] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  useEffect(() => {
    // Extract all unique tags from contacts
    const tags = new Set<string>();
    contacts.forEach(contact => {
      contact.tags.forEach(tag => tags.add(tag));
    });
    setAvailableTags(Array.from(tags).sort());
  }, [contacts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchContacts();
  };

  const handleTagFilter = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    if (newTags.length > 0) {
      filterByTags();
    } else {
      loadContacts();
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    loadContacts();
  };

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rolo Contacts</h1>
          <p className="text-gray-600 mt-1">
            {isLoading ? 'Loading...' : `${contacts.length} contact${contacts.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        
        <button
          onClick={onAddContact}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Contact
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts by name, company, tags..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </form>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {selectedTags.length + (searchQuery.trim() ? 1 : 0)} active
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {availableTags.length === 0 && (
                <p className="text-gray-500 text-sm">No tags available</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Contacts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-500 mb-6">
            {hasActiveFilters
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first contact'}
          </p>
          {!hasActiveFilters && (
            <button
              onClick={onAddContact}
              className="btn-primary"
            >
              Add Your First Contact
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onClick={() => onViewContact(contact)}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 