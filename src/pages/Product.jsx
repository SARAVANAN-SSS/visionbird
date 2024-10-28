import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProductData = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setImage(data.images[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching the product data, please check the API response", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData(productId);
  }, [productId]);

  if (loading) {
    return (
      <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {/* Shimmer UI for images */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div className='bg-gray-200 h-24 w-[24%] sm:w-full sm:mb-3 flex-shrink-0 rounded-md animate-pulse' key={index}></div>
              ))}
            </div>
            <div className='w-full sm:w-[80%]'>
              {/* Shimmer UI for main image */}
              <div className='bg-gray-200 h-80 w-full rounded-md animate-pulse'></div>
            </div>
          </div>

          {/* Shimmer UI for Product Info */}
          <div className='flex-1'>
            <div className='bg-gray-200 h-8 w-3/4 rounded-md animate-pulse mt-2'></div>
            <div className='bg-gray-200 h-6 w-1/2 rounded-md animate-pulse mt-5'></div>
            <div className='bg-gray-200 h-4 w-1/3 rounded-md animate-pulse mt-5'></div>
            <div className='bg-gray-200 h-4 w-1/3 rounded-md animate-pulse mt-5'></div>
            <div className='bg-gray-200 h-4 w-1/3 rounded-md animate-pulse mt-5'></div>
            <div className='bg-gray-200 h-4 w-1/3 rounded-md animate-pulse mt-5'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {product?.images?.map((item, index) => (
              <img
                loading='lazy'
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=''
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img loading='lazy' src={image} alt='' />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{product.title}</h1>
          <p className='mt-5 text-3xl font-medium'>{`₹ ${product.price}`}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
          <p className='mt-5 md:w-4/5'>Brand: {product.brand}</p>
          <p className='mt-5 md:w-4/5'>Category: {product.category}</p>
          <p className='mt-5 md:w-4/5'>Rating: {product.rating}</p>
          <p className='mt-5 md:w-4/5'>Discount Percentage: {product.discountPercentage}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
