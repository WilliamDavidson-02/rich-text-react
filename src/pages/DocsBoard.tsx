import { toast } from "sonner";
import { useUserContext } from "../context/UserContext";
import supabase from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DocsBoard() {
  const { user, getUser, unsetUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Error while signing out, please try again");
      return;
    }

    unsetUser();
    navigate("/auth");
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={signOut}>
        Sign out
      </div>
      <ul>
        <li>{user.full_name}</li>
        <li>
          <img src={user.avatar_url} alt="" />
        </li>
        <li>{user.email}</li>
      </ul>
    </div>
  );
}
