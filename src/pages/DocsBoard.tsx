import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import Navigation from "../components/Navigation";

export default function DocsBoard() {
  const { getUser } = useUserContext();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="pt-6">
      <Navigation />
    </div>
  );
}
