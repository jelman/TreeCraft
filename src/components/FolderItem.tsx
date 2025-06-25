import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FolderStructure, DragItem } from '../types/FolderStructure';
import { Folder, File, Plus, Trash2, ChevronDown, ChevronRight, FolderOpen } from 'lucide-react';

interface FolderItemProps {
  item: FolderStructure;
  index: number;
  parentId?: string;
  onMove: (dragIndex: number, hoverIndex: number, dragParentId?: string, hoverParentId?: string) => void;
  onUpdate: (id: string, updates: Partial<FolderStructure>) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string, type: 'folder' | 'file') => void;
  level: number;
}

const FolderItem: React.FC<FolderItemProps> = ({
  item,
  index,
  parentId,
  onMove,
  onUpdate,
  onDelete,
  onAddChild,
  level
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'folder-item',
    item: (): DragItem => ({
      id: item.id,
      type: 'folder-item',
      index,
      parentId
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'folder-item',
    hover(draggedItem: DragItem) {
      if (!ref.current) {
        return;
      }

      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      const dragParentId = draggedItem.parentId;
      const hoverParentId = parentId;

      if (dragIndex === hoverIndex && dragParentId === hoverParentId) {
        return;
      }

      onMove(dragIndex, hoverIndex, dragParentId, hoverParentId);
      draggedItem.index = hoverIndex;
      draggedItem.parentId = hoverParentId;
    },
  });

  drag(drop(ref));

  const handleNameChange = (newName: string) => {
    onUpdate(item.id, { name: newName });
  };

  const handleCommentChange = (newComment: string) => {
    onUpdate(item.id, { comment: newComment || undefined });
  };

  const handleTypeToggle = () => {
    onUpdate(item.id, { type: item.type === 'folder' ? 'file' : 'folder' });
  };

  const handleToggleExpand = () => {
    if (item.type === 'folder') {
      onUpdate(item.id, { isExpanded: !item.isExpanded });
    }
  };

  return (
    <div
      ref={ref}
      className={`folder-item ${isDragging ? 'dragging' : ''}`}
      style={{ 
        marginLeft: `${level * 20}px`,
        opacity: isDragging ? 0.5 : 1 
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {item.type === 'folder' && item.children.length > 0 && (
          <button
            onClick={handleToggleExpand}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
            title={item.isExpanded ? 'Collapse' : 'Expand'}
          >
            {item.isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        
        <button
          onClick={handleTypeToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          title={`Convert to ${item.type === 'folder' ? 'file' : 'folder'}`}
        >
          {item.type === 'folder' ? 
            (item.isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />) : 
            <File size={16} />
          }
        </button>
        
        <input
          type="text"
          value={item.name}
          onChange={(e) => handleNameChange(e.target.value)}
          style={{ flex: 1, border: 'none', background: 'transparent' }}
        />
        
        <input
          type="text"
          value={item.comment || ''}
          onChange={(e) => handleCommentChange(e.target.value)}
          placeholder="Comment..."
          style={{ 
            width: '150px', 
            border: 'none', 
            background: 'transparent',
            fontStyle: 'italic',
            color: '#666'
          }}
        />
        
        {item.type === 'folder' && (
          <>
            <button
              onClick={() => onAddChild(item.id, 'folder')}
              title="Add folder"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Plus size={14} />📁
            </button>
            <button
              onClick={() => onAddChild(item.id, 'file')}
              title="Add file"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Plus size={14} />📄
            </button>
          </>
        )}
        
        <button
          onClick={() => onDelete(item.id)}
          title="Delete"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default FolderItem;
