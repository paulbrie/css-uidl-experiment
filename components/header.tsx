import store from '../store';

const Header = () => {
  const instance = store.firebase.instance.hook();
  console.log(instance);
  return <header>Header {instance && ' - Firebase is ready'}</header>;
};

export default Header;
