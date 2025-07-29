import React, { useState, useEffect } from 'react';
import { Contact, MeetingNote, Reminder } from '../types/contact';
import { FormField } from './ui/FormField';
import { AccordionSection } from './ui/AccordionSection';
import { PrioritySlider } from './ui/PrioritySlider';
import { TagInput } from './ui/TagInput';
import { Plus, Trash2 } from 'lucide-react';

interface ContactFormProps {
  contact?: Contact;
  onSave: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    linkedinUrl: contact?.linkedinUrl || '',
    company: contact?.company || '',
    position: contact?.position || '',
    relationshipContext: contact?.relationshipContext || '',
    relationshipPriority: contact?.relationshipPriority || 5,
    notes: contact?.notes || '',
    tags: contact?.tags || [],
    keywords: contact?.keywords || [],
    meetingNotes: contact?.meetingNotes || [],
    reminders: contact?.reminders || [],
    podcasts: contact?.podcasts || [],
    interests: contact?.interests || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-save draft to localStorage
  useEffect(() => {
    const draftKey = `contact-draft-${contact?.id || 'new'}`;
    localStorage.setItem(draftKey, JSON.stringify(formData));
  }, [formData, contact?.id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.relationshipContext.trim()) {
      newErrors.relationshipContext = 'Relationship context is required';
    }

    if (formData.linkedinUrl && !isValidUrl(formData.linkedinUrl)) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const addMeetingNote = () => {
    const newNote: MeetingNote = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      location: '',
      notes: '',
    };
    setFormData(prev => ({
      ...prev,
      meetingNotes: [...prev.meetingNotes, newNote],
    }));
  };

  const updateMeetingNote = (id: string, field: keyof MeetingNote, value: string) => {
    setFormData(prev => ({
      ...prev,
      meetingNotes: prev.meetingNotes.map(note =>
        note.id === id ? { ...note, [field]: value } : note
      ),
    }));
  };

  const removeMeetingNote = (id: string) => {
    setFormData(prev => ({
      ...prev,
      meetingNotes: prev.meetingNotes.filter(note => note.id !== id),
    }));
  };

