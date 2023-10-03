import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

const BASE_URL = "https://dummyjson.com";

export async function fetchAllPosts() {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export function useAllPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchAllPosts(),
  });
}

export async function fetchUsersPosts(id) {
  try {
    const response = await axios.get(`${BASE_URL}/posts/user/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export function useUsersPosts(userId) {
  return useQuery({
    queryKey: ["usersPosts", userId],
    queryFn: () => fetchUsersPosts(userId),
    enabled: !!userId,
  });
}

export async function fetchUser(id) {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export function useUser(userId) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });
}

export async function fetchAllUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export function useAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchAllUsers(),
  });
}

export async function login({ username, password }) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export function useLogin(username, password) {
  return useMutation({
    mutationFn: () => login(username, password),
  });
}

export const fetchThings = async (url) => {
  try {
    // NOTE: We are using axios instead of fetch
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.warn("err", error);
    // NOTE: We are throwing the error so that we can catch it in the catch block below
    throw error;
  }
};

const NOROFF_API_URL = import.meta.env.VITE_NOROFF_API_URL;

/**
 * Helper function to add the
 * @param {Object} options - HTTP header options
 * @returns {Object} - HTTP header options with Authorization header
 */
function updateOptions(options) {
  const update = { ...options };

  if (localStorage.getItem("access_token")) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
  }

  return update;
}

/**
 * Wrapper around fetch to add Authorization header
 * @returns {Promise} - fetch promise
 */
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}

/**
 * Fetch all posts with comments, reactions and the author
 * @returns {Object | Error} - A list of posts
 */
export async function fetchNoroffPosts() {
  const url = new URL(`${NOROFF_API_URL}/posts`);

  url.searchParams.append("_author", "true");
  url.searchParams.append("_comments", "true");
  url.searchParams.append("_reactions", "true");

  try {
    const response = await fetcher(url.href);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
