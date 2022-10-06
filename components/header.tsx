import Button from './button';
import store from '../store';

import { signIn, logOut } from '../services/firebase';
const Header = () => {
  const user = store.user.hook();
  const instance = store.firebase.instance.hook();
  return (
    <header className="flex justify-stretch bg-slate-800 text-white h-12 pl-4 pr-4 items-center justify-between">
      <div className="text-base">
        CSS to UIDL experiment {instance && ' - Firebase is ready'}
      </div>
      <div className="text-sm">
        {!user && <Button onClick={signIn}>Sign In</Button>}
        {user && (
          <>
            <span className="mr-4">{user.email}</span>
            <Button onClick={logOut}>Log Out</Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
