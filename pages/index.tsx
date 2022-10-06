import Editor from '@monaco-editor/react';
import store from '../store';

export default function Home() {
  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    store.monacoEditor.next(editor);
  };

  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={onMount}
      />
    </div>
  );
}
