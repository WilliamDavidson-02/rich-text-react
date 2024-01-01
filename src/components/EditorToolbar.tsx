import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import SubmitBtnGreen from "./SubmitBtnGreen";
import { Editor } from "@tiptap/react";

type EditorToolBarProps = {
  editor: Editor | null;
};

export default function EditorToolbar({ editor }: EditorToolBarProps) {
  return (
    <div className="flex gap-4 rounded-md">
      <div className="flex gap-1">
        <SubmitBtnGreen
          onClick={() => editor?.commands.toggleBold()}
          isDisabled={false}
        >
          <Bold size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          onClick={() => editor?.commands.toggleItalic()}
          isDisabled={false}
        >
          <Italic size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          onClick={() => editor?.commands.toggleUnderline()}
          isDisabled={false}
        >
          <Underline size={16} />
        </SubmitBtnGreen>
      </div>
      <div className="flex gap-1">
        <SubmitBtnGreen
          onClick={() => editor?.commands.setTextAlign("left")}
          isDisabled={false}
        >
          <AlignLeft size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          onClick={() => editor?.commands.setTextAlign("center")}
          isDisabled={false}
        >
          <AlignCenter size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          onClick={() => editor?.commands.setTextAlign("right")}
          isDisabled={false}
        >
          <AlignRight size={16} />
        </SubmitBtnGreen>
      </div>
    </div>
  );
}
