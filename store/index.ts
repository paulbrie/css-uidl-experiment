import subjecto from '../lib/subjecto';
import { useEffect, useState } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Database } from 'firebase/database';
import { User } from 'firebase/auth';
import { init as initFirebase } from '../services/firebase';
import { ref, set, onValue } from 'firebase/database';

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
    instance: new Subject<FirebaseApp | null>(null!),
    db: new Subject<Database | null>(null),
    write: (value: string) => {
      set(ref(store.firebase.db.value, 'projects'), {
        project1: {
          css: value,
        },
      });
    },
  },
  user: new Subject<User | null>(null),
  userToken: new Subject(''),
  tokens: new Subject<Record<string, string>>({}),
  page: new Subject<'home' | 'settings' | 'uidl'>('home'),
};

initFirebase();

store.firebase.db.subscribe((db) => {
  if (!db) {
    return;
  }
  const cssRef = ref(db, 'projects/project1/css');
  onValue(cssRef, (snapshot) => {
    console.log(snapshot.key);
    const data = snapshot.val();
    if (data !== store?.editor.css.value) {
      store?.editor.css.next(data);
    }
    console.log('css ref', data);
  });
});

export default store;
