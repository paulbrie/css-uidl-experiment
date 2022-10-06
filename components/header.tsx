import store from '../store';

import { signIn } from '../services/firebase';
const Header = () => {
  const instance = store.firebase.instance.hook();
  console.log(instance);
  return (
    <header>
      Header {instance && ' - Firebase is ready'}
      <button onClick={signIn}>Sign In</button>
    </header>
  );
};

export default Header;
