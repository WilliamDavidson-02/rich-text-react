import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  Underline,
} from "lucide-react";
import SubmitBtnGreen from "./SubmitBtnGreen";
import { Editor } from "@tiptap/react";
import { useRef, useState } from "react";

type EditorToolBarProps = {
  editor: Editor | null;
};

const highlightColors = [
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

export default function EditorToolbar({ editor }: EditorToolBarProps) {
  const [highlightColor, setHighlightColor] = useState(8);
  const [showHighlightColor, setShowHighlightColor] = useState(false);
  const highlightRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex gap-4 rounded-md">
      <div className="flex gap-1">
        <SubmitBtnGreen
          title="Bold"
          onClick={() => editor?.commands.toggleBold()}
          isDisabled={false}
        >
          <Bold size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          title="Italic"
          onClick={() => editor?.commands.toggleItalic()}
          isDisabled={false}
        >
          <Italic size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          title="Underline"
          onClick={() => editor?.commands.toggleUnderline()}
          isDisabled={false}
        >
          <Underline size={16} />
        </SubmitBtnGreen>
      </div>
      <div className="flex gap-1">
        <SubmitBtnGreen
          title="Align left"
          onClick={() => editor?.commands.setTextAlign("left")}
          isDisabled={false}
        >
          <AlignLeft size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          title="Align center"
          onClick={() => editor?.commands.setTextAlign("center")}
          isDisabled={false}
        >
          <AlignCenter size={16} />
        </SubmitBtnGreen>
        <SubmitBtnGreen
          title="Align right"
          onClick={() => editor?.commands.setTextAlign("right")}
          isDisabled={false}
        >
          <AlignRight size={16} />
        </SubmitBtnGreen>
      </div>
      <div className="flex gap-1">
        <SubmitBtnGreen
          title="Highlight"
          onClick={() =>
            editor?.commands.toggleHighlight({
              color: highlightColors[highlightColor],
            })
          }
          isDisabled={false}
        >
          <Highlighter size={16} />
        </SubmitBtnGreen>
        {showHighlightColor && (
          <div
            onClick={() => setShowHighlightColor(false)}
            className="absolute left-0 top-0 z-10 h-screen w-screen"
          />
        )}
        <div className="relative z-30">
          <div
            style={{ backgroundColor: highlightColors[highlightColor] }}
            className="h-[34px] w-[34px] cursor-pointer rounded-md transition-colors duration-300"
            onClick={() => setShowHighlightColor((prev) => !prev)}
          />
          <div
            ref={highlightRef}
            className={`absolute left-0 top-full flex flex-col gap-1 overflow-hidden bg-black transition-all duration-300 ${
              showHighlightColor ? "py-1" : ""
            }`}
            style={{
              height:
                showHighlightColor && highlightRef.current
                  ? `${highlightRef.current.scrollHeight + 8}px`
                  : 0,
            }}
          >
            {highlightColors.map((color, index) => (
              <div
                key={color}
                className="h-[34px] w-[34px] shrink-0 cursor-pointer rounded-md"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setHighlightColor(index);
                  setShowHighlightColor(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
