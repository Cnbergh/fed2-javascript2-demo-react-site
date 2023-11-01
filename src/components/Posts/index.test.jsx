import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Posts from "./index";

const stubbedUsersResponse = {
  users: [
    {
      id: 1,
      firstName: "Terry",
      lastName: "Medhurst",
      maidenName: "Smitham",
      age: 50,
      gender: "male",
      email: "atuny0@sohu.com",
      phone: "+63 791 675 8914",
      username: "atuny0",
      password: "9uQFF1Lh",
      birthDate: "2000-12-25",
      image: "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
      bloodGroup: "A−",
      height: 189,
      weight: 75.4,
      eyeColor: "Green",
      hair: {
        color: "Black",
        type: "Strands",
      },
      domain: "slashdot.org",
      ip: "117.29.86.254",
      address: {
        address: "1745 T Street Southeast",
        city: "Washington",
        coordinates: {
          lat: 38.867033,
          lng: -76.979235,
        },
        postalCode: "20020",
        state: "DC",
      },
      macAddress: "13:69:BA:56:A3:74",
      university: "Capitol University",
      bank: {
        cardExpire: "06/22",
        cardNumber: "50380955204220685",
        cardType: "maestro",
        currency: "Peso",
        iban: "NO17 0695 2754 967",
      },
      company: {
        address: {
          address: "629 Debbie Drive",
          city: "Nashville",
          coordinates: {
            lat: 36.208114,
            lng: -86.58621199999999,
          },
          postalCode: "37076",
          state: "TN",
        },
        department: "Marketing",
        name: "Blanda-O'Keefe",
        title: "Help Desk Operator",
      },
      ein: "20-9487066",
      ssn: "661-64-2976",
      userAgent: "Mozilla/5.0 ...",
    },
  ],
  total: 100,
  skip: 0,
  limit: 30,
};

describe("Posts", () => {
  let originalFetch;

  beforeEach(async () => {
    // Before each test, we save the original fetch function to restore it later
    originalFetch = global.fetch;
    // We mock the fetch function to always return the same data (stubUsers)
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(stubbedUsersResponse),
      }),
    );

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // ✅ turns retries off
          retry: false,
        },
      },
    });

    // We render the component with React Query's QueryClientProvider because the Posts component uses useQuery hook
    render(
      <QueryClientProvider client={queryClient}>
        <Posts />
      </QueryClientProvider>,
    );
  });

  afterEach(() => {
    // After each test, we restore the original fetch function
    global.fetch = originalFetch;
  });

  it("Displays author's username", async () => {
    const username = await screen.findByText("atuny0");
    expect(username).toBeInTheDocument();
  });

  it("Displays author's email", async () => {
    const username = await screen.findByText("atuny0@sohu.com");
    expect(username).toBeInTheDocument();
  });
});
