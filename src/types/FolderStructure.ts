export interface FolderStructure {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children: FolderStructure[];
  comment?: string;
  isExpanded?: boolean; // For collapse/expand functionality
}

export interface DragItem {
  id: string;
  type: string;
  index: number;
  parentId?: string;
}

export type ParseFormat = 'markdown' | 'ascii';
