import subjecto from '../lib/subjecto';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

const { Subject } = subjecto;
// add a default onMount hook
Subject.prototype.hook = function () {
  const [value, setValue] = useState(this.value);
  useEffect(() => this.subscribe(setValue).unsubscribe, []);
  return value;
};

import withFirebase from '../services/firebase';

const store = {
  editor: {
    cssEditor: new Subject<monaco.editor.IStandaloneCodeEditor | null>(null),
    css: new Subject(''),
    uidlEditor: new Subject<monaco.editor.IStandaloneCodeEditor | null>(null),
    uidl: new Subject(''),
  },
  firebase: {
    instance: new Subject<firebase.FirebaseApp | null>(null),
  },
};

withFirebase(store);

export default store;
