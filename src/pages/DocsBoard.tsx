import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import MainContainer from "../components/MainContainer";
import GreenGlowContainer from "../components/GreenGlowContainer";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import supabase from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

type documentsType = {
  id: string;
  name: string;
};

export default function DocsBoard() {
  const { getUser, user } = useUserContext();
  const [documents, setDocuments] = useState<documentsType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();

    const getDocuments = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("id, name");

      if (error) {
        toast.error("Error while getting your documents");
        return;
      }

      setDocuments(data);
    };

    getDocuments();
  }, []);

  const createNewDocument = () => {
    const createPromise = new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await supabase
          .from("documents")
          .insert([{ user_id: user.id }])
          .select("id");

        if (error) {
          reject(false);
          return;
        }

        const id: string = data[0].id;
        navigate(`/document/${id}`);
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
      <div className="flex flex-wrap gap-4">
        {documents.map((document) => (
          <a
            href={`document/${document.id}`}
            className="h-[300px] w-full sm:w-[200px]"
            key={document.id}
          >
            <GreenGlowContainer>
              <div>{document.name ?? "Nameless"}</div>
            </GreenGlowContainer>
          </a>
        ))}
        <div
          onClick={createNewDocument}
          title="Create a new document"
          className="h-[300px] w-full sm:w-[200px]"
        >
          <GreenGlowContainer>
            <Plus size={100} strokeWidth={1} />
          </GreenGlowContainer>
        </div>
      </div>
    </MainContainer>
  );
}
