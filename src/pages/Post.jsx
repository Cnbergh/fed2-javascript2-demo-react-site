import { useEffect, useState } from "react";

function PostPage() {
  const [postData, setDataPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const searchQuery = window.location.search;
      const url = new URLSearchParams(searchQuery);
      const id = url.get("id");
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      const json = await res.json();
      console.log(json);
      setDataPost(json);
    };

    fetchData();
  }, []);
  return (
    <>
      <h1>A single post</h1>
      <section>
        <h2>{postData?.title}</h2>
      </section>
    </>
  );
}

export default PostPage;
