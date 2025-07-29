#!/usr/bin/env node

// Using built-in fetch (Node.js 18+)
import fs from 'fs/promises';
import path from 'path';

const API_URL = 'https://rolo-contacts.onrender.com/api/contacts';

async function exportContacts() {
  try {
    console.log('📊 Exporting contacts from:', API_URL);
    
    const response = await fetch(API_URL);
    const contacts = await response.json();
    
    if (!Array.isArray(contacts)) {
      throw new Error('Invalid response format');
    }
    
    console.log(`✅ Found ${contacts.length} contacts`);
    
    // Create exports directory
    const exportsDir = './exports';
    await fs.mkdir(exportsDir, { recursive: true });
    
    // Export full JSON
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonFile = path.join(exportsDir, `contacts_${timestamp}.json`);
    await fs.writeFile(jsonFile, JSON.stringify(contacts, null, 2));
    console.log(`💾 Full JSON saved to: ${jsonFile}`);
    
    // Export CSV for Excel analysis
    const csvFile = path.join(exportsDir, `contacts_${timestamp}.csv`);
    const csvContent = generateCSV(contacts);
    await fs.writeFile(csvFile, csvContent);
    console.log(`📊 CSV saved to: ${csvFile}`);
    
    // Generate analysis report
    const reportFile = path.join(exportsDir, `analysis_${timestamp}.txt`);
    const report = generateAnalysis(contacts);
    await fs.writeFile(reportFile, report);
    console.log(`📈 Analysis saved to: ${reportFile}`);
    
    console.log('\n🎉 Export complete! Files saved in ./exports/');
    
  } catch (error) {
    console.error('❌ Export failed:', error.message);
  }
}

function generateCSV(contacts) {
  const headers = [
    'Name', 'Company', 'Position', 'Priority', 'Tags', 'Keywords', 
    'Created', 'Updated', 'ID'
  ];
  
  const rows = contacts.map(contact => [
    contact.name,
    contact.company || '',
    contact.position || '',
    contact.relationshipPriority,
    (contact.tags || []).join('; '),
    (contact.keywords || []).join('; '),
    contact.createdAt,
    contact.updatedAt,
    contact.id
  ]);
  
  return [headers, ...rows].map(row => 
    row.map(field => `"${field}"`).join(',')
  ).join('\n');
}

function generateAnalysis(contacts) {
  const report = [];
  report.push('📊 ROLO CONTACTS ANALYSIS');
  report.push('='.repeat(50));
  report.push(`Total Contacts: ${contacts.length}`);
  report.push(`Export Date: ${new Date().toISOString()}`);
  report.push('');
  
  // Priority distribution
  const priorities = contacts.reduce((acc, contact) => {
    const priority = contact.relationshipPriority || 0;
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});
  
  report.push('📈 PRIORITY DISTRIBUTION:');
  Object.entries(priorities).forEach(([priority, count]) => {
    report.push(`Priority ${priority}: ${count} contacts`);
  });
  report.push('');
  
  // Company analysis
  const companies = contacts.reduce((acc, contact) => {
    const company = contact.company || 'Unknown';
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {});
  
  report.push('🏢 TOP COMPANIES:');
  Object.entries(companies)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([company, count]) => {
      report.push(`${company}: ${count} contacts`);
    });
  report.push('');
  
  // Tag analysis
  const allTags = contacts.flatMap(contact => contact.tags || []);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  
  report.push('🏷️ TOP TAGS:');
  Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15)
    .forEach(([tag, count]) => {
      report.push(`${tag}: ${count} times`);
    });
  
  return report.join('\n');
}

exportContacts(); 