import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import store from '../store';
import Header from '../components/header';
import cssParser from 'css';

const defaultCss = `.text {
  color: red;
}
`;

export default function Home() {
  let json = '{}';
  const css = store.editor.css.hook();
  const validCss = useRef(true);

  try {
    const ast = cssParser.parse(css);
    json = JSON.stringify(ast, null, 2);
    validCss.current = true;
    console.log(ast);
  } catch (err) {
    validCss.current = false;
    json = '{ "error": "Invalid Css" }';
  }

  const onMountCss = (editor: monaco.editor.IStandaloneCodeEditor) => {
    store.editor.cssEditor.next(editor);
    store.editor.css.next(defaultCss);
  };

  const onMountUidl = (editor: monaco.editor.IStandaloneCodeEditor) => {
    store.editor.uidlEditor.next(editor);
  };

  return (
    <div>
      <Header />
      <div>
        <h2>CSS {!validCss.current && `(invalid)`}</h2>
        <Editor
          height="200px"
          defaultLanguage="css"
          defaultValue={'// ... loading'}
          value={css}
          onMount={onMountCss}
          onChange={(value) => {
            store.editor.css.next(value);
          }}
        />
      </div>
      <div>
        <h2>JSON</h2>
        <Editor
          height="200px"
          defaultLanguage="json"
          defaultValue={'// ... loading'}
          value={json}
          onMount={onMountUidl}
        />
      </div>
    </div>
  );
}
