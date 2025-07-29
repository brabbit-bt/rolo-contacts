import React, { useState } from 'react';
import { Contact } from '../types/contact';
import { Edit, Trash2, ExternalLink, Calendar, MapPin, Clock } from 'lucide-react';

interface ContactDetailProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

type TabType = 'overview' | 'notes' | 'reminders';

export const ContactDetail: React.FC<ContactDetailProps> = ({
  contact,
  onEdit,
  onDelete,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority: number) => {
    if (priority <= 3) return 'bg-green-500';
    if (priority <= 6) return 'bg-yellow-500';
    if (priority <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getPriorityLabel = (priority: number) => {
    if (priority <= 2) return 'Low';
    if (priority <= 4) return 'Medium-Low';
    if (priority <= 6) return 'Medium';
    if (priority <= 8) return 'High';
    return 'Critical';
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'notes', label: 'Notes' },
    { id: 'reminders', label: 'Reminders' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Back to Contacts
        </button>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          
          <button
            onClick={onDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Contact Header */}
      <div className="card mb-6">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-800 font-bold text-xl">
                {getInitials(contact.name)}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-3xl font-bold text-gray-900">{contact.name}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getPriorityColor(contact.relationshipPriority)}`}>
                {getPriorityLabel(contact.relationshipPriority)} ({contact.relationshipPriority}/10)
              </span>
            </div>

            {(contact.company || contact.position) && (
              <p className="text-lg text-gray-600 mb-3">
                {contact.position && <span>{contact.position}</span>}
                {contact.position && contact.company && <span> at </span>}
                {contact.company && <span className="font-semibold">{contact.company}</span>}
              </p>
            )}

            {contact.linkedinUrl && (
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800"
              >
                <ExternalLink className="h-4 w-4" />
                View LinkedIn Profile
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Relationship Context */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Relationship Context</h3>
              <p className="text-gray-700 leading-relaxed">{contact.relationshipContext}</p>
            </div>

            {/* Tags and Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contact.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {contact.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {contact.keywords.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {contact.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Meeting Notes */}
            {contact.meetingNotes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Meeting Notes</h3>
                <div className="space-y-4">
                  {contact.meetingNotes.map((note) => (
                    <div key={note.id} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {formatDate(note.date)}
                        </div>
                        {note.location && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            {note.location}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700">{note.notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Podcasts and Interests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contact.podcasts.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Podcasts & Channels</h3>
                  <ul className="space-y-1">
                    {contact.podcasts.map((podcast, index) => (
                      <li key={index} className="text-gray-700">• {podcast}</li>
                    ))}
                  </ul>
                </div>
              )}

              {contact.interests.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests & Hobbies</h3>
                  <div className="flex flex-wrap gap-2">
                    {contact.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            {contact.notes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{contact.notes}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Notes tab - Coming soon!</p>
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Reminders tab - Coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}; 