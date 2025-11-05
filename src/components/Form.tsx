import React from "react";

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <div className="flex items-center justify-center z-10">
        <div className="bg-white p-10 shadow-md rounded-2xl">
          <form onSubmit={onSubmit} className="space-y-4">
            {children}
          </form>
      </div>
    </div>
  );
};

export default Form;
