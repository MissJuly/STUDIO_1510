import React, { useState, useEffect } from 'react';
import { ShoppingCart } from "lucide-react";
import { toast } from 'sonner';
import { fetchCart, addToCart, removeFromCart, clearCart } from '../api/cartApi';
import NavigationMenu from '../components/NavigationMenu';
import FadeInWrapper from '../components/FadeInWrapper';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({ items: [] });
  const [cartVisible, setCartVisible] = useState(false);
  const [cartMounted, setCartMounted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAnimatingOut, setModalAnimatingOut] = useState(false);
  const [email, setEmail] = useState('');
  const [productId, setProductId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const showToast = (message, type = 'default') => {
    const options = { duration: 2500 };
    if (type === 'success') toast.success(message, options);
    else if (type === 'error') toast.error(message, options);
    else if (type === 'warning') toast.warning(message, options);
    else toast(message, options);
  };


function handleRemove(productId) {
  if (!productId) {
    showToast('Invalid product ID', 'error');
    return;
  }

  removeFromCart(productId)
    .then(() => fetchCart().then(setCart))
    .then(() => showToast('Removed item from cart', 'success'))
    .catch((err) => {
      console.error('Remove failed:', err);
      showToast('Failed to remove from cart', 'error');
    });
}


  function handleClear() {
    clearCart()
      .then(() => fetchCart().then(setCart))
      .then(() => showToast('Cleared cart', 'success'))
      .catch(() => showToast('Failed to clear cart', 'error'));
  }

  const openCart = () => {
    setCartMounted(true);
    setCartVisible(true);
  };


  const closeCart = () => {
    setCartVisible(false);
  };

  const openNotifyModal = (product) => {
    setProductId(product.id);
    setModalVisible(true);
  };

  const closeNotifyModal = () => {
    setModalAnimatingOut(true);
    setTimeout(() => {
      setModalVisible(false);
      setModalAnimatingOut(false);
      setEmail('');
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/notify-request/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, product: productId }),
    });

    if (response.ok) {
      toast.success('You will be notified when the product is back in stock!');
      closeNotifyModal();
    } else {
      toast.error('Something went wrong, please try again.');
    }
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Fetch the cart on initial load
    const loadCart = async () => {
      try {
        const cartData = await fetchCart();
        console.log('Initial cart data:', cartData);
        setCart(cartData || { items: [] });
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };

    loadCart();
  }, []);



