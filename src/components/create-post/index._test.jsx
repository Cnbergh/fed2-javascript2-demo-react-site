import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CreatePostForm from "./index";

describe("Movies", () => {
  it("should render the the list of movies", () => {
    /**... */
    const { getByTestId } = render(<CreatePostForm />);
    expect(getByTestId("creat-post-form").children.length).toBeVisible();
  });
});
