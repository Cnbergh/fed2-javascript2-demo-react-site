export default function CreatePostForm() {
  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const { title, userId } = form.elements;

    const newPost = {
      title: title.value,
      userId: userId.value,
    };

    console.log("newPost", newPost);

    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });

    const json = await response.json();

    console.log("data from server using async/await", json);
  }

  return (
    // Create a form that has a title, body, and authorName input fields.
    <form className="space-y-6" onSubmit={handleOnSubmit}>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-black"
        >
          title
        </label>
        <div className="mt-2">
          <input
            id="title"
            name="title"
            required
            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="userId"
            className="block text-sm font-medium leading-6 text-black"
          >
            User Id
          </label>
        </div>
        <div className="mt-2">
          <input
            id="userId"
            name="userId"
            required
            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
