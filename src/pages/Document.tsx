import { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import Navigation from "../components/Navigation";
import { useUserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import { toast } from "sonner";
import SubmitBtnGreen from "../components/SubmitBtnGreen";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { z } from "zod";
import DocumentTextEditor from "../components/DocumentTextEditor";
import RedBtnContainer from "../components/RedBtnContainer";
import ConfirmActionPopUp from "../components/ConfirmActionPopUp";

export type documentType = {
  name: string;
  content: string;
  created_date: string;
};

const nameSchema = z.string().max(64);

export default function Document() {
  const { getUser } = useUserContext();
  const { doc_id = "" } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState<documentType>({
    name: "",
    content: "",
    created_date: "",
  });
  const [nameTimer, setNameTimer] = useState<NodeJS.Timeout | null>(null);
  const [contentTimer, setContentTimer] = useState<NodeJS.Timeout | null>(null);
  const [isDocLoading, setIsDocLoading] = useState(true);
  const [showDeleteDoc, setShowDeleteDoc] = useState(false);

  useEffect(() => {
    getUser();

    const getDocuments = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("name, content, created_date")
        .eq("id", doc_id);

      if (error) {
        toast.error("Error while getting document");
        navigate("/");
        return;
      }

      const { name, content, created_date } = data[0];
      setDocument({
        name: name ?? "",
        content: content ?? "",
        created_date,
      });
      setIsDocLoading(false);
    };

    getDocuments();
  }, []);

  const saveDocument = (id: string, value: any) => {
    if (nameTimer) clearTimeout(nameTimer);
    if (contentTimer) clearTimeout(contentTimer);

    const contentPromise = new Promise(async (resolve, reject) => {
      try {
        const { error } = await supabase
          .from("documents")
          .update({ ...value, last_updated: new Date().toISOString() })
          .eq("id", id);

        if (error) {
          reject(false);
          return;
        }

        resolve(true);
      } catch (error) {
        reject(false);
      }
    });

    toast.promise(contentPromise, {
      loading: `Saving, ${document.name}`,
      success: `${document.name}, saved successfully!`,
      error: "Error while saving, please try again",
    });
  };

  const handleDocumentNameChange = (name: string) => {
    setDocument((prev) => ({ ...prev, name }));

    if (nameTimer) clearTimeout(nameTimer);

    const updateContent = () => {
      if (!nameSchema.safeParse(name).success) {
        toast.error("Name of document can be max 64 characters");
        return;
      }

      saveDocument(doc_id, { name });
      setNameTimer(null);
    };

    setNameTimer(setTimeout(() => updateContent(), 5000));
  };

  const deleteDocument = () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        const { error } = await supabase
          .from("documents")
          .delete()
          .eq("id", doc_id);

        if (error) {
          reject(false);
          return;
        }
        setShowDeleteDoc(false);
        navigate("/");
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });

    toast.promise(deletePromise, {
      loading: `Deleting, ${document.name}`,
      success: `Successfully deleted ${document.name}`,
      error: `Error while deleting, ${document.name}`,
    });
  };

  return (
    <>
      {showDeleteDoc && (
        <ConfirmActionPopUp
          message={`Are you sure that you want to delete ${document?.name}?`}
          cancelAction={() => setShowDeleteDoc(false)}
          confirmAction={deleteDocument}
        />
      )}
      <MainContainer>
        <div className="flex max-h-screen flex-col gap-4 pb-16">
          <Navigation />
          <div className="flex items-center gap-4">
            <SubmitBtnGreen
              title="Back to documents"
              onClick={() => navigate("/")}
              isDisabled={false}
              isActive={false}
            >
              <ArrowLeft size={20} />
            </SubmitBtnGreen>
            {isDocLoading ? (
              <div className="h-[38px] flex-grow animate-pulse rounded-md bg-gradient-to-r from-rich-light-green/30 to-rich-dark-green/30" />
            ) : (
              <input
                type="text"
                placeholder="Nameless"
                maxLength={64}
                className="flex-grow border-none bg-transparent text-2xl outline-none placeholder:text-white"
                value={document.name}
                onChange={(ev) => handleDocumentNameChange(ev.target.value)}
              />
            )}
            <SubmitBtnGreen
              onClick={() =>
                saveDocument(doc_id, {
                  name: document.name,
                  content: document.content,
                })
              }
              title="Save"
              isDisabled={false}
              isActive={false}
            >
              <Save size={20} />
            </SubmitBtnGreen>
            <RedBtnContainer
              title="Delete"
              onClick={() => setShowDeleteDoc(true)}
            >
              <Trash2 size={20} />
            </RedBtnContainer>
          </div>
          {isDocLoading ? (
            <div className="h-[38px] flex-grow animate-pulse rounded-md bg-gradient-to-r from-rich-light-green/30 to-rich-dark-green/30" />
          ) : (
            <DocumentTextEditor
              document={document}
              setDocument={setDocument}
              id={doc_id}
              saveDocument={saveDocument}
              timer={contentTimer}
              setTimer={setContentTimer}
            />
          )}
        </div>
      </MainContainer>
    </>
  );
}