const handleAdd = (product) => {
  const existingItem = cart.items.find(item => item.product.id === product.id);

  if (existingItem) {
    // Use Sonner to show confirmation instead of window.confirm
    toast(
      (t) => (
        <div>
          <p className="mb-2">{product.name} is already in your cart. Add again?</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t); // Dismiss the toast manually

                addToCart(product.id, 1)
                  .then(() => fetchCart())
                  .then((cartData) => {
                    setCart(cartData);
                    toast.success(`${product.name} quantity updated in cart`);
                  })
                  .catch((err) => {
                    console.error('Error updating cart:', err);
                    toast.error(`Failed to update cart`);
                  });
              }}
              className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700"
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(t);
                toast.warning(`${product.name} not added again.`);
              }}
              className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  } else {
    addToCart(product.id, 1)
      .then(() => fetchCart())
      .then((cartData) => {
        setCart(cartData);
        toast.success(`${product.name} added to cart`);
      })
      .catch((err) => {
        console.error('Error adding to cart:', err);
        toast.error('Failed to add item to cart');
      });
  }
};

 function handleDecrease(item) {
    if (!item || !item.product?.id) return;

    if (item.quantity > 1) {
      addToCart(item.product.id, -1)
        .then(() => fetchCart())
        .then((cartData) => {
          setCart(cartData);
          showToast(`${item.product.name} quantity reduced`, 'success');
        })
        .catch(() => showToast(`Failed to reduce quantity`, 'error'));
    } else {
      handleRemove(item.product.id); // now returns a properly awaited function
    }
  }


  useEffect(() => {
    if (!cartVisible) {
      const timer = setTimeout(() => setCartMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartVisible]);

   const handleCheckout = async () => {
    if (!cart.items || cart.items.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/checkout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensure session consistency
        body: JSON.stringify({
          items: cart.items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        showToast('Checkout successful! Order ID: ' + data.order_id, 'success');
        closeCart();

        // Force fetch the cart after successful checkout
        const newCart = await fetchCart();
        setCart(newCart);
      } else {
        const errorData = await response.json();
        setCheckoutError(errorData.detail || 'Checkout failed');
        showToast(errorData.detail || 'Checkout failed', 'error');
      }
    } catch (error) {
      setCheckoutError('Checkout request failed');
      showToast('Checkout request failed', 'error');
    } finally {
      setCheckoutLoading(false);
    }
  };


  return (
    <div className="bg-[#f5f5f5] min-h-screen text-[#333333]">
      <NavigationMenu />
      <main className="flex-grow">
        <FadeInWrapper className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-semibold text-center mt-10 mb-8">Studio 1510 Shop</h1>

          <div className="flex justify-end mb-4">
            <button
              onClick={openCart}
              className="relative p-3 bg-[#333333] text-white rounded hover:bg-gray-700 transition"
              title="View Cart"
            >
              <ShoppingCart size={20} />
              {cart.items && cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart?.items?.length || 0}
                </span>
              )}


            </button>
          </div>

          <p className="text-lg text-center mb-12 leading-loose">
            A curated collection of design objects, architectural prints, and bespoke pieces that reflect our studio's aesthetic sensibilities.
          </p>

          <div>
            <h2 className="text-3xl font-semibold mb-6 text-center">Products</h2>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products
                .filter(product =>
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  product.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(product => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg shadow hover:shadow-lg transition transform duration-300 p-4 ${
                      product.available ? 'hover:scale-105' : 'opacity-50'
                    }`}
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-48 rounded-md mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <p className="text-gray-800 font-semibold mb-2">Ksh{product.price}</p>

                    {product.available ? (
                      <button
                        onClick={() => handleAdd(product)}
                        className="mt-2 px-4 py-2 bg-[#333333] text-white rounded hover:bg-gray-700 transition w-full"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => openNotifyModal(product)}
                        className="mt-2 py-2 text-sm text-red-500 underline hover:text-red-600 transition w-full"
                      >
                        Notify me when available
                      </button>
                    )}

                    <p className={`text-sm ${product.available ? 'text-green-600' : 'text-red-500'}`}>
                      {product.available ? 'In Stock' : 'Out of Stock'}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">Added on: {new Date(product.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
            </div>
          </div>
        </FadeInWrapper>
      </main>

      <div className="text-center text-sm text-gray-500 pb-4">
        <p>Studio 1510 — Designing spaces that inspire.</p>
      </div>

      {cartMounted && (
        <>
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
              cartVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeCart}
          ></div>

          <div
            className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto transform transition-transform duration-300 ${
              cartVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Your Cart</h2>
              <button onClick={closeCart} className="text-gray-500 hover:text-gray-700 transition">
                <span className="sr-only">Close Cart</span>&times;
              </button>
            </div>

            {!cart.items || cart.items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <ul>
                {cart.items && cart.items.map((item, index) => {
                  if (!item.product) {
                    console.warn("Cart item missing product data:", item);
                    return null; // Skip rendering this broken item
                  }

                  return (
                    <li key={index} className="mb-4 border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{item.product.name}</p>
                          <p className="text-sm text-gray-600">Ksh{item.product.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleAdd(item.product)}
                            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
                </ul>

                <div className="mt-4 text-right">
                  <p className="font-semibold text-lg">
                    Total: Ksh{
                      cart.items?.reduce((total, item) => {
                        if (!item.product) return total;
                        return total + item.product.price * item.quantity;
                      }, 0).toFixed(2)
                    }
                  </p>
                </div>

                <button
                  className={`mt-4 px-4 py-2 bg-[#333333] hover:bg-gray-700 text-white rounded transition w-full ${
                    checkoutLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? 'Processing...' : 'Checkout'}
                </button>


                <button
                  className="mt-2 text-sm text-red-500 underline hover:text-red-600 transition w-full"
                  onClick={handleClear}
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        </>
      )}

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div
            className={`bg-white p-8 rounded-md shadow-lg w-96 transition-all ${
              modalAnimatingOut ? 'animate-modal-out' : 'animate-modal-in'
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Notify me when available</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 mb-4 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-[#333333] text-white py-2 rounded hover:bg-gray-700 transition"
              >
                Submit
              </button>
            </form>
            <button
              onClick={closeNotifyModal}
              className="w-full mt-4 py-2 text-center text-sm text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
