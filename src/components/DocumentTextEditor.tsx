import { BubbleMenu, EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { documentType } from "../pages/Document";
import supabase from "../supabase/supabaseClient";
import { toast } from "sonner";

type DocumentTextEditorProps = {
  document: documentType;
  setDocument: Dispatch<SetStateAction<documentType>>;
  id: string;
};

const extensions = [StarterKit];

export default function DocumentTextEditor({
  document,
  setDocument,
  id,
}: DocumentTextEditorProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleDocumentAutoSave = (content: string) => {
    if (timer) clearTimeout(timer);

    const updateContent = () => {
      const contentPromise = new Promise(async (resolve, reject) => {
        try {
          const { error } = await supabase
            .from("documents")
            .update({ content })
            .eq("id", id);

          if (error) {
            reject("Error while auto saving the document");
            return;
          }

          setDocument((prev) => ({ ...prev, content }));
          setTimer(null);
          resolve(true);
        } catch (error) {
          reject("Error while auto saving the document");
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
    <EditorProvider
      extensions={extensions}
      content={document.content}
      slotBefore={<EditorToolbar />}
      onUpdate={({ editor }) => handleDocumentAutoSave(editor.getHTML())}
    >
      <BubbleMenu>
        <EditorToolbar />
      </BubbleMenu>
    </EditorProvider>
  );
}
