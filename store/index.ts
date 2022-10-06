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
  monacoEditor: new Subject<monaco.editor.IStandaloneCodeEditor | null>(null),
};

export default store;
