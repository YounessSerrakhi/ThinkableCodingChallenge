import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const handleChange = (content: string) => {
    onChange(content);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={{
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['link', 'image', 'video'],
          ['clean']
        ],
      }}
      formats={[
        'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
        'strike', 'blockquote', 'script', 'color', 'background', 'align',
        'link', 'image', 'video'
      ]}
      theme="snow"
    />
  );
};

export default TextEditor;
