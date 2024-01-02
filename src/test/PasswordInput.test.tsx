import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { z } from "zod";
import { formType } from "../pages/Auth";
import PasswordInput from "../components/PasswordInput";
import { toast } from "sonner";

const passwordLength = 8;
const errorMsg = `Password must be as least ${passwordLength} characters`;

const Password = () => {
  const passwordSchema = z.string().min(passwordLength);
  const [form, setForm] = useState<formType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <PasswordInput
      password={form.password}
      setPassword={setForm}
      placeholder="Password"
      schema={passwordSchema}
      errorMsg={errorMsg}
    />
  );
};

vi.mock("sonner", () => ({
  toast: { error: vi.fn() },
}));

describe("Password input", () => {
  test("enter a valid password and not show error toast", () => {
    render(<Password />);
    const inputPassword = screen.getByPlaceholderText("Password");
    fireEvent.change(inputPassword, { target: { value: "Password123" } });
    fireEvent.blur(inputPassword);
    expect(toast.error).not.toBeCalledWith(errorMsg);
  });

  test("enter a invalid password and show error toast", () => {
    render(<Password />);
    const inputPassword = screen.getByPlaceholderText("Password");
    fireEvent.change(inputPassword, { target: { value: "123" } });
    fireEvent.blur(inputPassword);
    expect(toast.error).toBeCalledWith(errorMsg);
  });

  test("toggle show password from password -> text -> password", () => {
    render(<Password />);
    const inputPassword = screen.getByPlaceholderText("Password");
    const passwordBtn = screen.getByTestId("sm-btn-hover-container");
    fireEvent.click(passwordBtn);
    expect(inputPassword).toHaveAttribute("type", "text");
    fireEvent.click(passwordBtn);
    expect(inputPassword).toHaveAttribute("type", "password");
  });
});
