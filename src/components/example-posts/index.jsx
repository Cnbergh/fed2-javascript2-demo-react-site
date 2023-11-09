/** @module productsHOC component */

import { useEffect, useState } from "react";
import axios from "axios";
// import { useAllUsers } from "../../lib/my-api";
import PostUI from "./ui";
import { API_URL } from "../../lib/constants";

// NOTE: This is a helper function that we can use to fetch data from an API
const fetchThings = async (url) => {
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

/**
 * @typedef {import('./types.js').Post} Post
 */

/**
 * This is a higher-order component that fetches the list of posts and displays them.
 * @returns {object} the list of posts to display
 * @requires module:PostUI
 */
export default function Posts() {
  /** @type {[Post[], React.Dispatch<Data>]} */
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);

      try {
        // NOTE: We are using Promise.all to fetch all of our data at once in parallel
        // const allPostsJson = await fetchThings("https://dummyjson.com/posts");
        // const allUsersJson = await fetchThings("https://dummyjson.com/users");
        const allData = await Promise.all([
          fetchThings(`${API_URL}/posts`),
          fetchThings(`${API_URL}/users`),
          fetchThings(`https://picsum.photos/v2/list`),
        ]);

        // NOTE: We are destructuring the array of data into 3 variables
        const [allPosts, allUsers, allImages] = allData;

        /**
         * Create a new array with additional properties that are missing from the API
         * We combine three different API responses into one array of objects
         * */
        const postsWithUsers = allPosts.map((post) => {
          const foundUser = allUsers.find((user) => user.id === post.userId);
          const foundImg = allImages.find(
            (image) => Number(image.id) === post.id,
          );

          return {
            // NOTE: We spread the original post object and add new properties
            ...post,
            authorName: `${foundUser?.username}`,
            imageUrl: foundImg?.download_url,
            authorId: foundUser?.id,
            reactions: Math.floor(Math.random() * 100),
          };
        });

        setPosts(postsWithUsers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  /**
   * Deletes a post
   * @param {number} postId
   */
  async function deletePost(postId) {
    try {
      // NOTE: Stop this function if there is no postId
      if (!postId) {
        throw new Error("postId is required");
      }

      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
      });

      const json = await response.json();

      console.log("deletePost", json);
    } catch (error) {
      console.warn("deletePost error", error);
    }
  }

  /**
   * Updates a post
   * @param {event} event - Form event from post edit form
   * @param {boolean} setIsEditing - component state for showing/hiding the edit form for a post
   */
  async function editPost(event, setIsEditing) {
    event.preventDefault();

    // NOTE: We are using event.target.elements to get the form fields
    const { postEditBody, postId } = event.target.elements;
    // NOTE: We are using Number() to convert the string to a number, later we compare it to a number
    const formattedPostId = Number(postId.value);
    const foundPost = posts.find((post) => post.id === formattedPostId);

    const payload = {
      title: foundPost.title,
      userId: foundPost.userId,
      body: postEditBody.value,
      id: formattedPostId,
    };

    try {
      const response = await fetch(`${API_URL}/posts/${formattedPostId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      console.warn("Success, updated post!", json);
    } catch (error) {
      console.warn("Couldn't update post", error);
    } finally {
      setIsEditing(false);
    }
  }

  return (
    <PostUI
      error={error}
      isLoading={isLoading}
      posts={posts}
      onDeleteItem={deletePost}
      onEditItem={editPost}
    />
  );
}
