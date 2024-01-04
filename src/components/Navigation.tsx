import { useUserContext } from "../context/UserContext";
import Avatar from "./Avatar";
import GreenGlowContainer from "./GreenGlowContainer";

export default function Navigation() {
  const { user, signOut } = useUserContext();

  return (
    <nav className="mx-auto my-6 flex w-fit items-center gap-2 rounded-md bg-zinc-900 p-2">
      <div className="h-[46px]">
        <Avatar url={user.avatar_url} />
      </div>
      <GreenGlowContainer>
        <span className="text-lg">Profile</span>
      </GreenGlowContainer>
      <GreenGlowContainer onClick={signOut}>
        <span className="text-lg">Sign out</span>
      </GreenGlowContainer>
    </nav>
  );
}
