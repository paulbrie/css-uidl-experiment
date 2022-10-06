import store from '../store';

import { signIn, logOut } from '../services/firebase';
const Header = () => {
  const user = store.user.hook();
  const instance = store.firebase.instance.hook();
  console.log(instance);
  return (
    <header>
      Header {instance && ' - Firebase is ready'}
      {!user && <button onClick={signIn}>Sign In</button>}
      {user && user.email + ' '}
      {user && <button onClick={logOut}>Log Out</button>}
    </header>
  );
};

export default Header;
