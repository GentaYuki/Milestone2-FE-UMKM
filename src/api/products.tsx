export interface ProductImage {
    file_id: string;
    image_url: string;
    productImage_id: number;
    product_id: number;
  }
  
  export interface Product {
    category: string;
    created_at: string;
    description: string;
    name: string;
    price: string;
    product_id: number;
    product_images: ProductImage[];
    status: string;
    stock: number;
  }
  
  interface ApiResponse {
    data: Product[];
    message: string;
    pagination: {
      page: number;
      per_page: number;
      total_items: number;
      total_pages: number;
    };
    status: string;
  }
  
  export const fetchProducts = async (): Promise<Product[]> => {
    try {
      const response = await fetch('https://expected-odella-8fe2e9ce.koyeb.app/product');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: ApiResponse = await response.json();
      
      if (data.status !== 'success') {
        throw new Error(data.message || 'Failed to fetch products');
      }
  
      return data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Re-throw error untuk ditangkap di component
    }
  };



  // Tambahkan fungsi ini di api/products.ts
export const fetchProductById = async (id: number): Promise<Product> => {
    try {
      const response = await fetch(`https://expected-odella-8fe2e9ce.koyeb.app/product/${id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data: ApiResponse = await response.json()
      
      if (data.status !== 'success' || !data.data) {
        throw new Error(data.message || 'Product not found')
      }
  
      return data.data[0];
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  }