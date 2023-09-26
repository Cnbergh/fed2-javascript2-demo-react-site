import { useEffect, useState } from "react";
import ProductUI from "../products/ui"


export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("https://dummyjson.com/products");
                const result = await res.json();
                console.log("json", result);
                setProducts(result.products);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (error) {
        return <span>Error: {error?.message}...</span>;
    }


    return (
        <article className="bg-white">
            <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h4 className="text-2xl font-bold tracking-tight text-gray-900">
                    list of Products
                </h4>

                <ProductUI products={products}></ProductUI>

            </div>
        </article>
    );
}
