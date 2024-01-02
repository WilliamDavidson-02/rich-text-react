import { fireEvent, render, screen } from "@testing-library/react";
import TextInput from "../components/TextInput";
import { z } from "zod";
import { useState } from "react";
import { formType } from "../pages/Auth";
import { toast } from "sonner";

const errorMsg = "First name must be least 2 characters";

const Input = () => {
  const schema = z.string().min(2);
  const [form, setForm] = useState<formType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <TextInput
      text={form.firstName}
      setText={setForm}
      placeholder="First name"
      inputKey="firstName"
      schema={schema}
      errorMsg={errorMsg}
    />
  );
};

const Email = () => {
  const schema = z.string().email();
  const [form, setForm] = useState<formType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <TextInput
      text={form.email}
      setText={setForm}
      placeholder="Email"
      inputKey="email"
      schema={schema}
      errorMsg={"Invalid email"}
    />
  );
};

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("Text input component", () => {
  test("insert a valid input", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "John" } });
    fireEvent.blur(input); // trigger validation function

    expect(toast.error).not.toHaveBeenCalledWith(errorMsg);
  });

  test("shows error when input value is less than 2 characters", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "J" } });
    fireEvent.blur(input); // trigger validation function

    expect(toast.error).toHaveBeenCalledWith(errorMsg);
  });

  test("input valid email", () => {
    render(<Email />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test.component@email.com" } });
    fireEvent.blur(input); // trigger validation function

    expect(toast.error).not.toHaveBeenCalledWith("Invalid email");
  });

  test("input invalid email", () => {
    render(<Email />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "thisIsNotAValidEmail" } });
    fireEvent.blur(input); // trigger validation function

    expect(toast.error).toHaveBeenCalledWith("Invalid email");
  });
});
