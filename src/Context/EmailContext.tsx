import React, { ReactNode, createContext, useState } from "react";

type EmailContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const EmailContext = createContext<EmailContextType>({
  email: "",
  setEmail: () => {},
});

interface EmailProps {
  children: ReactNode;
}

export const EmailProvider: React.FC<EmailProps> = ({ children }) => {
  const [email, setEmail] = useState("");

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
