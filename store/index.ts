import subjecto from '../lib/subjecto';
import { useEffect, useState } from 'react';
import { FirebaseApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { init as initFirebase } from '../services/firebase';

const { Subject } = subjecto;
// add a default onMount hook
Subject.prototype.hook = function () {
  const [value, setValue] = useState(this.value);
  useEffect(() => this.subscribe(setValue).unsubscribe, []);
  return value;
};

const store = {
  editor: {
    cssEditor: new Subject<monaco.editor.IStandaloneCodeEditor | null>(null),
    css: new Subject(''),
    uidlEditor: new Subject<monaco.editor.IStandaloneCodeEditor | null>(null),
    uidl: new Subject(''),
  },
  firebase: {
    instance: new Subject<FirebaseApp | null>(null),
  },
  user: new Subject<User | null>(null),
  userToken: new Subject(''),
};

initFirebase();

export default store;
