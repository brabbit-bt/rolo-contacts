import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'contacts.json');

// Middleware
app.use(cors());
app.use(express.json());

// Database functions
async function readContacts() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

async function writeContacts(contacts) {
  await fs.writeFile(DB_FILE, JSON.stringify(contacts, null, 2));
}

// Routes
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await readContacts();
    console.log(`📊 Returning ${contacts.length} contacts`);
    res.json(contacts);
  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contacts = await readContacts();
    const contact = contacts.find(c => c.id === req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    console.log('📝 Creating new contact:', req.body);
    const contacts = await readContacts();
    const newContact = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    contacts.push(newContact);
    await writeContacts(contacts);
    console.log('✅ Contact created successfully:', newContact.id);
    res.status(201).json(newContact);
  } catch (error) {
    console.error('❌ Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const contacts = await readContacts();
    const index = contacts.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    contacts[index] = {
      ...contacts[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    
    await writeContacts(contacts);
    res.json(contacts[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contacts = await readContacts();
    const filteredContacts = contacts.filter(c => c.id !== req.params.id);
    
    if (filteredContacts.length === contacts.length) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    await writeContacts(filteredContacts);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

app.get('/api/contacts/search/:query', async (req, res) => {
  try {
    const contacts = await readContacts();
    const query = req.params.query.toLowerCase();
    
    const filteredContacts = contacts.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.company?.toLowerCase().includes(query) ||
      contact.position?.toLowerCase().includes(query) ||
      contact.tags.some(tag => tag.toLowerCase().includes(query)) ||
      contact.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
    
    res.json(filteredContacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search contacts' });
  }
});

app.get('/api/contacts/filter/tags', async (req, res) => {
  try {
    const { tags } = req.query;
    const contacts = await readContacts();
    
    if (!tags || tags.length === 0) {
      return res.json(contacts);
    }
    
    const tagArray = Array.isArray(tags) ? tags : [tags];
    const filteredContacts = contacts.filter(contact =>
      tagArray.some(tag => contact.tags.includes(tag))
    );
    
    res.json(filteredContacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter contacts' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
  console.log('📁 Serving static files from dist directory');
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Rolo Contacts Server running on port ${PORT}`);
  console.log(`📊 Database file: ${DB_FILE}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
}); 