import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import MainContainer from "../components/MainContainer";
import GreenGlowContainer from "../components/GreenGlowContainer";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import supabase from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import ConfirmActionPopUp from "../components/ConfirmActionPopUp";
import RedBtnContainer from "../components/RedBtnContainer";

export type documentsType = {
  id: string;
  name: string;
};

export default function DocsBoard() {
  const { getUser, user } = useUserContext();
  const [documents, setDocuments] = useState<documentsType[]>([]);
  const [showDeleteDoc, setShowDeleteDoc] = useState(false);
  const [docToDelete, setDocToDelete] = useState<documentsType | null>(null);
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

  const deleteDocument = () => {
    if (!docToDelete) return;
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        const { error } = await supabase
          .from("documents")
          .delete()
          .eq("id", docToDelete.id);

        if (error) {
          reject(false);
          return;
        }
        const filteredDocuments = documents.filter(
          (document) => document.id !== docToDelete.id,
        );
        setDocuments(filteredDocuments);
        setDocToDelete(null);
        setShowDeleteDoc(false);
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });

    toast.promise(deletePromise, {
      loading: `Deleting, ${docToDelete.name}`,
      success: `Successfully deleted ${docToDelete.name}`,
      error: `Error while deleting, ${docToDelete.name}`,
    });
  };

  const handleDocToDelete = (document: documentsType) => {
    setDocToDelete(document);
    setShowDeleteDoc(true);
  };

  const handleDeleteCancelation = () => {
    setDocToDelete(null);
    setShowDeleteDoc(false);
  };

  return (
    <>
      {showDeleteDoc && (
        <ConfirmActionPopUp
          message={`Are you sure that you want to delete ${
            docToDelete?.name ? docToDelete?.name : "document"
          }?`}
          cancelAction={handleDeleteCancelation}
          confirmAction={deleteDocument}
        />
      )}
      <MainContainer>
        <Navigation />
        <div className="flex flex-wrap gap-4">
          {documents.map((document) => (
            <div
              key={document.id}
              className="relative h-[300px] w-full sm:w-[200px]"
            >
              <div className="absolute right-3 top-3">
                <RedBtnContainer onClick={() => handleDocToDelete(document)}>
                  <Trash2 size={20} />
                </RedBtnContainer>
              </div>
              <a href={`document/${document.id}`}>
                <GreenGlowContainer>
                  <div className="text-center">
                    {document.name ?? "Nameless"}
                  </div>
                </GreenGlowContainer>
              </a>
            </div>
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
    </>
  );
}
