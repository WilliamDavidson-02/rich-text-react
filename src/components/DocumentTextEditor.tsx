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
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

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
      StarterKit.configure({ codeBlock: false }),
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "right", "center"],
      }),
      CodeBlockLowlight.configure({ lowlight: createLowlight(common) }),
      TaskItem,
      TaskList,
      Link.configure({
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Color,
      TextStyle,
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
            reject("Error while auto saving document");
            return;
          }

          setDocument((prev) => ({ ...prev, content }));
          setTimer(null);
          resolve(true);
        } catch (error) {
          reject("Error while auto saving document");
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
    <div className="flex flex-col gap-4">
      <EditorToolbar editor={editor} />
      <div className="scrollbar-none max-h-[calc(100vh-250px)] flex-grow overflow-auto scroll-smooth pr-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
