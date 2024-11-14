import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/Products/ProductCard.tsx';
import SearchComponent from '../../components/Search-category/SearchComponent.tsx';
import { useCart } from '../../context/CartContext.tsx';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const json: Product[] = await response.json();
        setProducts(json);
        setFilteredProducts(json);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const getProductQuantity = (id: number) => {
    const item = cartItems.find(cartItem => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>

      <br /><br /><br />
      <SearchComponent onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
      <br /><br /><br />
      <div className="flex flex-wrap justify-center items-center min-h-screen p-4 mx-10">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
            <ProductCard
              image={product.image}
              description={product.description}
              title={product.title}
              category={product.category}
              price={product.price}
              quantity={getProductQuantity(product.id)}
              onAddToCart={() => addToCart({ ...product, quantity: 1 })}
              onIncreaseQuantity={() => addToCart({ ...product, quantity: +1 })}
              onDecreaseQuantity={() => addToCart({ ...product, quantity: -1 })}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;