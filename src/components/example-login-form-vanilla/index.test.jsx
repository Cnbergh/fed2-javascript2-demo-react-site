import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithUser } from "../../lib/utils";

import Component from "./index";

describe("Intergration | Component | Login", () => {
  // assign the spy instance to a const
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

  let originalFetch;
  const MOCK_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

  beforeAll(() => {
    vi.mock("next/router", () => require("next-router-mock"));
  });

  beforeEach(() => {
    originalFetch = global.fetch;
    // We mock the fetch function to always return the same data (stubUsers)
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        statusText: "OK",
        ok: true,
        json: () =>
          Promise.resolve({
            name: "my_username",
            email: "first.last@stud.noroff.no",
            avatar: "https://img.service.com/avatar.jpg",
            accessToken: MOCK_ACCESS_TOKEN,
          }),
      }),
    );
  });

  // const getItemSpy = vi.spyOn(localStorage, 'getItem')

  afterEach(() => {
    localStorage.clear();
    // clear call history
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    // After each test, we restore the original fetch function
    global.fetch = originalFetch;
  });

  describe("Login", () => {
    // INFO: (This will require you to mock the localstorage API).

    const TEST_EMAIL = "first.last@stud.noroff.no";
    const TEST_PASSWORD = "UzI1NiIsInR5cCI";

    it("Displays the correct button", async () => {
      // We render the component with React Query's QueryClientProvider because the Posts component uses useQuery hook
      renderWithUser(<Component />);

      const button = await screen.findByText("Sign in");
      expect(button).toBeInTheDocument();
    });

    it("The login function fetches and stores a token in browser storage", async () => {
      // We render the component with React Query's QueryClientProvider because the Posts component uses useQuery hook
      const { user } = renderWithUser(<Component />);

      // Fill in the form
      const emailInput = await screen.findByLabelText("Email address");
      const passwordInput = await screen.findByLabelText("Password");
      await user.type(emailInput, TEST_EMAIL);
      await user.type(passwordInput, TEST_PASSWORD);

      const signBtn = await screen.getByRole("button", { name: /Sign in/i });
      await user.click(signBtn);

      waitFor(() => {
        const successMessage = screen.queryByText(
          "👋 Hi my_username. You will now redirect to the home page!",
        );
        expect(successMessage).toBeInTheDocument();

        // Assert that setItemSpy has been called with the correct key ("access_token")
        expect(setItemSpy).toHaveBeenCalledWith(
          "access_token",
          MOCK_ACCESS_TOKEN,
        );
      });
    });
  });
});
