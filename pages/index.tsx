import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import store from '../store';
import Header from '../components/header';
import Tokens from '../components/tokens';
import LeftMenu from '../components/leftMenu';
import SectionTitle from '../components/sectionTitle';
import cssParser, { Rule } from 'css';

const defaultCss = `...loading`;

export default function Home() {
  let json = '{}';
  const css = store.editor.css.hook();
  const validCss = useRef(true);

  try {
    const ast = cssParser.parse(css);
    const tokens: typeof store.tokens.value = {};
    ast.stylesheet.rules.forEach((rule: Rule) => {
      console.log(rule.selectors[0]);
      const rules = {};
      rule.declarations.forEach((declaration) => {
        rules[declaration.property] = declaration.value;
      });
      tokens[rule.selectors[0]] = rules;
    });
    store.tokens.next(tokens);

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

  useEffect(() => {
    const resizeMonacoEditors = () => {
      store.editor.cssEditor.value.layout();
      store.editor.uidlEditor.value.layout();
      console.log(store.editor.cssEditor.value.layout);
    };
    window.addEventListener('resize', resizeMonacoEditors);
    return () => window.removeEventListener('resize', resizeMonacoEditors);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-1">
        <LeftMenu />
        <div className="flex flex-col flex-1 p-8 overflow">
          <div className="mb-8">
            <SectionTitle>CSS {!validCss.current && `(invalid)`}</SectionTitle>
            <div
              style={{ width: 'calc(100vw - 120px)' }}
              className="border border-color-slate-100"
            >
              <Editor
                height="200px"
                defaultLanguage="css"
                defaultValue={'// ... loading'}
                value={css}
                onMount={onMountCss}
                onChange={(value) => {
                  store.editor.css.next(value);
                  store.firebase.write(value);
                }}
              />
            </div>
          </div>
          <Tokens />
          <div className="mb-8">
            <SectionTitle>JSON</SectionTitle>
            <div
              style={{ width: 'calc(100vw - 120px)' }}
              className="border border-color-slate-100"
            >
              <Editor
                height="400px"
                defaultLanguage="json"
                defaultValue={'// ... loading'}
                value={json}
                onMount={onMountUidl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
