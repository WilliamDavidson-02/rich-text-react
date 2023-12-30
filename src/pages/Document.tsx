import { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import Navigation from "../components/Navigation";
import { useUserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../supabase/supabaseClient";
import { toast } from "sonner";
import SubmitBtnGreen from "../components/SubmitBtnGreen";
import { ArrowLeft } from "lucide-react";

type documentType = {
  name: string;
  content: string;
  created_date: string;
};

export default function Document() {
  const { getUser } = useUserContext();
  const { doc_id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState<documentType>({
    name: "",
    content: "",
    created_date: "",
  });
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

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
    };

    getDocuments();
  }, []);

  const handleDocumentNameChange = (name: string) => {
    setDocument((prev) => ({ ...prev, name }));

    if (timer) clearTimeout(timer);

    const updateName = async () => {
      const { error } = await supabase
        .from("documents")
        .update({ name: document.name })
        .eq("id", doc_id);

      setTimer(null);

      if (error) {
        toast.error("Error updating name of this document");
        return;
      }

      toast.success("Saved new document name");
    };

    setTimer(setTimeout(() => updateName(), 5000));
  };

  return (
    <MainContainer>
      <Navigation />
      <div>
        <div className="flex items-center gap-4">
          <SubmitBtnGreen onClick={() => navigate(-1)} isDisabled={false}>
            <ArrowLeft size={20} />
          </SubmitBtnGreen>
          <input
            type="text"
            placeholder="Nameless"
            className="border-none bg-transparent text-2xl outline-none placeholder:text-white"
            value={document.name}
            onChange={(ev) => handleDocumentNameChange(ev.target.value)}
          />
        </div>
      </div>
    </MainContainer>
  );
}
