import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import mockPosts from "../fakedb/posts.json";
import mockNoroffPosts from "../fakedb/noroffPosts.json";
import mockDummyUsers from "../fakedb/dummyUsers.json";
import { NOROFF_API_URL } from "../constants";

const BASE_URL = "https://dummyjson.com";

const restHandlers = [
  http.get(`${BASE_URL}/posts`, () => {
    return HttpResponse.json(mockPosts);
  }),

  http.get(`${BASE_URL}/posts`, () => {
    return HttpResponse.json(mockPosts);
  }),

  http.get(`${NOROFF_API_URL}/posts`, () => {
    return HttpResponse.json(mockNoroffPosts);
  }),

  http.get(`${BASE_URL}/users`, () => {
    return HttpResponse.json(mockDummyUsers);
  }),
];

const server = setupServer(...restHandlers);

server.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});

export default server;
