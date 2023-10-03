import React from "react";

/**
 * Fallback component for loading state.
 */
export default function Error({ children }) {
  return (
    <dialog
      open
      className="relative mx-auto overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
    >
      <section className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
            <span className="w-6 h-6 text-red-600" aria-hidden="true">
              ⛔
            </span>
          </div>

          <article className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Something went wrong!
            </h3>

            <div className="mt-2">
              <p className="text-sm text-gray-500">{children}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
        <a
          type="button"
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          href="/"
        >
          Try again
        </a>
      </section>
    </dialog>
  );
}

Error.propTypes = {
  children: React.Children,
};
