import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import VisualEditor from './components/VisualEditor';
import TextEditor from './components/TextEditor';
import { FolderStructure } from './types/FolderStructure';
import { parseTextToStructure, generateTextFromStructure, generateAsciiFromStructure } from './utils/parsers';

const INITIAL_STRUCTURE: FolderStructure = {
  id: 'root',
  name: 'root',
  type: 'folder',
  children: [
    {
      id: '1',
      name: 'src',
      type: 'folder',
      isExpanded: true,
      children: [
        { id: '2', name: 'components', type: 'folder', children: [], isExpanded: false },
        { id: '3', name: 'utils', type: 'folder', children: [], isExpanded: false },
        { id: '4', name: 'App.tsx', type: 'file', children: [] }
      ]
    },
    {
      id: '5',
      name: 'public',
      type: 'folder',
      isExpanded: false,
      children: [
        { id: '6', name: 'index.html', type: 'file', children: [] }
      ]
    },
    { id: '7', name: 'package.json', type: 'file', children: [] }
  ]
};

function App() {
  const [structure, setStructure] = useState<FolderStructure>(INITIAL_STRUCTURE);
  const [textContent, setTextContent] = useState('');
  const [outputFormat, setOutputFormat] = useState<'markdown' | 'ascii'>('markdown');

  const handleStructureChange = useCallback((newStructure: FolderStructure) => {
    setStructure(newStructure);
    // Update text editor with new structure
    if (outputFormat === 'markdown') {
      setTextContent(generateTextFromStructure(newStructure));
    } else {
      setTextContent(generateAsciiFromStructure(newStructure));
    }
  }, [outputFormat]);

  const handleTextChange = useCallback((text: string) => {
    setTextContent(text);
    try {
      const parsedStructure = parseTextToStructure(text);
      setStructure(parsedStructure);
    } catch (error) {
      console.warn('Failed to parse text:', error);
    }
  }, []);

  const handleFormatChange = useCallback(() => {
    const newFormat = outputFormat === 'markdown' ? 'ascii' : 'markdown';
    setOutputFormat(newFormat);
    
    if (newFormat === 'markdown') {
      setTextContent(generateTextFromStructure(structure));
    } else {
      setTextContent(generateAsciiFromStructure(structure));
    }
  }, [structure, outputFormat]);

  const handleImportSample = useCallback(() => {
    const sampleText = `# my-project/
## src/
### components/
#### ui/
##### Button.tsx
##### Input.tsx
##### Modal.tsx
#### features/
##### auth/
###### Login.tsx
###### Register.tsx
##### dashboard/
###### Dashboard.tsx
###### Charts.tsx
### utils/
#### helpers.ts
#### constants.ts
### styles/
#### globals.css
#### components.css
### App.tsx
### main.tsx
## public/
### assets/
#### images/
#### icons/
### index.html
## docs/
### README.md
### CONTRIBUTING.md
## tests/
### unit/
### integration/
## package.json
## tsconfig.json`;
    
    setTextContent(sampleText);
    try {
      const parsedStructure = parseTextToStructure(sampleText);
      setStructure(parsedStructure);
    } catch (error) {
      console.warn('Failed to parse sample text:', error);
    }
  }, []);

  const handleSaveFile = useCallback(() => {
    const dataStr = JSON.stringify(structure, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'folder-structure.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [structure]);

  const handleSaveTextFile = useCallback(() => {
    const content = outputFormat === 'markdown' ? 
      generateTextFromStructure(structure) : 
      generateAsciiFromStructure(structure);
    const dataBlob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `folder-structure.${outputFormat === 'markdown' ? 'md' : 'txt'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [structure, outputFormat]);

  const handleLoadFile = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.txt,.md';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = event.target?.result as string;
            if (file.name.endsWith('.json')) {
              // Load JSON structure file
              const loadedStructure = JSON.parse(content);
              setStructure(loadedStructure);
              if (outputFormat === 'markdown') {
                setTextContent(generateTextFromStructure(loadedStructure));
              } else {
                setTextContent(generateAsciiFromStructure(loadedStructure));
              }
            } else {
              // Load text file (markdown or ASCII)
              setTextContent(content);
              const parsedStructure = parseTextToStructure(content);
              setStructure(parsedStructure);
            }
          } catch (error) {
            alert('Failed to load file: ' + error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [outputFormat]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>TreeCraft</h1>
        <p>Create, edit, and visualize folder structures with drag & drop</p>
        
        <div className="controls">
          <button className="btn" onClick={handleFormatChange}>
            Switch to {outputFormat === 'markdown' ? 'ASCII' : 'Markdown'} format
          </button>
          <button className="btn" onClick={handleImportSample}>
            Load Sample Structure
          </button>
          <button className="btn" onClick={handleLoadFile}>
            Load File
          </button>
          <button className="btn" onClick={handleSaveFile}>
            Save JSON
          </button>
          <button className="btn" onClick={handleSaveTextFile}>
            Save {outputFormat === 'markdown' ? 'Markdown' : 'ASCII'}
          </button>
        </div>

        <div className="editor-container">
          <div className="visual-editor">
            <h3>Visual Editor</h3>
            <VisualEditor 
              structure={structure} 
              onStructureChange={handleStructureChange} 
            />
          </div>
          
          <div className="text-editor">
            <h3>Text Editor ({outputFormat})</h3>
            <TextEditor 
              content={textContent}
              onChange={handleTextChange}
              format={outputFormat}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
