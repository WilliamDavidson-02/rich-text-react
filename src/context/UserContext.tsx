import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import supabase from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UserContextProviderProps = {
  children: ReactNode;
};

type user = {
  email: string;
  avatar_url: string;
  full_name: string;
};

type UserContext = {
  user: user;
  setUser: Dispatch<SetStateAction<user>>;
  getUser: () => void;
  signOut: () => void;
};

export const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState({
    email: "",
    avatar_url: "",
    full_name: "",
  });
  const navigate = useNavigate();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const {
        email,
        user_metadata: { avatar_url, full_name },
      } = user!;
      const userEmail = email ?? "";
      const userAvatar: string = avatar_url ?? "";
      const userName: string = full_name ?? "";

      setUser({
        email: userEmail,
        avatar_url: userAvatar,
        full_name: userName,
      });
    } else {
      navigate("/auth");
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error while signing out, please try again");
      return;
    }

    setUser({ email: "", avatar_url: "", full_name: "" });
    navigate("/auth");
  };

  return (
    <UserContext.Provider value={{ user, setUser, getUser, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
