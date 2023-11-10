import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryTestClient = new QueryClient({
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

export const queryWrapper = ({ children }) => (
  <QueryClientProvider client={queryTestClient}>{children}</QueryClientProvider>
);
