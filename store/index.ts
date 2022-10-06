import subjecto from '../lib/subjecto';
import { useEffect, useState } from 'react';

const { Subject } = subjecto;
// add a default onMount hook
Subject.prototype.hook = function () {
  const [value, setValue] = useState(this.value);
  useEffect(() => this.subscribe(setValue).unsubscribe, []);
  return value;
};

const store = {
  editor: {
    monacoEditor: new Subject<monaco.editor.IStandaloneCodeEditor | null>(null),
    value: new Subject(''),
  },
};

export default store;
