import { ReactNode } from 'react';
import store from '../store';

const MenuItem = ({
  children,
  selected,
  onClick,
}: {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      style={{ flexShrink: 0, height: 48 }}
      onClick={onClick}
      className={`flex justify-center items-center w-12 h-12 ${
        selected
          ? ' bg-white border-b-[1px] border-slate-200'
          : 'text-slate-400'
      }`}
    >
      {children}
    </div>
  );
};

const LeftMenu = () => {
  const page = store.page.hook();
  console.log(page);
  return (
    <div className="w-12 h-full border-r bg-slate-100 pt-[1px]">
      <MenuItem
        selected={page === 'home'}
        onClick={() => store.page.next('home')}
      >
        H
      </MenuItem>
      <MenuItem
        selected={page === 'settings'}
        onClick={() => store.page.next('settings')}
      >
        S
      </MenuItem>
      <MenuItem
        selected={page === 'uidl'}
        onClick={() => store.page.next('uidl')}
      >
        U
      </MenuItem>
    </div>
  );
};

export default LeftMenu;
