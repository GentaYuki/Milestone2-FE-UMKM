import React from 'react'


type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
  };
  
  export const GetProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
      const response = await fetch(`https://api.example.com/products?category=${category}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data as Product[];
      
    } catch (error) {
      console.error('Fetch error:', error);
      return []; 
    }
  };

export default GetProductsByCategory