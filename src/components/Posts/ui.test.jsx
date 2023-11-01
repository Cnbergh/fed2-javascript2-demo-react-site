import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import UI from "./ui";

describe("Unit | Component | Posts UI", () => {
  beforeEach(() => {
    render(
      <UI
        people={[
          {
            email: "demouser@mail.com",
            username: "demouser",
            image: "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
          },
        ]}
      />,
    );
  });

  it("Displays author's email", async () => {
    const useremail = await screen.findByText("demouser@mail.com");
    expect(useremail).toBeInTheDocument();
  });

  it("Displays author's username", async () => {
    const username = await screen.findByText("demouser");
    expect(username).toBeInTheDocument();
  });
});
