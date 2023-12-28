import { useUserContext } from "../context/UserContext";
import Avatar from "./Avatar";
import GreenGlowContainer from "./GreenGlowContainer";

export default function Navigation() {
  const { user, signOut } = useUserContext();

  return (
    <nav className="mx-auto flex h-12 w-fit gap-4 rounded-md bg-zinc-900 p-2">
      <Avatar url={user.avatar_url} />
      <GreenGlowContainer onClick={signOut}>Sing out</GreenGlowContainer>
    </nav>
  );
}
