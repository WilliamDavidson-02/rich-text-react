import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  Code,
  Highlighter,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import SubmitBtnGreen from "./SubmitBtnGreen";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import ColorPicker from "./ColorPicker";

type EditorToolBarProps = {
  editor: Editor | null;
};

const colors = [
  "#354A7B",
  "#6581D4",
  "#310101",
  "#802323",
  "#F77578",
  "#01312B",
  "#22796F",
  "#00AC8C",
  "#00CBA6",
];

const textColors = ["#ffffff", "#000000", ...colors];

export default function EditorToolbar({ editor }: EditorToolBarProps) {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [showHighlightColor, setShowHighlightColor] = useState(false);
  const [textColorIndex, setTextColorIndex] = useState(0);
  const [showTextColor, setShowTextColor] = useState(false);

  return (
    <div className="flex max-w-full flex-wrap gap-4 rounded-md">
      <div className="flex gap-1">
        <SubmitBtnGreen
          isActive={editor?.isActive("bold") ? true : false}
          title="Bold"
          onClick={() => editor?.commands.toggleBold()}
          isDisabled={false}
        >
          <Bold size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          isActive={editor?.isActive("italic") ? true : false}
          title="Italic"
          onClick={() => editor?.commands.toggleItalic()}
          isDisabled={false}
        >
          <Italic size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          isActive={editor?.isActive("underline") ? true : false}
          title="Underline"
          onClick={() => editor?.commands.toggleUnderline()}
          isDisabled={false}
        >
          <Underline size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          isActive={editor?.isActive("strike") ? true : false}
          title="Strike"
          onClick={() => editor?.commands.toggleStrike()}
          isDisabled={false}
        >
          <Strikethrough size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          isActive={editor?.isActive("code") ? true : false}
          title="Code"
          onClick={() => editor?.commands.toggleCode()}
          isDisabled={false}
        >
          <Code size={16} />
        </SubmitBtnGreen>
      </div>
      <div className="flex gap-1">
        <SubmitBtnGreen
          isActive={editor?.isActive({ textAlign: "left" }) ? true : false}
          title="Align left"
          onClick={() => editor?.commands.setTextAlign("left")}
          isDisabled={false}
        >
          <AlignLeft size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          isActive={editor?.isActive({ textAlign: "center" }) ? true : false}
          title="Align center"
          onClick={() => editor?.commands.setTextAlign("center")}
          isDisabled={false}
        >
          <AlignCenter size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          isActive={editor?.isActive({ textAlign: "right" }) ? true : false}
          title="Align right"
          onClick={() => editor?.commands.setTextAlign("right")}
          isDisabled={false}
        >
          <AlignRight size={16} />
        </SubmitBtnGreen>
      </div>
      <div className="flex gap-1">
        <SubmitBtnGreen
          isActive={false}
          title="Highlight"
          onClick={() =>
            editor?.commands.toggleHighlight({
              color: colors[highlightIndex],
            })
          }
          isDisabled={false}
        >
          <Highlighter size={16} />
        </SubmitBtnGreen>
        <ColorPicker
          colors={colors}
          colorIndex={highlightIndex}
          setColorIndex={setHighlightIndex}
          showColors={showHighlightColor}
          setShowColors={setShowHighlightColor}
        />
      </div>
      <div className="flex gap-1">
        <SubmitBtnGreen
          isActive={false}
          title="Text color"
          onClick={() => editor?.commands.setColor(textColors[textColorIndex])}
          isDisabled={false}
        >
          <Baseline size={16} />
        </SubmitBtnGreen>
        <ColorPicker
          colors={textColors}
          colorIndex={textColorIndex}
          setColorIndex={setTextColorIndex}
          showColors={showTextColor}
          setShowColors={setShowTextColor}
        />
      </div>
    </div>
  );
}
