import React from "react";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="bg-teal-300 w-full min-h-1/2 fixed top-0 p-8 text-white text-center rounded-b-xl">
      <h2 className="text-2xl font-bold pt-4">{title}</h2>
    </div>
  );
};

export default Header;
