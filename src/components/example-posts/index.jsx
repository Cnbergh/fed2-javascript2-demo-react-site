/** @module productsHOC component */

import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import { useAllUsers } from "../../lib/my-api";
import PostUI from "./ui";

const API_URL = import.meta.env.API_URL;

/**
 * A Post created by a end-user.
 * @typedef  {object} Post
 * @property {string} id - an ID.
 * @property {string} title - summary of the post.
 * @property {string} userId - The end-user who made the post.
 * @property {string[]} tags - General tags associated with the post.
 * @property {Number} reactions - The number of reactions to the post.
 */

/**
 * This is a higher-order component that fetches the list of posts and displays them.
 * @returns {object} the list of posts to display
 * @requires module:PostUI
 */
export default function Posts() {
  /** @type {[Post[], React.Dispatch<Data>]} */
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isLoadingCool, errorCool, dataCool } = useQuery(["foo"], () =>
    fetch(`${API_URL}/posts`).then((res) => res.json()),
  );

  console.log("isLoadingCool", isLoadingCool);
  console.log("errorCool", errorCool);
  console.log("dataCool", dataCool);

  useEffect(() => {
    const fetchThings = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.warn("err", error);
        throw error;
      }
    };

    const fetchAllData = async () => {
      setIsLoading(true);

      try {
        // const allPostsJson = await fetchThings("https://dummyjson.com/posts");
        // const allUsersJson = await fetchThings("https://dummyjson.com/users");
        const allData = await Promise.all([
          fetchThings(`${API_URL}/posts`),
          fetchThings(`${API_URL}/users`),
        ]);

        const allUsers = allData[1];
        const allPosts = allData[0];

        const postsWithUsers = allPosts.map((post) => {
          const foundUser = allUsers.find((user) => user.id === post.userId);
          return {
            ...post,
            authorName: `${foundUser?.firstName} ${foundUser?.lastName}`,
          };
        });

        setData(postsWithUsers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return <PostUI error={error} isLoading={isLoading} posts={data} />;
}
