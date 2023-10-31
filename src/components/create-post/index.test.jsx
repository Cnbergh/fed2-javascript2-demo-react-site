import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CreatePostForm from "./index";

describe("Create Post", () => {
  let originalFetch;

  beforeEach(async () => {
    originalFetch = global.fetch;
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              userId: 1,
              id: 1,
              title: "Kaliteye hoşgeldiniz",
              completed: false,
            },
          ]),
      }),
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fills in form", async () => {
    render(<CreatePostForm />);
    const h3 = await screen.getByText("Create a new post");
    expect(h3).toBeInTheDocument();

    // Asset that the input field is in the document
    expect(screen.getByLabelText("title")).toBeInTheDocument();
    // Emulate user typing "Demo Post" into the input field
    fireEvent.change(screen.getByLabelText("title", { exact: false }), {
      target: { value: "Demo Post" },
    });
    // Check if the input value is set to "Demo Post"
    expect(screen.getByLabelText("title").value).toBe("Demo Post");
    expect(screen.getByLabelText("User Id")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Create Post/i));
  });
});
