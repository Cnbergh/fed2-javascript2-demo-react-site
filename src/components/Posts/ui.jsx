import PropTypes from "prop-types";

/**
 *
 * @param {array} people A list of people objects.
 * @returns React UI component that displays a list of people's comments.
 * @example
 * ```jsx
 * <PostsUI people={[{id: 1, name: john, email: john@mail.com}]} />
 * ```
 */
export default function PostsUI({ people = [] }) {
  return (
    <ul role="list" className="divide-y divide-gray-100 bg-white">
      {people.map((person) => (
        <li
          key={person.email}
          className="flex justify-between gap-x-6 py-5 px-3"
        >
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.image}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {person.username}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {person.email}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">
              {person?.company?.title}
            </p>
            {person.birthDate ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen{" "}
                <time dateTime={person.lastSeenDateTime}>
                  {person.birthDate}
                </time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

PostsUI.propTypes = {
  people: PropTypes.array.isRequired,
};
