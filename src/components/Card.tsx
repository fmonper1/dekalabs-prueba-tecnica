type CardProps = {
  children: React.ReactNode;
};
export const Card = ({ children }: CardProps) => {
  return <div className="border rounded relative">{children}</div>;
};
