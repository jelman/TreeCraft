import { FolderStructure } from '../types/FolderStructure';

let idCounter = 1000;

function generateId(): string {
  return `generated-${idCounter++}`;
}

export function parseTextToStructure(text: string): FolderStructure {
  const lines = text.split('\n').filter(line => line.trim());
  const root: FolderStructure = {
    id: 'root',
    name: 'root',
    type: 'folder',
    children: []
  };

  const stack: Array<{ node: FolderStructure; level: number }> = [{ node: root, level: -1 }];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Determine level based on # count or indentation
    let level = 0;
    let name = trimmed;
    let comment = '';

    if (trimmed.startsWith('#')) {
      // Markdown format with # signs
      const match = trimmed.match(/^(#+)\s*(.+?)(\s*#.*)?$/);
      if (match) {
        level = match[1].length - 1;
        name = match[2].trim();
        if (match[3]) {
          comment = match[3].trim().substring(1).trim();
        }
      }
    } else {
      // ASCII format - count leading spaces/tabs and tree characters
      const leadingWhitespace = line.match(/^[\s│├└─ ]*/)![0];
      level = Math.floor(leadingWhitespace.length / 4); // Approximate level
      name = trimmed.replace(/^[│├└─\s]*/, '');
      
      // Extract comment
      const commentMatch = name.match(/^(.+?)\s*#\s*(.+)$/);
      if (commentMatch) {
        name = commentMatch[1].trim();
        comment = commentMatch[2].trim();
      }
    }

    // Remove trailing / from folder names
    if (name.endsWith('/')) {
      name = name.slice(0, -1);
    }

    // Determine if it's a file or folder
    const isFile = name.includes('.') && !name.endsWith('/');
    
    const newNode: FolderStructure = {
      id: generateId(),
      name,
      type: isFile ? 'file' : 'folder',
      children: [],
      comment: comment || undefined,
      isExpanded: true // Default to expanded for new nodes
    };

    // Find the correct parent
    while (stack.length > 1 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].node;
    parent.children.push(newNode);
    stack.push({ node: newNode, level });
  }

  return root.children.length === 1 ? root.children[0] : root;
}

export function generateTextFromStructure(structure: FolderStructure, level = 0): string {
  if (level === 0 && structure.name === 'root') {
    return structure.children.map(child => generateTextFromStructure(child, 0)).join('\n');
  }

  const prefix = '#'.repeat(level + 1);
  const suffix = structure.type === 'folder' ? '/' : '';
  const comment = structure.comment ? ` # ${structure.comment}` : '';
  
  let result = `${prefix} ${structure.name}${suffix}${comment}`;
  
  if (structure.children.length > 0) {
    const childrenText = structure.children
      .map(child => generateTextFromStructure(child, level + 1))
      .join('\n');
    result += '\n' + childrenText;
  }
  
  return result;
}

export function generateAsciiFromStructure(structure: FolderStructure, isLast = true, prefix = ''): string {
  if (structure.name === 'root') {
    return structure.children
      .map((child, index) => generateAsciiFromStructure(
        child, 
        index === structure.children.length - 1, 
        ''
      ))
      .join('\n');
  }

  const suffix = structure.type === 'folder' ? '/' : '';
  const comment = structure.comment ? ` # ${structure.comment}` : '';
  const connector = isLast ? '└── ' : '├── ';
  
  let result = `${prefix}${connector}${structure.name}${suffix}${comment}`;
  
  if (structure.children.length > 0) {
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    const childrenText = structure.children
      .map((child, index) => generateAsciiFromStructure(
        child, 
        index === structure.children.length - 1, 
        newPrefix
      ))
      .join('\n');
    result += '\n' + childrenText;
  }
  
  return result;
}
