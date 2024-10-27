import { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  const fetchProducts = async (page) => {
    const skip = (page - 1) * itemsPerPage;
    await fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`)
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const goToNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const goToPrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className='flex flex-col items-center pt-10 border-t'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {products.map((item) => (
          <ProductItem key={item.id} id={item.id} image={item.images} name={item.title} price={item.price} />
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center mt-8 space-x-4'>
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50'
        >
          Previous
        </button>
        <span className='font-semibold text-lg'>Page {currentPage}</span>
        <button
          onClick={goToNextPage}
          className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

