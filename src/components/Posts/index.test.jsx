import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from "vitest";
import { screen } from "@testing-library/react";
import { renderWithUser } from "../../lib/utils";
import server from "../../lib/msw/server";

import Component from "./index";

describe("Posts", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

  beforeEach(async () => {
    renderWithUser(<Component />);
  });

  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers());

  //  Close server after all tests
  afterAll(() => server.close());

  it("Displays author's username", async () => {
    const username = await screen.findByText("atuny0");
    expect(username).toBeInTheDocument();
  });

  it("Displays author's email", async () => {
    const username = await screen.findByText("atuny0@sohu.com");
    expect(username).toBeInTheDocument();
  });
});
