import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import {
  Router,
  Route,
  RootRoute,
  createMemoryHistory,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const renderWithDeps = (Component) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // INFO: turns retries off
        retry: false,
      },
    },
    /* eslint-disable */
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
    /* eslint-enable */
  });

  const rootRoute = new RootRoute({
    component: Outlet,
  });

  const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => Component,
  });

  const routeTree = rootRoute.addChildren([indexRoute]);

  const router = new Router({ routeTree });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
};

// setup function
export function renderWithUser(jsx) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...renderWithDeps(jsx),
  };
}
