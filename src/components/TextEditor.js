import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
//import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
//import { solarizedLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './QuillEditor.module.css'


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

/*
const CodeBlock = ()=>{
  const Parchment = ReactQuill.import('parchment')

  const CodeBlockBlot = new Parchment.Attributor.Blot('code-block', 'pre', {
    class: 'ql-syntaxt',
    'spellcheck': 'false',
    'data-syntaxt': true,
  })
  ReactQuill.register(CodeBlockBlot)
  return null;
}
*/

const TextEditor = ({ value, onChange }) => {
  const modules = {
    //syntax: true,
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
   // ['code-block'],
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
    'color',
// 'code-block',
  ];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder='Write and style your blog contents here!...'
      theme='snow'
      /*
      renderCustomBlock={CodeBlock}
      SyntaxHighlighter={SyntaxHighlighter}
      syntaxStyle={solarizedLight}
      */
    />
  );
};

export default TextEditor;
