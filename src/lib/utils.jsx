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

export const renderWithQuery = (component) => {
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

  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
};

/**
 * Create Tanstack router for testing
 * @deprecated
 * */
export function _createTestRouter(component) {
  const rootRoute = new RootRoute({
    component: Outlet,
  });

  const componentRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component,
  });

  const router = new Router({
    routeTree: rootRoute.addChildren([componentRoute]),
    history: createMemoryHistory(),
  });

  return router;
}

// const _router = createTestRouter(() => <></>);

/**
 * @deprecated
 *  */
export function _renderWithRouter(component) {
  return renderWithQuery(<RouterProvider router={component} />);
}

// setup function
export function renderWithUser(jsx) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...renderWithQuery(jsx),
  };
}
