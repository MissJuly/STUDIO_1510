const API_BASE = 'http://127.0.0.1:8000/api';

export const fetchCart = async () => {
  const res = await fetch(`${API_BASE}/cart/`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch cart');
  return await res.json();
};

export async function addToCart(productId, quantity = 1) {
    const response = await fetch(`${API_BASE}/cart/add/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ product_id: productId, quantity }),
    });

    if (!response.ok) {
        throw new Error("Failed to add to cart");
    }

    const cartResponse = await fetch(`${API_BASE}/cart/`, {
        method: "GET",
        credentials: "include",
    });

    if (!cartResponse.ok) {
        throw new Error("Failed to fetch cart");
    }

    return cartResponse.json();
}


export const removeFromCart = async (productId) => {
  const res = await fetch(`${API_BASE}/cart/remove/`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error('Failed to remove from cart');
  return await res.json();
};

export const clearCart = async () => {
  const res = await fetch(`${API_BASE}/cart/clear/`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to clear cart');
  return await res.json();
};

  // export const handleSubmit = async (productId, email, closeNotifyModal, toast) => {
  //   try {
  //     const response = await fetch(`${API_BASE}/notify-request/`, {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ product: productId, email }),
  //     });

  //     if (response.ok) {
  //       toast.success('You will be notified when the product is back in stock!');
  //       closeNotifyModal();
  //     } else {
  //       toast.error('Something went wrong, please try again.');
  //     }
  //   } catch (error) {
  //     toast.error('Network error. Please check your connection.');
  //   }
  // };

