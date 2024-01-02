import { Dispatch, SetStateAction, useRef } from "react";

type ColorPickerProps = {
  showColors: boolean;
  setShowColors: Dispatch<SetStateAction<boolean>>;
  colorIndex: number;
  setColorIndex: Dispatch<SetStateAction<number>>;
  colors: string[];
};

export default function ColorPicker({
  showColors,
  setShowColors,
  colorIndex,
  setColorIndex,
  colors,
}: ColorPickerProps) {
  const colorsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {showColors && (
        <div
          onClick={() => setShowColors(false)}
          className="absolute left-0 top-0 z-10 h-screen w-screen"
        />
      )}
      <div className="relative z-30">
        <div
          style={{ backgroundColor: colors[colorIndex] }}
          className="h-[34px] w-[34px] cursor-pointer rounded-md transition-colors duration-300"
          onClick={() => setShowColors((prev) => !prev)}
        />
        <div
          ref={colorsRef}
          className={`absolute left-0 top-full flex flex-col gap-1 overflow-y-hidden bg-black transition-all duration-300 ${
            showColors ? "py-1" : ""
          }`}
          style={{
            height:
              showColors && colorsRef.current
                ? `${colorsRef.current.scrollHeight + 8}px`
                : 0,
          }}
        >
          {colors.map((color, index) => (
            <div
              key={color}
              className="h-[34px] w-[34px] shrink-0 cursor-pointer rounded-md"
              style={{ backgroundColor: color }}
              onClick={() => {
                setColorIndex(index);
                setShowColors(false);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
