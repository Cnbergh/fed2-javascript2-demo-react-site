/** @module productsHOC component */

import { useEffect, useState } from "react";
import UI from "./ui";
import Skeleton from "./Skeleton";
import { API_URL } from "../../lib/constants";

/**
 * @typedef {import('./types.js').Post} Post
 */

/**
 * This is a higher-order component that fetches the list of posts and displays them.
 * @returns {object} the list of posts to display
 * @requires module:UI
 */
export default function Posts() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialIsEditing =
    searchParams.get("isediting").toLocaleLowerCase() === "true";

  /** @type {[Post, React.Dispatch<Data>]} */
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(initialIsEditing);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf("/") + 1);
        const postRes = await fetch(`${API_URL}/posts/${id}`);
        const postData = await postRes.json();
        const userRes = await fetch(`${API_URL}/users/${postData.userId}`);
        const userData = await userRes.json();

        const data = {
          ...postData,
          authorName: userData.name,
          imageUrl: `https://picsum.photos/seed/${postData.id}/400/300`,
        };

        setPost(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Skeleton />;

  return (
    <UI
      error={error}
      isLoading={isLoading}
      id={post?.id}
      body={post?.body}
      reactions={0}
      title={post?.title}
      authorName={post?.authorName}
      imageUrl={post?.imageUrl}
      isEditing={isEditing}
      onToggleEdit={setIsEditing}
      handleOnDelete={() => console.warn("Delete item")}
      handleOnEdit={() => console.warn("Edit item")}
    />
  );
}
