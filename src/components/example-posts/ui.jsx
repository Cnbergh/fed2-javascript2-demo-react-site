/** @module PostsUI component */
import PropTypes from "prop-types";

import PostItem from "./PostItem";
import Skeleton from "./Skeleton";
import Error from "./Error";
import CreatePostForm from "../create-post";

/**
 * @typedef {import('./index.jsx').Product} Product
 */

/**
 * displays a list of Posts
 * @param {Object} params The list of Posts to display
 * @param {Product[]} params.Posts The list of Posts to display
 * @see module:PostsHOC Parent Component
 */
export default function PostsUI({
  posts = [],
  isLoading = true,
  error = null,
}) {
  return (
    <article className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h4 className="text-2xl font-bold tracking-tight text-gray-900">
          List of Posts
        </h4>
        <CreatePostForm />

        {error && <Error>{error?.message}</Error>}

        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {isLoading ? (
            <Skeleton />
          ) : (
            posts.map(({ id, reactions, body, title, authorName }) => (
              <PostItem
                key={id}
                id={id}
                body={body}
                reactions={reactions}
                title={title}
                authorName={authorName}
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
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};
