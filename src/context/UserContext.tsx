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
  id: string;
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

const initialUserObj = { id: "", email: "", avatar_url: "", full_name: "" };

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [user, setUser] = useState(initialUserObj);
  const navigate = useNavigate();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const {
        id,
        email,
        user_metadata: { avatar_url, full_name },
      } = user;

      setUser({
        id: id ?? "",
        email: email ?? "",
        avatar_url: avatar_url ?? "",
        full_name: full_name ?? "",
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

    setUser(initialUserObj);
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
