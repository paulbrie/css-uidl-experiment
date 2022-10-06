import Editor from '@monaco-editor/react';
import { useEffect } from 'react';
import store from '../store';

const defaultCss = `.test {
  color: red;
}
`;

export default function Home() {
  const value = store.editor.value.hook();
  
  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    store.editor.monacoEditor.next(editor);
    store.editor.monacoEditor.value.setValue(defaultCss);
  };

  return (
    <div>
      <div>
        <Editor
          height="90vh"
          defaultLanguage="css"
          defaultValue={'// ... loading'}
          value={value}
          onMount={onMount}
        />
      </div>
    </div>
  );
}
