import { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import Navigation from "../components/Navigation";
import { useUserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import { toast } from "sonner";
import SubmitBtnGreen from "../components/SubmitBtnGreen";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import DocumentTextEditor from "../components/DocumentTextEditor";

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
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isDocLoading, setIsDocLoading] = useState(true);

  useEffect(() => {
    getUser();

    const getDocuments = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("name, content, created_date")
        .eq("id", doc_id);

      if (error) {
        toast.error("Error while getting document");
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

  const handleDocumentNameChange = (name: string) => {
    setDocument((prev) => ({ ...prev, name }));

    if (timer) clearTimeout(timer);

    const updateContent = () => {
      if (!nameSchema.safeParse(name).success) {
        toast.error("Name of document can be max 64 characters");
        return;
      }

      const contentPromise = new Promise(async (resolve, reject) => {
        try {
          const { error } = await supabase
            .from("documents")
            .update({ name })
            .eq("id", doc_id);

          if (error) {
            reject("Error while auto saving document name");
            return;
          }

          setTimer(null);
          resolve(true);
        } catch (error) {
          reject("Error while auto saving document name");
        }
      });

      toast.promise(contentPromise, {
        loading: `Saving, ${document.name}`,
        success: `${document.name}, saved successfully!`,
        error: (error: string) => error,
      });
    };

    setTimer(setTimeout(() => updateContent(), 5000));
  };

  return (
    <MainContainer>
      <Navigation />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <SubmitBtnGreen onClick={() => navigate("/")} isDisabled={false}>
            <ArrowLeft size={20} />
          </SubmitBtnGreen>
          <input
            type="text"
            placeholder="Nameless"
            maxLength={64}
            className="flex-grow border-none bg-transparent text-2xl outline-none placeholder:text-white"
            value={document.name}
            onChange={(ev) => handleDocumentNameChange(ev.target.value)}
          />
        </div>
        {!isDocLoading && (
          <DocumentTextEditor
            document={document}
            setDocument={setDocument}
            id={doc_id}
          />
        )}
      </div>
    </MainContainer>
  );
}
