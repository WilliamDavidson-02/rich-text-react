import { render, screen } from "@testing-library/react";
import Avatar from "../components/Avatar";

describe("Avatar component", () => {
  test("uses the url prop", () => {
    render(<Avatar url="https://this-is-a-test/image" />);
    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("src", "https://this-is-a-test/image");
  });

  test("uses the default profile img if url prop is empty string", () => {
    render(<Avatar url="" />);
    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("src", "/rich-text-logo.jpg");
  });

  test("src uses default image if invalid url", () => {
    render(<Avatar url="This is not a url" />);
    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("src", "/rich-text-logo.jpg");
  });
});
