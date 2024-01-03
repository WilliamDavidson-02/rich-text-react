import { Dispatch, SetStateAction, useState } from "react";
import { documentType } from "../pages/Document";
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
  saveDocument: (id: string, value: any) => void;
  timer: NodeJS.Timeout | null;
  setTimer: Dispatch<SetStateAction<NodeJS.Timeout | null>>;
};

export default function DocumentTextEditor({
  document,
  setDocument,
  id,
  saveDocument,
  timer,
  setTimer,
}: DocumentTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        code: {
          HTMLAttributes: {
            class: "tiptap-code",
          },
        },
      }),
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "right", "center"],
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
        HTMLAttributes: {
          class: "tiptap-codeblock",
        },
      }),
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
    setDocument((prev) => ({ ...prev, content }));

    if (timer) clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        saveDocument(id, { content });
        setTimer(null);
      }, 5000),
    );
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