  const addReminder = () => {
    const newReminder: Reminder = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      text: '',
    };
    setFormData(prev => ({
      ...prev,
      reminders: [...prev.reminders, newReminder],
    }));
  };

  const updateReminder = (id: string, field: keyof Reminder, value: string) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.map(reminder =>
        reminder.id === id ? { ...reminder, [field]: value } : reminder
      ),
    }));
  };

  const removeReminder = (id: string) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.filter(reminder => reminder.id !== id),
    }));
  };

  const addPodcast = () => {
    setFormData(prev => ({
      ...prev,
      podcasts: [...prev.podcasts, ''],
    }));
  };

  const updatePodcast = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      podcasts: prev.podcasts.map((podcast, i) => i === index ? value : podcast),
    }));
  };

  const removePodcast = (index: number) => {
    setFormData(prev => ({
      ...prev,
      podcasts: prev.podcasts.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Required Fields */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
        
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value as string }))}
          placeholder="Enter full name"
          required
          error={errors.name}
        />

        <FormField
          label="LinkedIn URL"
          name="linkedinUrl"
          type="url"
          value={formData.linkedinUrl}
          onChange={(value) => setFormData(prev => ({ ...prev, linkedinUrl: value as string }))}
          placeholder="https://linkedin.com/in/username"
          error={errors.linkedinUrl}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Company"
            name="company"
            value={formData.company}
            onChange={(value) => setFormData(prev => ({ ...prev, company: value as string }))}
            placeholder="Company name"
          />

          <FormField
            label="Position"
            name="position"
            value={formData.position}
            onChange={(value) => setFormData(prev => ({ ...prev, position: value as string }))}
            placeholder="Job title"
          />
        </div>

        <FormField
          label="Relationship Context"
          name="relationshipContext"
          type="textarea"
          value={formData.relationshipContext}
          onChange={(value) => setFormData(prev => ({ ...prev, relationshipContext: value as string }))}
          placeholder="How did you meet? What's the relationship context?"
          required
          error={errors.relationshipContext}
          rows={4}
        />

        <PrioritySlider
          value={formData.relationshipPriority}
          onChange={(value) => setFormData(prev => ({ ...prev, relationshipPriority: value }))}
        />

        <FormField
          label="Notes"
          name="notes"
          type="textarea"
          value={formData.notes}
          onChange={(value) => setFormData(prev => ({ ...prev, notes: value as string }))}
          placeholder="Additional notes about this contact..."
          rows={4}
        />
      </div>

      {/* Optional Sections */}
      <div className="space-y-4">
        <AccordionSection title="Tags" defaultOpen>
          <TagInput
            label="Tags"
            tags={formData.tags}
            onChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
            placeholder="Enter tags separated by commas"
          />
        </AccordionSection>

        <AccordionSection title="Important Keywords">
          <TagInput
            label="Keywords"
            tags={formData.keywords}
            onChange={(keywords) => setFormData(prev => ({ ...prev, keywords }))}
            placeholder="Company names, people, technologies..."
          />
        </AccordionSection>

        <AccordionSection title="Meeting Notes">
          <div className="space-y-4">
            {formData.meetingNotes.map((note) => (
              <div key={note.id} className="p-4 border border-gray-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Meeting Note</h4>
                  <button
                    type="button"
                    onClick={() => removeMeetingNote(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    label="Date"
                    name={`meeting-date-${note.id}`}
                    type="text"
                    value={note.date}
                    onChange={(value) => updateMeetingNote(note.id, 'date', value as string)}
                    placeholder="YYYY-MM-DD"
                  />
                  
                  <FormField
                    label="Location"
                    name={`meeting-location-${note.id}`}
                    value={note.location || ''}
                    onChange={(value) => updateMeetingNote(note.id, 'location', value as string)}
                    placeholder="Meeting location"
                  />
                </div>
                
                <FormField
                  label="Notes"
                  name={`meeting-notes-${note.id}`}
                  type="textarea"
                  value={note.notes}
                  onChange={(value) => updateMeetingNote(note.id, 'notes', value as string)}
                  placeholder="Meeting notes..."
                  rows={3}
                />
              </div>
            ))}
            
            <button
              type="button"
              onClick={addMeetingNote}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
            >
              <Plus className="h-4 w-4" />
              Add Meeting Note
            </button>
          </div>
        </AccordionSection>

        <AccordionSection title="Reminders">
          <div className="space-y-4">
            {formData.reminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                <FormField
                  label="Date"
                  name={`reminder-date-${reminder.id}`}
                  type="text"
                  value={reminder.date}
                  onChange={(value) => updateReminder(reminder.id, 'date', value as string)}
                  placeholder="YYYY-MM-DD"
                  className="flex-1"
                />
                
                <FormField
                  label="Text"
                  name={`reminder-text-${reminder.id}`}
                  value={reminder.text}
                  onChange={(value) => updateReminder(reminder.id, 'text', value as string)}
                  placeholder="Reminder text"
                  className="flex-1"
                />
                
                <button
                  type="button"
                  onClick={() => removeReminder(reminder.id)}
                  className="text-red-500 hover:text-red-700 mt-6"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addReminder}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
            >
              <Plus className="h-4 w-4" />
              Add Reminder
            </button>
          </div>
        </AccordionSection>

        <AccordionSection title="Podcasts & YouTube Channels">
          <div className="space-y-3">
            {formData.podcasts.map((podcast, index) => (
              <div key={index} className="flex items-center gap-3">
                <FormField
                  label=""
                  name={`podcast-${index}`}
                  value={podcast}
                  onChange={(value) => updatePodcast(index, value as string)}
                  placeholder="Podcast or YouTube channel name"
                  className="flex-1"
                />
                
                <button
                  type="button"
                  onClick={() => removePodcast(index)}
                  className="text-red-500 hover:text-red-700 mt-6"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addPodcast}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
            >
              <Plus className="h-4 w-4" />
              Add Podcast/Channel
            </button>
          </div>
        </AccordionSection>

        <AccordionSection title="Interests & Hobbies">
          <TagInput
            label="Interests"
            tags={formData.interests}
            onChange={(interests) => setFormData(prev => ({ ...prev, interests }))}
            placeholder="Enter interests and hobbies..."
          />
        </AccordionSection>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isLoading}
        >
          Cancel
        </button>
        
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : contact ? 'Update Contact' : 'Save Contact'}
        </button>
      </div>
    </form>
  );
}; 