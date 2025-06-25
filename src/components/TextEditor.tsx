import React from 'react';
import Editor from '@monaco-editor/react';

interface TextEditorProps {
  content: string;
  onChange: (value: string) => void;
  format: 'markdown' | 'ascii';
}

const TextEditor: React.FC<TextEditorProps> = ({ content, onChange, format }) => {
  // Acknowledge format parameter to avoid TypeScript unused variable warning
  void format;
  
  const handleChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div style={{ height: '100%', border: '1px solid #ccc' }}>
      <Editor
        height="100%"
        defaultLanguage="markdown"
        value={content}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: 'on',
          lineNumbers: 'on',
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
};

export default TextEditor;
