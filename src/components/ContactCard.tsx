import React from 'react';
import { Contact } from '../types/contact';

interface ContactCardProps {
  contact: Contact;
  onClick: () => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick }) => {
  const getPriorityColor = (priority: number) => {
    if (priority <= 3) return 'bg-green-500';
    if (priority <= 6) return 'bg-yellow-500';
    if (priority <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      onClick={onClick}
      className="card cursor-pointer hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-800 font-semibold text-sm">
              {getInitials(contact.name)}
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {contact.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(contact.relationshipPriority)}`}>
              {contact.relationshipPriority}/10
            </span>
          </div>

          {(contact.company || contact.position) && (
            <p className="text-sm text-gray-600 mb-2">
              {contact.position && <span>{contact.position}</span>}
              {contact.position && contact.company && <span> at </span>}
              {contact.company && <span className="font-medium">{contact.company}</span>}
            </p>
          )}

          {/* Tags */}
          {contact.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {contact.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {tag}
                </span>
              ))}
              {contact.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{contact.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <p className="text-xs text-gray-500">
            Updated {formatDate(contact.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}; 