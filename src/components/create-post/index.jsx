const API_URL = import.meta.env.VITE_API_URL;

export default function CreatePostForm() {
  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const { title, userId } = form.elements;

    const newPost = {
      title: title.value,
      body: title.value,
      userId: userId.value,
    };

    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(newPost),
    });

    const json = await response.json();

    console.warn("data from server using async/await", json);
  }

  return (
    // Create a form that has a title, body, and authorName input fields.
    <form
      className="p-4 py-6 mt-8 space-y-6 rounded shadow bg-zinc-900"
      onSubmit={handleOnSubmit}
      data-testid="creat-post-form"
    >
      <h3>Create a new post</h3>

      <section>
        <div className="flex flex-col gap-1 mt-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-white"
          >
            title
          </label>

          <input
            id="title"
            name="title"
            required
            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </section>

      <div>
        <div className="flex flex-col gap-1 mt-2">
          <label
            htmlFor="userId"
            className="block text-sm font-medium leading-6 text-white"
          >
            User Id
          </label>
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
