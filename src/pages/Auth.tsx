import { FormEvent, useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import SubmitBtnGreen from "../components/SubmitBtnGreen";
import { z } from "zod";
import { toast } from "sonner";
import GreenGlowContainer from "../components/GreenGlowContainer";
import supabase, { AuthProviders } from "../supabase/supabaseClient";
import { LoadingSm } from "../components/Loading";
import { useNavigate } from "react-router-dom";

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
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState<AuthProviders | "email" | "">("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(validateForm(form).length === 0);
  }, [form]);

  function validateForm(form: formType): string[] {
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
  }

  const formatFullName = (firstName: string, lastName: string) => {
    const nameArray: string[] = [firstName, lastName];

    nameArray.map((name) => {
      const splitName = name.split("");
      splitName[0].toUpperCase();
      return splitName.join();
    });

    return nameArray.join(" ");
  };

  const submitForm = async (ev: FormEvent) => {
    ev.preventDefault();
    if (validateForm(form).length > 0) return;

    setIsLoading("email");

    const { email, password, firstName, lastName } = form;

    const { error } =
      formType === "signIn"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: formatFullName(firstName.trim(), lastName.trim()),
                avatar_url: "",
              },
            },
          });

    if (error) {
      toast.error(error.message);
      setIsLoading("");
      return;
    }

    navigate("/");
  };

  const submitWithAuthProvider = async (providerType: AuthProviders) => {
    setIsLoading(providerType);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: providerType,
    });

    if (error) {
      toast.error(
        `Error while signing in with ${providerType}, please try again`,
      );
      setIsLoading("");
      return;
    }
  };

  return (
    <MainContainer>
      <div className="flex h-screen w-full items-center justify-center">
        <form
          className="flex w-full max-w-[600px] flex-col gap-4"
          onSubmit={submitForm}
        >
          <div className="flex gap-4">
            <GreenGlowContainer
              onClick={() => submitWithAuthProvider("github")}
            >
              {isLoading === "github" ? (
                <LoadingSm />
              ) : (
                <img className="h-6" src="/github_icon.svg" alt="github" />
              )}
            </GreenGlowContainer>
            <GreenGlowContainer
              onClick={() => submitWithAuthProvider("discord")}
            >
              {isLoading === "discord" ? (
                <LoadingSm />
              ) : (
                <img className="h-6" src="/discord_icon.svg" alt="discord" />
              )}
            </GreenGlowContainer>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-grow bg-zinc-600" />
            <div className="text-zinc-600">or</div>
            <div className="h-[1px] flex-grow bg-zinc-600" />
          </div>
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
            isActive={false}
            type="submit"
            isDisabled={!isFormValid}
          >
            {isLoading === "email" ? (
              <LoadingSm />
            ) : (
              <span>{formType === "signIn" ? "Sign in" : "Sign up"}</span>
            )}
          </SubmitBtnGreen>
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
