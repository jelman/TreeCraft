# TreeForge

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-TreeForge-blue?style=for-the-badge)](https://jelman.github.io/TreeForge)

A modern web-based application for creating, editing, and visualizing folder structures with drag-and-drop functionality.

## Features

- **Visual Editor**: Drag and drop folders and files to reorganize structure
- **Text Editor**: Edit structures using Markdown (# format) or ASCII tree syntax
- **Bidirectional Conversion**: Changes in visual editor sync with text editor and vice versa
- **Import/Export**: Support for multiple formats
- **Real-time Preview**: See changes instantly in both visual and text representations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready for deployment.

### Easy Deployment Options

#### Option 1: Static Web Hosting (Recommended for sharing)
After running `npm run build`, upload the `dist/` folder to:
- **GitHub Pages**: Free hosting for public repositories
- **Netlify**: Drag and drop the `dist` folder for instant deployment
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Any web server**: Upload `dist/` contents to any web hosting service

#### Option 2: Desktop App
Create a standalone desktop application:

**Quick Start:**
- **Windows**: Double-click `start-desktop.bat`
- **Linux/macOS**: Run `chmod +x start-desktop.sh && ./start-desktop.sh`
- **Any OS**: Run `npm run electron-dev` for development

**Build Installer:**
- **Windows**: Double-click `build-desktop.bat` → Creates `.exe` installer
- **Linux/macOS**: Run `chmod +x build-desktop.sh && ./build-desktop.sh`
  - **Linux**: Creates `.AppImage` (portable) and `.deb` (Ubuntu/Debian)
  - **macOS**: Creates `.dmg` installer
- **Any OS**: Run `npm run build-electron`

The desktop app provides:
- ✅ No browser required
- ✅ Native file system access
- ✅ Keyboard shortcuts (Ctrl+S to save, etc.)
- ✅ Standalone executable
- ✅ Works offline

#### Option 3: Local Network Sharing
To share with others on your network:
```bash
npm run dev -- --host
```
Others can access it at `http://your-ip-address:5173`

#### Option 4: Simple HTTP Server
After building, serve it locally without Node.js:
```bash
# Python (if installed)
cd dist && python -m http.server 8000

# Or using any static file server
npx serve dist
```

### Linux-Specific Instructions

#### Prerequisites for Linux:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora/RHEL/CentOS
sudo dnf install nodejs npm

# Arch Linux
sudo pacman -S nodejs npm
```

#### Desktop App on Linux:
1. **Make scripts executable:**
   ```bash
   chmod +x start.sh start-desktop.sh build-desktop.sh
   ```

2. **Quick start options:**
   ```bash
   # Web version
   ./start.sh

   # Desktop app (development)
   ./start-desktop.sh

   # Build desktop installer
   ./build-desktop.sh
   ```

3. **Install built app:**
   ```bash
   # After building, you'll get an AppImage file
   chmod +x dist-electron/*.AppImage
   ./dist-electron/YourApp.AppImage

   # Optional: Move to applications
   mv dist-electron/*.AppImage ~/.local/bin/treeforge
   ```

4. **Dependencies for building:**
   ```bash
   # Additional packages for Electron building
   sudo apt install libnss3-dev libgconf-2-4 libxss1 libxtst6 libxrandr2 libasound2-dev libgtk-3-dev
   ```

## Usage

### Visual Editor
- Drag and drop items to reorder them
- Click folder/file icons to toggle between types
- Edit names and comments inline
- Add new folders and files using the + buttons
- Delete items using the trash icon

### Text Editor
- Supports Markdown format using # signs for depth (# folder/, ## subfolder/)
- Supports ASCII tree format with visual tree characters
- Add comments using # at the end of lines
- Switch between formats using the toggle button

### Example Formats

**Markdown format:**
```
# my-project/
## src/
### components/
#### Button.tsx
#### Modal.tsx
### utils/
#### helpers.ts
## public/
### assets/
#### images/
## package.json
```

**ASCII format:**
```
my-project/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   └── Modal.tsx
│   └── utils/
│       └── helpers.ts
├── public/
│   └── assets/
│       └── images/
└── package.json
```

## Project Structure

```
src/
├── components/
│   ├── FolderItem.tsx      # Individual folder/file component
│   ├── VisualEditor.tsx    # Drag & drop visual editor
│   └── TextEditor.tsx      # Monaco-based text editor
├── types/
│   └── FolderStructure.ts  # TypeScript type definitions
├── utils/
│   └── parsers.ts          # Text parsing and generation utilities
├── App.tsx                 # Main application component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React DnD** - Drag and drop functionality
- **Monaco Editor** - Code editor (VS Code editor)
- **Lucide React** - Icon library

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
