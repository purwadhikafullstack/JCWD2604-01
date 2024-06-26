'use client';
import { useState, useEffect } from 'react';
import { axiosInstance, axiosInstanceSSR } from '@/axios/axios';
import Image from 'next/image';

function ProductDetailImage({ params }) {
  const { productId } = params;
  const [product, setProduct] = useState(null);
  const fetchProduct = () => {
    axiosInstance()
      .get('/products/' + productId)
      .then((response) => setProduct(response.data.result))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  console.log(product);

  const [image, setImage] = useState('');
  useEffect(() => {
    if (product) {
      setImage(`/product-image/${product.productPhotos[0].photoURL}`);
    }
  }, [product]);
  console.log(image);

  return (
    <div className="grid sm:bg-transparent lg:bg-orange-200 justify-center rounded-lg">
      <div>
        <Image
          src={image}
          alt="thumbnail"
          width="100"
          height="100"
          className="h-80 w-80 object-cover mt-4"
        />
      </div>
      <div className="flex gap-2 m-0 my-2 lg:mx-2">
        {product &&
          product.productPhotos.map((val, key) => (
            <Image
              key={key}
              src={`/product-image/${val.photoURL}`}
              width="100"
              height="100"
              alt={`${product.name} photo ${key + 1}`}
              className="h-20 w-1/4 object-cover cursor-pointer rounded-md"
              onClick={() => setImage(`/product-image/${val.photoURL}`)}
            />
          ))}
      </div>
    </div>
  );
}
export default ProductDetailImage;
