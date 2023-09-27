/** @module CartsUI component */
import PropTypes from "prop-types";

/**
 * @typedef {import('./index.jsx').Cart} Cart
 */

/**
 * displays a list of carts. it requires {@link module:CartsHOC}
 * @param {Object} props react params
 * @param {Cart[]} props.carts The list of carts to display
 */
export default function CartsUI({ carts = [] }) {
  return (
    <article className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h4 className="text-2xl font-bold tracking-tight text-gray-900">
          list of carts
        </h4>

        <ul role="list" className="divide-y divide-gray-100">
          {carts.map((cart) => (
            <li key={cart.id} className="flex justify-between py-5 gap-x-6">
              <div className="flex min-w-0 gap-x-4">
                <div className="flex-auto min-w-0">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Total: {cart.discountedTotal}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    Discount: {cart.total - cart.discountedTotal}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{cart.userId}</p>

                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none p-1 rounded-full bg-emerald-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">
                    Qauntity: {cart.totalQuantity}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

CartsUI.propTypes = {
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};
