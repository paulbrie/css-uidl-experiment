import store from '../store';

import { signIn, logOut } from '../services/firebase';
const Header = () => {
  const user = store.user.hook();
  const instance = store.firebase.instance.hook();
  return (
    <header>
      <div>CSS to UIDL experiment {instance && ' - Firebase is ready'}</div>
      <div>
        {!user && <button onClick={signIn}>Sign In</button>}
        {user && user.email + ' '}
        {user && <button onClick={logOut}>Log Out</button>}
      </div>
    </header>
  );
};

export default Header;
