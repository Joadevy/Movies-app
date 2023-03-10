"use client";

import { IMedia, type UserContext as User } from "@/utils/types";
import { createContext, useState } from "react";

export const UserContext = createContext<GlobalUserContext>({
  userData: { id: 0, name: "", password: "", bookmarks: new Map() },
  toggleMedia: () => {},
});

type Props = {
  children: React.ReactNode;
};

type GlobalUserContext = {
  userData: User;
  toggleMedia: (_: IMedia) => void;
};

export default function UserProvider({ children }: Props) {
  const [userData, setUserData] = useState<User>({
    id: 1,
    name: "test example",
    password: "test123",
    bookmarks: new Map(),
  });

  const toggleMedia = (media: IMedia) => {
    const newUserData = { ...userData };
    if (newUserData.bookmarks.has(media.id))
      newUserData.bookmarks.delete(media.id);
    else newUserData.bookmarks.set(media.id, media);
    setUserData(newUserData);
  };

  return (
    <UserContext.Provider value={{ userData, toggleMedia }}>
      {children}
    </UserContext.Provider>
  );
}
