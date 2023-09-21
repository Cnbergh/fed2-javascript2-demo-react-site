import PropTypes from "prop-types";

/**
 * Display a list of products
 * @param {Object} props
 * @param {object[]} props.products - The list of products to display
 *
 */
export default function ProductsUI({ products = [] }) {
  return (
    <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map(({ id, thumbnail, description, title, price }) => (
        <div key={id} className="relative group">
          <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={thumbnail}
              alt={description}
              className="object-cover object-center w-full h-full lg:h-full lg:w-full"
            />
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={`/products/${id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {title}
                </a>
              </h3>
            </div>
            <p className="text-sm font-medium text-gray-900">{price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

ProductsUI.propTypes = {
  products: PropTypes.array,
};
