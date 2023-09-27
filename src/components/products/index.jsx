import { useEffect, useState } from "react";

import Skeleton from "./skeleton";
import ProductList from "./ui";

/**
 * Displays List of products from the server.
 */
export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const json = await response.json();
        setProducts(json.products);
      } catch (error) {
        console.warn("err", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>

        <ProductList products={products} />
      </div>
    </div>
  );
}
