import { ReactNode } from 'react';

const Button = ({
  onClick,
  children,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className="text-xs bg-slate-600 pl-3 pr-3 pt-1 pb-1 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
