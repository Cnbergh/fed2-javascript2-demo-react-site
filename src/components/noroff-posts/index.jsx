/** @module productsHOC component */

import { useEffect, useState } from "react";
// import { useAllUsers } from "../../lib/my-api";
import PostUI from "./ui";
import { API_URL } from "../../lib/constants";

/**
 * @typedef {import('./types.js').NoroffPostModel} Post
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
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const accessToken = localStorage.getItem("access_token");
        const url = new URL("https://api.noroff.dev/api/v1/social/posts");
        url.searchParams.append("_author", "true");
        url.searchParams.append("_comments", "true");
        url.searchParams.append("_reactions", "true");

        const res = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();

        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
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
      const response = await fetch(`/social/posts/${formattedPostId}`, {
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
