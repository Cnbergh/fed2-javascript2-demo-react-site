import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CreatePostForm from "./index";

describe("Intergration | HOC | Create Post", () => {
  it("fills in form", async () => {
    render(<CreatePostForm />);
    const h3 = await screen.getByText("Create a new post");
    expect(h3).toBeInTheDocument();

    const inputTitle = await screen.getByLabelText("title");

    // Asset that the input field is in the document
    expect(inputTitle).toBeInTheDocument();
    expect(inputTitle.value).toBe("");
    // Emulate user typing "Demo Post" into the input field
    fireEvent.change(inputTitle, {
      target: { value: "Demo Post" },
    });
    // Check if the input value is set to "Demo Post"
    expect(inputTitle.value).toBe("Demo Post");
    expect(screen.getByLabelText("User Id")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Create Post/i));
  });
});
