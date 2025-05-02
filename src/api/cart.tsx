export interface CartItem {
    product_id: number;
    quantity: number;
  }
  
  export const addToCart = async (productId: number, quantity: number = 1): Promise<boolean> => {
    try {
      const response = await fetch(`https://expected-odella-8fe2e9ce.koyeb.app/cart/1/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
  
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };