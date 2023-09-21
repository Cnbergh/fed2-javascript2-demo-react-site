/** @module productsUI component */
import PropTypes from "prop-types";

import ProductItem from "./ProductItem";
import Skeleton from "./Skeleton";
import Error from "./Error";

/**
 * @typedef {import('./index.jsx').Product} Product
 */

/**
 * displays a list of products
 * @param {Object} params The list of products to display
 * @param {Product[]} params.products The list of products to display
 * @see module:productsHOC Parent Component
 */
export default function ProductsUI({
  products = [],
  isLoading = true,
  error = null,
}) {
  return (
    <article className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h4 className="text-2xl font-bold tracking-tight text-gray-900">
          List of Products
        </h4>

        {error && <Error>{error?.message}</Error>}

        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {isLoading ? (
            <Skeleton />
          ) : (
            products.map(
              ({ id, thumbnail, description, price, brand, title }) => (
                <ProductItem
                  key={id}
                  id={id}
                  thumbnail={thumbnail}
                  description={description}
                  price={price}
                  brand={brand}
                  title={title}
                />
              ),
            )
          )}
        </div>
      </div>
    </article>
  );
}

ProductsUI.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};
