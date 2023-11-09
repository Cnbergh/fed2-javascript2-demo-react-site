import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { renderWithUser } from "../../lib/utils";

import Component from "./index";

describe("Intergration | Component | Navbar", () => {
  // assign the spy instance to a const
  const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");

  const MOCK_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

  afterEach(() => {
    localStorage.clear();
    // clear call history
    // getItemSpy.mockClear();
    removeItemSpy.mockClear();
  });

  // FIXME: This test is failing
  describe("Sign out", () => {
    // INFO: (This will require you to mock the localstorage API)

    it.skip("The logout function clears the token from browser storage.", async () => {
      localStorage.setItem("access_token", JSON.stringify(MOCK_ACCESS_TOKEN));
      // We render the component with React Query's QueryClientProvider because the Posts component uses useQuery hook
      const { user } = renderWithUser(<Component />);

      const settingsBtn = await screen.getByTestId("settings-menu");
      await user.click(settingsBtn);

      const signOutBtn = await screen.queryByText("Sign out");
      await user.click(signOutBtn);

      expect(removeItemSpy).toHaveBeenCalledWith("access_token");
    });
  });
});
