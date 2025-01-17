import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  category: string;
  price: number;
  description: string;
  onAddToCart: () => void;
  quantity?: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  category,
  price,
  description,
  onAddToCart,
  quantity = 0,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg border min-h-[700px]">
      <img src={image} alt={title} className="w-full h-48 object-contain my-6" />
      <div className="p-4 flex-grow flex flex-col">
        <h5 className="text-lg font-semibold">{title}</h5>
        <p className="mt-2"><strong>Category:</strong> {category}</p>
        <p className="mt-2 flex-grow"><strong>Description:</strong> {description}</p>
        <div className='flex justify-between items-center mt-4'>
          <p className="font-bold text-xl">Price: ${price.toFixed(2)}</p>
          {quantity > 0 ? (
            <div className="flex items-center">
              <button onClick={onDecreaseQuantity} className="bg-red-500 text-white px-2  rounded">-</button>
              <span className="mx-2">{quantity}</span>
              <button onClick={onIncreaseQuantity} className="bg-green-500 text-white px-2 rounded">+</button>
            </div>
          ) : (
            <button
              onClick={onAddToCart}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;