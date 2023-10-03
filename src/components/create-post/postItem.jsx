/** @module PostItemUI component */

import { useState } from "react";
import { PostShape } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * @typedef {import('./types.js').Post} Post
 */

/**
 * displays a post
 * @param {Post} params The post to display
 */
export default function PostItem({
    id = "no id",
    body = "no description",
    reactions = 0,
    title = "no title",
    authorName = "no author",
    imageUrl = "https://avatar.iran.liara.run/public",
    handleOnDelete = () => console.warn("Delete item"),
    handleOnEdit = () => console.warn("Edit item"),
}) {
    const [isEditing, setIsEditing] = useState(false);
    // NOTE: THis is how you would delete a post inside of a component
    // eslint-disable-next-line no-unused-vars
    async function _handleDelete(postId) {
        const res = await fetch(`${API_URL}/posts/${postId}`, {
            method: "DELETE",
        });

        const data = await res.json();
        console.log("Post was successfully deleted", data);
    }

    // NOTE: THis is how you would delete a post inside of a component BUT we should avoid writing logic in UI components
    // eslint-disable-next-line no-unused-vars
    async function _editPost(event) {
        event.preventDefault();

        const { postEditBody } = event.target.elements;

        const newPost = {
            title: title,
            userId: id,
            body: postEditBody.value,
            id: id,
        };

        try {
            const response = await fetch(`${API_URL}/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify(newPost),
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
        <div key={id} className="relative group">
            <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={imageUrl}
                    className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                    alt={title}
                />
            </div>
            <div className="flex justify-between mt-4">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={`/posts/${id}`}>{title}</a>
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">Person {authorName}</p>

                    {isEditing ? (

                        <form onSubmit={(event) => handleOnEdit(event, setIsEditing)}>
                            <input value={id} type="hidden" name="postId" />
                            <label
                                htmlFor="postEditBody"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Edit your post
                            </label>

                            <textarea
                                id="postEditBody"
                                name="postEditBody"
                                rows="4"
                                cols="50"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={body}
                            />

                            <button
                                type="submit"
                                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-2"
                            >
                                Update
                            </button>
                        </form>
                    ) : (
                        <p className="mt-1 text-sm text-gray-500">{body}</p>
                    )}
                    <button
                        onClick={handleOnDelete}
                        className="px-2 py-1 mb-2 mr-2 text-xs font-medium text-center text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setIsEditing((prev) => !prev)}
                        className="px-2 py-1 mb-2 mr-2 text-xs font-medium text-center text-white bg-orange-700 rounded-full hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900"
                    >
                        Edit
                    </button>
                </div>
                <p className="text-sm font-medium text-gray-900">{reactions}</p>
            </div>
        </div>
    );
}

PostItem.propTypes = PostShape;
