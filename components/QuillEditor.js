import 'react-quill/dist/quill.snow.css'; // Import styles
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to ensure it's only loaded on the client-side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const QuillEditor = ({ value, onChange }) => {
  // Configuration for the Quill editor toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  // The formats that Quill should recognize
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      // Set a default height for the editor
      style={{ height: '300px', marginBottom: '4rem' }}
    />
  );
};

export default QuillEditor;