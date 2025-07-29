#!/bin/bash

echo "🚀 Push Rolo Contacts to GitHub"
echo "================================"

# Check if remote is already set
if git remote get-url origin &> /dev/null; then
    echo "✅ Remote origin already set to: $(git remote get-url origin)"
    echo ""
    echo "Pushing to GitHub..."
    git push -u origin main
else
    echo "❌ No remote origin set yet."
    echo ""
    echo "📝 Please follow these steps:"
    echo ""
    echo "1. Go to https://github.com"
    echo "2. Click '+' → 'New repository'"
    echo "3. Name it: rolo-contacts"
    echo "4. Make it Public"
    echo "5. Don't initialize with README"
    echo "6. Click 'Create repository'"
    echo ""
    echo "7. Copy the repository URL (looks like: https://github.com/yourusername/rolo-contacts.git)"
    echo ""
    echo "8. Then run:"
    echo "   git remote add origin https://github.com/yourusername/rolo-contacts.git"
    echo "   git push -u origin main"
    echo ""
    echo "Or run this script again after setting the remote."
fi 