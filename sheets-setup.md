# Google Sheets as Database

## Why Google Sheets?
- ✅ **Always online** - Google never sleeps
- ✅ **Familiar interface** - you can see/edit data directly
- ✅ **Free forever** - no limits
- ✅ **Easy sharing** - just share the sheet
- ✅ **Built-in backup** - Google handles it

## Setup:

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new sheet: "Rolo Contacts Database"
3. Add headers: Name, Company, Position, Priority, Tags, Keywords, Created, Updated, ID

### 2. Get Sheet ID
- URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
- Copy the `YOUR_SHEET_ID` part

### 3. Enable Google Sheets API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project or select existing
3. Enable Google Sheets API
4. Create service account
5. Download JSON key file

### 4. Update Environment Variables
Add to Render:
- `GOOGLE_SHEET_ID`: your-sheet-id
- `GOOGLE_SERVICE_ACCOUNT_KEY`: (the JSON key)

## Benefits:
- **Visual data** - see contacts in spreadsheet
- **Easy editing** - modify data directly
- **No timeouts** - always available
- **Familiar** - everyone knows spreadsheets

## Migration Steps:
1. Create Google Sheet
2. Set up Google Sheets API
3. Update backend to use Sheets API
4. Deploy to Render
5. Share sheet with friends!

Would you like me to implement the Google Sheets integration? 