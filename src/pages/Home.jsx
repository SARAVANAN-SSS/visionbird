import { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const fetchProducts = async (page) => {
    setLoading(true);
    const skip = (page - 1) * itemsPerPage;
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`);
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching the products, please check the API response", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const goToPrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="flex flex-col items-center pt-7 border-t">
      <p className="pb-7 pl-3 pr-3 border-spacing-1">PRODUCTS</p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="animate-pulse border border-gray-300 p-3 overflow-hidden flex flex-col justify-between rounded-md w-full sm:w-44 md:w-52 lg:w-60 h-80">
              {/* Shimmer UI for image */}
              <div className="overflow-hidden h-48 flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 rounded-md"></div>
              </div>
              <div className="pt-3">
                {/* Shimmer UI for name */}
                <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-1"></div>
                {/* Shimmer UI for price */}
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {products.map((item) => (
            <ProductItem key={item.id} id={item.id} image={item.thumbnail} name={item.title} price={item.price} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold text-lg">Page {currentPage}</span>
        <button
          onClick={goToNextPage}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
