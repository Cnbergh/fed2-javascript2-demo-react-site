/** @module productsUI component */
import PropTypes from "prop-types";

/**
 * @typedef {import('./index.jsx').Product} Product
 */

/**
 * displays a post
 * @param {Product} params The post to display
 */
export default function PostItem({
  id = "no id",
  body = "no description",
  reactions = 0,
  title = "no title",
  authorName = "no author",
}) {
  return (
    <div key={id} className="relative group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80"></div>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={`/products/${id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">Person {authorName}</p>
          <p className="mt-1 text-sm text-gray-500">{body}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{reactions}</p>
      </div>
    </div>
  );
}

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  reactions: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
};
