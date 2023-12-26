import { Dispatch, SetStateAction } from "react";
import { formType } from "../pages/Auth";
import { ZodSchema } from "zod";
import { toast } from "sonner";

type textInputProps = {
  text: string;
  setText: Dispatch<SetStateAction<formType>>;
  placeholder: string;
  inputKey: string;
  schema: ZodSchema<any>;
  errorMsg: string;
};

export default function TextInput({
  text,
  setText,
  placeholder,
  inputKey,
  schema,
  errorMsg,
}: textInputProps) {
  const validateText = (value: string) => {
    try {
      schema.parse(value);
    } catch (error: any) {
      toast.error(errorMsg);
    }
  };

  return (
    <input
      className="w-full rounded-md border border-zinc-600 bg-black p-2 outline-none transition-colors duration-200 placeholder:text-zinc-600 focus:border-white focus:placeholder:text-white"
      type="text"
      value={text}
      onChange={(ev) =>
        setText((prev) => ({ ...prev, [inputKey]: ev.target.value }))
      }
      placeholder={placeholder}
      onBlur={() => validateText(text)}
    />
  );
}
