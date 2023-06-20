import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from './QuillEditor.module.css'


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const TextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      ['blockquote', 'link', 'image'],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'script',
    'indent',
    'direction',
    'background',
    'font',
    'align',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'color'
  ];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default TextEditor;
