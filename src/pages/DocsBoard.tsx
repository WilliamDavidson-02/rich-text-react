import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import Navigation from "../components/Navigation";
import MainContainer from "../components/MainContainer";
import GreenGlowContainer from "../components/GreenGlowContainer";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import supabase from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function DocsBoard() {
  const { getUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const createNewDocument = () => {
    const createPromise = new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await supabase
          .from("documents")
          .insert([{ name: "Nameless" }])
          .select("id");

        if (error) {
          reject(false);
          return;
        }

        const id: string = data[0].id;
        navigate(`/document?doc_id=${id}`);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });

    toast.promise(createPromise, {
      loading: "Creating document",
      success: "Successfully created new document",
      error: "Error while creating new document",
    });
  };

  return (
    <MainContainer>
      <Navigation />
      <div>
        <div
          onClick={createNewDocument}
          title="Create a new document"
          className="h-[300px] sm:w-[200px]"
        >
          <GreenGlowContainer>
            <Plus size={100} strokeWidth={1} />
          </GreenGlowContainer>
        </div>
      </div>
    </MainContainer>
  );
}
