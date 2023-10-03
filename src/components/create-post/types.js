import PropTypes from "prop-types";

/**
 * A Post created by a end-user.
 * @typedef  {Object} Post
 * @property {Number} id - an ID.
 * @property {string} title - summary of the post.
 * @property {string} body - article of the post.
 * @property {string} userId - The end-user who made the post.
 * @property {string[]} tags - General tags associated with the post.
 * @property {Number} reactions - The number of reactions to the post.
 */

export const PostShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  reactions: PropTypes.number,
  userId: PropTypes.number,
  authorName: PropTypes.string,
  imageUrl: PropTypes.string,
  handleOnDelete: PropTypes.func,
  handleOnEdit: PropTypes.func,
};
