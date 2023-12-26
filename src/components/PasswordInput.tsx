import { Dispatch, SetStateAction, useState } from "react";
import { formType } from "../pages/Auth";
import { Eye, EyeOff } from "lucide-react";
import SmBtnHoverContainer from "./SmBtnHoverContainer";
import { ZodSchema } from "zod";
import { toast } from "sonner";

type textInputProps = {
  password: string;
  setPassword: Dispatch<SetStateAction<formType>>;
  placeholder: string;
  schema: ZodSchema<any>;
  errorMsg: string;
};

export default function PasswordInput({
  password,
  setPassword,
  placeholder,
  schema,
  errorMsg,
}: textInputProps) {
  const [type, setType] = useState<"password" | "text">("password");

  const validatePassword = (value: string) => {
    try {
      schema.parse(value);
    } catch (error: any) {
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex w-full rounded-md border border-zinc-600 bg-black p-2 transition-colors duration-200 focus-within:border-white ">
      <input
        className="flex-grow bg-black outline-none transition-colors duration-200 placeholder:text-zinc-600 focus-within:placeholder:text-white"
        type={type}
        value={password}
        onChange={(ev) =>
          setPassword((prev) => ({ ...prev, password: ev.target.value }))
        }
        placeholder={placeholder}
        onBlur={() => validatePassword(password)}
      />
      <SmBtnHoverContainer
        onClick={() =>
          setType((prev) => (prev === "password" ? "text" : "password"))
        }
      >
        {type === "password" ? (
          <EyeOff size={16} className="m-1" />
        ) : (
          <Eye size={16} className="m-1" />
        )}
      </SmBtnHoverContainer>
    </div>
  );
}
