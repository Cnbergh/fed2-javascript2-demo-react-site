import { useAllUsers } from "../../lib/my-api";
import PostsUI from "./ui";

function Posts() {
  const { status, error, data } = useAllUsers();
  const isLoading = status === "loading...";

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return <PostsUI people={data?.users} />;
}

export default Posts;
