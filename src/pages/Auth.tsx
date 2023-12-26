import { FormEvent, useState } from "react";
import MainContainer from "../components/MainContainer";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import SubmitBtnGreen from "../components/SubmitBtnGreen";
import { z } from "zod";
import { toast } from "sonner";

const nameSchema = z.string().min(2);
const emailSchema = z.string().email();
const passwordLength = 8;
const passwordSchema = z.string().min(passwordLength);

export type formType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Auth() {
  const [form, setForm] = useState<formType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formType, setFormType] = useState<"signIn" | "signUp">("signIn");

  const validateForm = () => {
    const invalidFields: string[] = [];

    if (formType === "signUp") {
      if (!nameSchema.safeParse(form.firstName).success) {
        invalidFields.push("First name");
      }

      if (!nameSchema.safeParse(form.lastName).success) {
        invalidFields.push("Last name");
      }
    }

    if (!emailSchema.safeParse(form.email).success) {
      invalidFields.push("Email");
    }

    if (!passwordSchema.safeParse(form.password).success) {
      invalidFields.push("Password");
    }

    return invalidFields;
  };

  const submitForm = (ev: FormEvent) => {
    ev.preventDefault();
    const invalidFields = validateForm();
    if (invalidFields.length > 0) {
      toast.error(`Invalid form please check ${invalidFields.join(", ")}`);
      return;
    }
    const submittedForm =
      formType === "signIn"
        ? { email: form.email, password: form.password }
        : form;
    console.log(submittedForm);
  };

  return (
    <MainContainer>
      <div className="flex h-screen w-full items-center justify-center">
        <form
          className="flex w-full max-w-[600px] flex-col gap-4"
          onSubmit={submitForm}
        >
          {formType === "signUp" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TextInput
                text={form.firstName}
                setText={setForm}
                placeholder="First name"
                inputKey="firstName"
                schema={nameSchema}
                errorMsg="First name must be least 2 characters"
              />
              <TextInput
                text={form.lastName}
                setText={setForm}
                placeholder="Last name"
                inputKey="lastName"
                schema={nameSchema}
                errorMsg="Last name must be least 2 characters"
              />
            </div>
          )}
          <TextInput
            text={form.email}
            setText={setForm}
            placeholder="Email"
            inputKey="email"
            schema={emailSchema}
            errorMsg="Invalid email"
          />
          <PasswordInput
            password={form.password}
            setPassword={setForm}
            placeholder="Password"
            schema={passwordSchema}
            errorMsg={`Password must be as least ${passwordLength} characters`}
          />
          <SubmitBtnGreen
            text={formType === "signIn" ? "Sign in" : "Sign up"}
          />
          <div className="text-center">
            {formType === "signIn" ? (
              <span className="text-xs text-black dark:text-zinc-400">
                Don't have an account?{" "}
                <a
                  className="cursor-pointer underline transition-all duration-200 hover:brightness-150"
                  onClick={() => setFormType("signUp")}
                >
                  Sing up here.
                </a>
              </span>
            ) : (
              <span className="text-xs text-black dark:text-zinc-400">
                Already have an account?{" "}
                <a
                  className="cursor-pointer underline transition-all duration-200 hover:brightness-150"
                  onClick={() => setFormType("signIn")}
                >
                  Sign in here.
                </a>
              </span>
            )}
          </div>
        </form>
      </div>
    </MainContainer>
  );
}
