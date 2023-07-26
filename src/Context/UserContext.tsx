import { ReactNode, createContext, useState } from "react";
import { User, IUser } from "../Models/User";

interface IUserData {
  userData: IUser;
  userAvatar: string;
  notificationCount: number;
}

interface IUserActions {
  setNotificationCount: (count: number) => void;
  setUserData: (newUserdetails: IUser) => void;
  setUserAvatar: (avatar: string) => void;
}

interface UserConProps {
  children: ReactNode;
}

class UserData implements IUserData {
  userData: IUser;
  userAvatar: string;
  notificationCount: number;

  constructor(init?: IUserData) {
    this.userData = init?.userData ?? new User();
    this.userAvatar = init?.userAvatar ?? "";
    this.notificationCount = init?.notificationCount ?? 0;
  }
}
const UserContext = createContext<IUserData & IUserActions>({
  ...new UserData(),
  setNotificationCount: () => {},
  setUserData: () => {},
  setUserAvatar: () => {},
});
export default UserContext;

export const UserProvider: React.FC<UserConProps> = ({ children }) => {
  const [userData, setUserDataState] = useState<IUser>(new User());
  const [userAvatar, setAvatarState] = useState<string>("");
  const [notificationCount, setNotificationCountState] = useState<number>(0);

  const setNotificationCount = (count: number) => {
    setNotificationCountState(count);
  };

  const setUserAvatar = (avatar: string) => {
    setAvatarState(avatar);
  };

  const setUserData = (newUserdetails: IUser) => {
    setUserDataState(newUserdetails);
  };

  return (
    <UserContext.Provider
      value={{
        notificationCount,
        userData,
        userAvatar,
        setNotificationCount,
        setUserData,
        setUserAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
