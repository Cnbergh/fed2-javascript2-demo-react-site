/** @module PostsUI component */
import PropTypes from "prop-types";

import PostItem from "./PostItem";
// import PostItem from "./_PostItem";
import Skeleton from "./Skeleton";
import Error from "./Error";
import { PostShape } from "./types";
import CreatePostForm from "../create-post";

/**
 * @typedef {import('./types.js').Post} Post
 */

/**
 * displays a list of Posts
 * @param {Object} params The list of Posts to display
 * @param {Post[]} params.posts The list of Posts to display
 * @see module:PostsHOC Parent Component
 */
export default function PostsUI({
  posts = [],
  isLoading = true,
  error = null,
  onDeleteItem = () => console.warn("Delete item"),
  onEditItem = () => console.warn("Edit item"),
}) {
  return (
    <article className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h4 className="text-2xl font-bold tracking-tight text-gray-900">
          List of Posts from Noroff API
        </h4>

        <CreatePostForm />

        {error && <Error>{error?.message}</Error>}

        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {isLoading ? (
            <Skeleton />
          ) : (
            posts.map(({ id, body, title, _count, media, created, author }) => (
              <PostItem
                key={id}
                id={id}
                body={body}
                title={title}
                authorName={author?.name}
                imageUrl={media}
                createdAt={created}
                reactions={_count?.reactions}
                handleOnDelete={() => onDeleteItem(id)}
                handleOnEdit={(event, setIsEditing) =>
                  onEditItem(event, setIsEditing)
                }
              />
            ))
          )}
        </div>
      </div>
    </article>
  );
}

PostsUI.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  posts: PropTypes.arrayOf(PropTypes.shape(PostShape)),
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
};
