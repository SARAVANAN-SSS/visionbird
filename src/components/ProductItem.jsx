import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/products/${id}`}>
      <div className='border border-gray-300 p-3 overflow-hidden flex flex-col justify-between rounded-md
                      w-full sm:w-44 md:w-52 lg:w-60 h-80'>
        <div className='overflow-hidden h-48 flex items-center justify-center'>
          <img loading='lazy' className='hover:scale-110 transition-transform ease-in-out max-h-full' 
               src={image} 
               alt='product-image' />
        </div>
        <div className='pt-3'>
          <p className='pb-1 text-sm'>{name}</p>
          <p className='text-sm font-medium'>{`₹ ${price}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
