import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {

  const {productId} = useParams();

  const [product, setProduct] = useState([])

  const [image, setImage] = useState('')


  const fetchProductData = async (id) => {
    await fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data); 
        setImage(data.images[0]); 
      })
      .catch(error => console.error("Error fetching product data:", error));
  };
  

        useEffect(()=>{

          fetchProductData(productId)
      
        },[productId])

        console.log(product)
      
      
      
        return (
          <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

          <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>

          {
            product?.images?.map((item, index)=>(
              <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            ))
          }

          </div>

          <div className='w-full sm:w-[80%]'>
          <img src={image} alt='' />

          </div>

          </div>

          {/* product info */}

          <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{product.title}</h1>
          <p className='mt-5 text-3xl font-medium'>{`₹ ${product.price}`}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{product.description}</p>
          <p className='mt-5 md:w-4/5'>Brand: {product.brand}</p>
          <p className='mt-5 md:w-4/5'> Category: {product.category}</p>
          <p className='mt-5 md:w-4/5'> Rating: {product.rating}</p>
          <p className='mt-5 md:w-4/5'> Discount Percentage: {product.discountPercentage}</p>

          </div>

          </div>

          </div>
        )
}
  

export default Product




