import { expect, describe, it, beforeAll, afterAll, afterEach } from "vitest";
import server from "./msw/server";
import { renderHook, waitFor } from "@testing-library/react";

import mockPosts from "./fakedb/posts.json";
import mockNoroffPosts from "./fakedb/noroffPosts.json";
import { queryWrapper as wrapper } from "./testing/helpers";
import { fetchAllPosts, useAllPosts, fetchNoroffPosts } from "./my-api";

describe("Unit | My API >>>", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

  // Reset handlers after each test `important for test isolation`
  afterEach(() => server.resetHandlers());

  //  Close server after all tests
  afterAll(() => server.close());

  describe("fetchAllPosts", () => {
    // Example: Testing a function
    it("returns posts", async () => {
      const postResult = await fetchAllPosts();

      expect(postResult).toStrictEqual(mockPosts);
    });

    // Example: Testing a react custom hook
    describe("useAllPosts", () => {
      it("returns loading status", async () => {
        const { result } = renderHook(() => useAllPosts(), { wrapper });
        console.log(result.current);

        await waitFor(() => {
          expect(result.current.isSuccess).toBe(false);
          expect(result.current.isLoading).toBe(true);
          expect(result.current.status).toBe("loading");
        });
      });

      it("returns error", async () => {
        const { result } = renderHook(() => useAllPosts(), { wrapper });

        await waitFor(() => {
          expect(result.current.error).toBe(null);
        });
      });

      it("returns data", async () => {
        const { result } = renderHook(() => useAllPosts(), { wrapper });

        await waitFor(() => {
          expect(result.current.data).toStrictEqual(mockPosts);
        });
      });
    });

    describe("fetchNoroffPosts", () => {
      it("returns a list of posts", async () => {
        const results = await fetchNoroffPosts();

        expect(results).toStrictEqual(mockNoroffPosts);
      });
    });
  });
});
