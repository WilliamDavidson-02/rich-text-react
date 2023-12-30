import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import SubmitBtnGreen from "./SubmitBtnGreen";
import { useCurrentEditor } from "@tiptap/react";

export default function EditorToolbar() {
  const { editor } = useCurrentEditor();

  return (
    <div className="flex gap-4 rounded-md bg-black p-2">
      <div className="flex gap-1">
        <SubmitBtnGreen isDisabled={false}>
          <Bold size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen isDisabled={false}>
          <Italic size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen isDisabled={false}>
          <Underline size={16} />
        </SubmitBtnGreen>
      </div>
      <div className="flex gap-1">
        <SubmitBtnGreen isDisabled={false}>
          <AlignLeft size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen isDisabled={false}>
          <AlignCenter size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen isDisabled={false}>
          <AlignRight size={16} />
        </SubmitBtnGreen>
      </div>
    </div>
  );
}
