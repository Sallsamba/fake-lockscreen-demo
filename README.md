# Fake Lock Screen Demo - Cybersecurity Education Tool

⚠️ **EDUCATIONAL PURPOSE ONLY** ⚠️

This Electron application demonstrates how realistic a fake Windows lock screen can appear, designed to educate users about social engineering attacks and the importance of verifying system authenticity.

## Purpose

This tool helps cybersecurity educators demonstrate:
- How convincing fake lock screens can be
- The importance of using Ctrl+Alt+Del (Secure Attention Sequence) 
- Why users should be cautious about entering credentials

## Features

- Full-screen, borderless window that mimics Windows 10/11 lock screen
- Real-time clock and date display
- Windows-style user interface with avatar and password field
- Educational warning after failed login attempts
- Safe exit mechanism (Ctrl+Q)
- No actual password logging or data transmission

## Installation

### Prerequisites
- Node.js 16.0.0 or higher
- npm (comes with Node.js)

### Setup

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone <repository-url>
   cd fake-lockscreen-demo

   # Or extract if downloaded as ZIP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

## Usage

### Running the Demo

1. **Start the application:**
   ```bash
   npm start
   ```

2. **The fake lock screen will appear in fullscreen mode**
   - Shows current time and date
   - Displays "Student Account" with avatar
   - Has a password input field

3. **Interact with the demo:**
   - Try entering any password
   - After 2-3 attempts, educational warning appears

4. **Exit safely:**
   - Press `Ctrl+Q` to close the application
   - This works at any time during the demo

### Educational Points

**Before the demo:**
- Explain that real Windows lock screens can be verified using Ctrl+Alt+Del
- Show how this secure attention sequence cannot be intercepted by applications

**During the demo:**
- Let students try to "unlock" the fake screen
- Point out how realistic it appears
- Demonstrate the safe exit method

**After the warning appears:**
- Discuss how malicious actors could create similar fake interfaces
- Emphasize the importance of system verification
- Explain other social engineering techniques

## Development

### Running in Development Mode
```bash
npm run dev
```

This enables:
- Developer instructions overlay
- Developer tools access (Ctrl+Shift+I)
- Console logging

### File Structure
```
fake-lockscreen-demo/
├── package.json          # Project dependencies and scripts
├── main.js              # Electron main process
├── index.html           # Lock screen interface
├── style.css            # Windows-style styling
├── assets/              # Images and resources
│   ├── default-avatar.png
│   └── create-background.html
└── README.md           # This file
```

## Security Considerations

### Safe Design Principles

1. **No Data Collection:**
   - Passwords are immediately discarded
   - No network connections
   - No file system writes for credentials

2. **Educational Safeguards:**
   - Clear exit mechanism (Ctrl+Q)
   - Warning message reveals the deception
   - Console warnings in developer tools
   - Limited to 2-3 attempts before revealing truth

3. **Responsible Use:**
   - Only for authorized educational environments
   - Clear consent from participants
   - Immediate educational debrief

### Important Notes

- **Never use this for malicious purposes**
- **Always get permission before demonstrating**
- **Ensure participants understand it's educational**
- **Follow your organization's security training policies**

## Customization

### Changing the User Account
Edit `index.html` line with `"Student Account"`:
```html
<div id="username">Your Custom Name</div>
```

### Modifying Attempt Count
In `index.html`, change `maxAttempts`:
```javascript
const maxAttempts = 2; // Change to desired number
```

### Custom Background
Replace the CSS gradient in `style.css` or add your own background image to the `assets/` folder.

## Troubleshooting

### Application Won't Start
```bash
# Check Node.js version
node --version  # Should be 16.0.0+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Can't Exit the Application
- Press `Ctrl+Q` (should always work)
- If stuck, use Task Manager (Ctrl+Shift+Esc) to force quit
- On macOS: Force Quit using Cmd+Option+Esc

### Display Issues
- Ensure your system supports fullscreen applications
- Try running in development mode first: `npm run dev`

## Legal and Ethical Guidelines

### ✅ Appropriate Use
- Cybersecurity training courses
- Educational demonstrations with consent
- Security awareness programs
- Penetration testing training

### ❌ Inappropriate Use
- Deceiving users without consent
- Actual credential harvesting
- Malicious social engineering
- Unauthorized access attempts

## Educational Resources

### Related Topics to Cover
- Social engineering awareness
- Phishing detection
- System authentication methods
- Secure attention sequences
- Physical security considerations

### Discussion Questions
1. How can users verify they're on a real lock screen?
2. What other fake interfaces might attackers create?
3. Why doesn't Ctrl+Alt+Del work on fake screens?
4. How should organizations train users about these threats?

## Contributing

This is an educational tool. If you find bugs or have suggestions for improving the educational value:

1. Focus on educational effectiveness
2. Maintain security safeguards
3. Ensure responsible use guidelines
4. Test thoroughly before using in training

## License

MIT License - See LICENSE file for details.

**Remember: This tool is for education only. Use responsibly and ethically.**