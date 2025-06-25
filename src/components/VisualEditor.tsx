import React, { useCallback } from 'react';
import { FolderStructure } from '../types/FolderStructure';
import FolderItem from './FolderItem';

interface VisualEditorProps {
  structure: FolderStructure;
  onStructureChange: (structure: FolderStructure) => void;
}

let idCounter = 2000;

function generateId(): string {
  return `generated-${idCounter++}`;
}

const VisualEditor: React.FC<VisualEditorProps> = ({ structure, onStructureChange }) => {
  const findItemById = useCallback((items: FolderStructure[], id: string): FolderStructure | null => {
    for (const item of items) {
      if (item.id === id) return item;
      const found = findItemById(item.children, id);
      if (found) return found;
    }
    return null;
  }, []);

  const updateStructure = useCallback((updater: (structure: FolderStructure) => FolderStructure) => {
    onStructureChange(updater({ ...structure }));
  }, [structure, onStructureChange]);

  const handleMove = useCallback((
    dragIndex: number,
    hoverIndex: number,
    dragParentId?: string,
    hoverParentId?: string
  ) => {
    updateStructure((currentStructure) => {
      const newStructure = { ...currentStructure };
      
      // Find source and target arrays
      const sourceArray = dragParentId 
        ? findItemById([newStructure], dragParentId)?.children || []
        : newStructure.children;
      
      const targetArray = hoverParentId
        ? findItemById([newStructure], hoverParentId)?.children || []
        : newStructure.children;

      if (sourceArray && targetArray) {
        const [removed] = sourceArray.splice(dragIndex, 1);
        targetArray.splice(hoverIndex, 0, removed);
      }

      return newStructure;
    });
  }, [updateStructure, findItemById]);

  const handleUpdate = useCallback((id: string, updates: Partial<FolderStructure>) => {
    updateStructure((currentStructure) => {
      const updateItem = (items: FolderStructure[]): FolderStructure[] => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, ...updates };
          }
          return { ...item, children: updateItem(item.children) };
        });
      };

      return {
        ...currentStructure,
        children: currentStructure.id === id 
          ? currentStructure.children
          : updateItem(currentStructure.children)
      };
    });
  }, [updateStructure]);

  const handleDelete = useCallback((id: string) => {
    updateStructure((currentStructure) => {
      const deleteItem = (items: FolderStructure[]): FolderStructure[] => {
        return items.filter(item => {
          if (item.id === id) return false;
          item.children = deleteItem(item.children);
          return true;
        });
      };

      return {
        ...currentStructure,
        children: deleteItem(currentStructure.children)
      };
    });
  }, [updateStructure]);

  const handleAddChild = useCallback((parentId: string, type: 'folder' | 'file') => {
    updateStructure((currentStructure) => {
      const addToItem = (items: FolderStructure[]): FolderStructure[] => {
        return items.map(item => {
          if (item.id === parentId) {
            const newChild: FolderStructure = {
              id: generateId(),
              name: type === 'folder' ? 'new-folder' : 'new-file.txt',
              type,
              children: []
            };
            return { ...item, children: [...item.children, newChild] };
          }
          return { ...item, children: addToItem(item.children) };
        });
      };

      if (currentStructure.id === parentId) {
        const newChild: FolderStructure = {
          id: generateId(),
          name: type === 'folder' ? 'new-folder' : 'new-file.txt',
          type,
          children: []
        };
        return { ...currentStructure, children: [...currentStructure.children, newChild] };
      }

      return {
        ...currentStructure,
        children: addToItem(currentStructure.children)
      };
    });
  }, [updateStructure]);

  const renderItems = useCallback((items: FolderStructure[], parentId?: string, level = 0): JSX.Element[] => {
    return items.map((item, index) => (
      <div key={item.id}>
        <FolderItem
          item={item}
          index={index}
          parentId={parentId}
          onMove={handleMove}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onAddChild={handleAddChild}
          level={level}
        />
        {item.children.length > 0 && (item.isExpanded !== false) && (
          <div>
            {renderItems(item.children, item.id, level + 1)}
          </div>
        )}
      </div>
    ));
  }, [handleMove, handleUpdate, handleDelete, handleAddChild]);

  const handleAddRootItem = (type: 'folder' | 'file') => {
    handleAddChild(structure.id, type);
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button className="btn" onClick={() => handleAddRootItem('folder')} style={{ marginRight: '0.5rem' }}>
          Add Folder
        </button>
        <button className="btn" onClick={() => handleAddRootItem('file')}>
          Add File
        </button>
      </div>
      
      <div>
        {structure.name !== 'root' && (
          <FolderItem
            item={structure}
            index={0}
            onMove={handleMove}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onAddChild={handleAddChild}
            level={0}
          />
        )}
        {renderItems(structure.children, structure.id, structure.name === 'root' ? 0 : 1)}
      </div>
    </div>
  );
};

export default VisualEditor;
