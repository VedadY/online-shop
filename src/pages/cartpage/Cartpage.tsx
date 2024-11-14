import React, { useCallback, useMemo } from 'react';
import { useCart } from '../../context/CartContext.tsx';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = React.memo(() => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const navigate = useNavigate();
    
    const totalPrice = useMemo(() => 
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [cartItems]
    );

    const handleIncreaseQuantity = useCallback((itemId: number) => {
        const item = cartItems.find(cartItem => cartItem.id === itemId);
        if (item) {
            addToCart({ ...item, quantity: +1 });
        }
    }, [cartItems, addToCart]);

    const handleDecreaseQuantity = useCallback((itemId: number) => {
        const itemIndex = cartItems.findIndex(cartItem => cartItem.id === itemId);
        if (itemIndex >= 0) {
            const currentItem = cartItems[itemIndex];
            if (currentItem.quantity > 1) {
                addToCart({ ...currentItem, quantity: -1 });
            } else {
                removeFromCart(itemId);
            }
        }
    }, [cartItems, addToCart, removeFromCart]);

    const handleNavigateHome = useCallback(() => navigate('/'), [navigate]);

    const renderCartItems = useMemo(() => (
        cartItems.map((item, index) => (
            <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2 hidden md:table-cell">{item.description}</td>
                <td className="border px-4 py-2">
                    <div className="flex items-center justify-center">
                        <button 
                            onClick={() => handleDecreaseQuantity(item.id)} 
                            className="bg-red-500 text-white px-2 rounded"
                        >
                            -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                            onClick={() => handleIncreaseQuantity(item.id)} 
                            className="bg-green-500 text-white px-2 rounded"
                        >
                            +
                        </button>
                    </div>
                </td>
                <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
                <td className="border px-4 py-2 hidden sm:table-cell">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="border px-4 py-2">
                    <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="bg-red-600 text-white px-4 py-1 rounded text-sm"
                    >
                        Remove
                    </button>
                </td>
            </tr>
        ))
    ), [cartItems, handleDecreaseQuantity, handleIncreaseQuantity, removeFromCart]);

    return (
        <>
            
            <div className="container mx-auto p-4">
                <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                    <h1 className="text-2xl font-bold mb-4 sm:mb-0">Shopping Cart</h1>
                    <div 
                        className="cursor-pointer border hover:border-black rounded-lg p-2 text-black"
                        onClick={handleNavigateHome}
                    >
                        Back to home page
                    </div>
                </div>
                
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">Number</th>
                                    <th className="border px-4 py-2">Title</th>
                                    <th className="border px-4 py-2 hidden md:table-cell">Description</th>
                                    <th className="border px-4 py-2">Quantity</th>
                                    <th className="border px-4 py-2">Price</th>
                                    <th className="border px-4 py-2 hidden sm:table-cell">Total Price</th>
                                    <th className="border px-4 py-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderCartItems}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={5} className="border px-4 py-2 font-bold text-right text-start">Total:</td>
                                    <td colSpan={3} className="border px-4 py-2">${totalPrice.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
});

export default CartPage;