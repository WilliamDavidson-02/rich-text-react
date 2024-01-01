import { Dispatch, SetStateAction, useState } from "react";
import { documentType } from "../pages/Document";
import supabase from "../supabase/supabaseClient";
import { toast } from "sonner";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../tiptap.css";
import EditorToolbar from "./EditorToolbar";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { common, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

type DocumentTextEditorProps = {
  document: documentType;
  setDocument: Dispatch<SetStateAction<documentType>>;
  id: string;
};

export default function DocumentTextEditor({
  document,
  setDocument,
  id,
}: DocumentTextEditorProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "right", "center"],
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
    ],
    content: document.content,
    onUpdate: ({ editor }) => {
      handleDocumentAutoSave(editor.getHTML());
    },
  });

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
    <>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
