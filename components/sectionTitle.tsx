import { ReactNode } from 'react';
const SectionTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-sm mb-2 font-semibold">{children}</h2>;
};
export default SectionTitle;
