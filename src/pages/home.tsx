import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../components/navBar'
import { fetchProducts, Product } from '../api/products'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Categories data
  const categories = [
    {
      name: "Food",
      image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
      slug: "food"
    },
    {
      name: "Fashion",
      image: "https://img.freepik.com/free-photo/assortment-jamu-traditional-indonesian-herbal-medicine_23-2149156159.jpg",
      slug: "fashion"
    },
    {
      name: "Handicraft",
      image: "https://img.freepik.com/free-photo/indonesian-wayang-puppets-display_23-2147948773.jpg",
      slug: "handicraft"
    },
    {
      name: "Electronic",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
      slug: "electronic"
    },
    {
      name: "Herbal",
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
      slug: "herbal"
    },
    
];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts()
        setProducts(productsData)
        setError(null)
      } catch (err) {
        console.error("Failed to load products:", err)
        setError(err instanceof Error ? err.message : 'Failed to load products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Handle category click
  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/category/${categorySlug}`)
  }

  // Only show first 10 products
  const displayedProducts = products.slice(0, 10)

  return (
    <div>
      <div className="bg-[#fdfdfd] flex flex-row justify-center w-full">
        <div className="bg-[#fdfdfd] w-full max-w-[375px] h-full relative overflow-hidden">
          {/* Header */}
          <header className="w-full h-14 flex items-center justify-between px-4 mt-4">
            <div className="flex items-center gap-[9px]">
              <img
                className="w-[38.78px] h-[31.03px]"
                alt="Stylish Logo"
                src="https://c.animaapp.com/m9sr09xvPvV0Jw/img/group-34010.png"
              />
              <div className="[font-family:'Libre_Caslon_Text',Helvetica] font-bold text-[#4392f9] text-lg">
              UMKM Connect
              </div>
            </div>
            <Link to = "/profile">
            <img 
              src="https://c.animaapp.com/m9sr09xvPvV0Jw/img/2289-skvnqsbgqu1pidewmjgtmte2-1.png" 
              alt="profile" 
              className="w-10 h-10 object-cover rounded-full" 
            />
            </Link>
          </header>

          {/* Categories Section */}
          <div className="px-4 mt-4">
            <div className="flex space-x-4 pb-4">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  onClick={() => handleCategoryClick(category.slug)} 
                  className="flex flex-col items-center cursor-pointer"
                >
                  <img 
                    className="w-14 h-14 rounded-full object-cover" 
                    alt={category.name} 
                    src={category.image}
                  />
                  <span className="mt-1 [font-family:'Montserrat',Helvetica] font-normal text-black text-[10px]">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div className="px-4 mt-6">
            {error ? (
              <div className="[font-family:'Montserrat',Helvetica] text-red-500 text-xs text-center p-2">
                {error}
              </div>
            ) : loading ? (
              <div className="flex justify-center items-center h-40">
                <p className="[font-family:'Montserrat',Helvetica]">Loading products...</p>
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <p className="[font-family:'Montserrat',Helvetica]">No products available</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 pb-12">
                {displayedProducts.map((product) => (
                  <div 
                    key={product.product_id}
                    onClick={() => navigate(`/product/${product.product_id}`)}
                    className="w-[calc(50%-6px)] rounded-md overflow-hidden cursor-pointer"
                  >
                    {/* Product Image */}
                    {product.product_images?.[0]?.image_url ? (
                      <img
                        className="w-full h-[124px] object-cover"
                        src={product.product_images[0].image_url}
                        alt={product.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'https://via.placeholder.com/150'
                        }}
                      />
                    ) : (
                      <div className="w-full h-[124px] bg-gray-200 flex items-center justify-center">
                        <span className="[font-family:'Montserrat',Helvetica] text-xs text-gray-500">
                          No Image
                        </span>
                      </div>
                    )}
                    
                    {/* Product Info */}
                    <div className="p-1">
                      <h3 className="[font-family:'Montserrat',Helvetica] font-medium text-black text-xs mt-1">
                        {product.name}
                      </h3>
                      <p className="[font-family:'Montserrat',Helvetica] font-normal text-black text-[10px] mt-1 h-8 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="[font-family:'Montserrat',Helvetica] font-bold text-black text-xs">
                          Rp {product.price}
                        </p>
                        <p className="[font-family:'Montserrat',Helvetica] font-normal text-gray-500 text-[10px]">
                          Stock: {product.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <NavBar />
        </div>
      </div>
    </div>
  )
}

export default HomePage



// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import NavBar from '../components/navBar'

// const HomePage: React.FC=()=> {
    
//     const navigate = useNavigate();
    

//     const categories = [
//         {
//           name: "Food",
//           image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/ellipse-4.png",
//         },
//         {
//           name: "Fashion",
//           image:
//             "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash--3q3tsj01nc.png",
//         },
//         {
//           name: "Handicraft",
//           image:
//             "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash-gcdjllzoklo.png",
//         },
//         {
//           name: "Electronic",
//           image:
//             "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash-xpjyl0l5ii8.png",
//         },
//         {
//           name: "Herbal",
//           image:
//             "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash-oyye4g-i5zq.png",
//         },
//         {
//           name: "Gifts",
//           image:
//             "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash-pxm8aejbzvk.png",
//         },
//       ];

//     const discountProducts = [
//     {
//       id: "6",
//       title: "Women Printed Kurta",
//       category: "fashion",
//       description: "Neque porro quisquam est qui dolorem ipsum quia",
//       image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group-2.png", // No image in the original code
//       price: "₹1500",
//       originalPrice: "₹2499",
//       discount: "40%Off",
//     },
//     {
//       id: "9",
//       title: "HRX by Hrithik Roshan",
//       category: "fashion",
//       description: "Neque porro quisquam est qui dolorem ipsum quia",
//       image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group.png",
//       price: "₹2499",
//       originalPrice: "₹4999",
//       discount: "50%Off",
//     },
//     {
//       id: "13",
//       title: "Philips BHH880/10",
//       description: "Hair Straightening Brush With Keratin Infused Bristles (Black).",
//       image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group.png",
//       price: "₹999",
//       originalPrice: "₹1999",
//       discount: "50%Off",
//     },
//     {
//       id: "14",
//       title: "TITAN Men Watch- 1806N",
//       category: "fashion",
//       description: "This Titan watch in Black color is I wanted to buy for a long time",
//       image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group-2.png",
//       price: "₹1500",
//       originalPrice: "₹3500",
//       discount: "60%Off",
//     },
//     {
//         id: "15",
//         title: "TITAN Men Watch- 1806N",
//         category: "fashion",
//         description: "This Titan watch in Black color is I wanted to buy for a long time",
//         image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group-2.png",
//         price: "₹1500",
//         originalPrice: "₹3500",
//         discount: "60%Off",
//       },
//   ];
   

//   return (

//     <div>
//         <div className="bg-[#fdfdfd] flex flex-row justify-center w-full">
//             <div className="bg-[#fdfdfd] w-full max-w-[375px] h-full relative overflow-hidden">
//                 <header className="w-full h-14 flex items-center justify-between px-4 mt-4">
//                     <div className="flex items-center gap-[9px]">
//                         <img
//                         className="w-[38.78px] h-[31.03px]"
//                         alt="Stylish Logo"
//                         src="https://c.animaapp.com/m9sr09xvPvV0Jw/img/group-34010.png"
//                         />
//                         <div className="[font-family:'Libre_Caslon_Text',Helvetica] font-bold text-[#4392f9] text-lg">
//                         Stylish
//                         </div>
//                     </div>
//                     <img src="https://c.animaapp.com/m9sr09xvPvV0Jw/img/2289-skvnqsbgqu1pidewmjgtmte2-1.png" alt="profile" className="w-10 h-10 object-cover rounded-full" />
//                 </header>

//                 <div className="px-4 mt-4">
//                     <div className="flex space-x-4 pb-4">
//                         {categories.map((category, index)=>(
//                             <div key={index} onClick={() => navigate(`/products/${category.name}`)} className="flex flex-col items-center cursor-pointer">
//                                 <img className="w-14 h-14 rounded-full object-cover" alt={category.name} src={category.image}/>
//                                 <span className="mt-1 [font-family:'Montserrat',Helvetica] font-normal text-black text-[10px]">{category.name}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="px-4 mt-6">
//                     <div className="flex flex-wrap gap-3 pb-4">
//                         {discountProducts.map((product, index)=>(
//                             <div key={index} onClick={() => navigate(`/products/${product.id}`)} className="w-[calc(50%-6px)] rounded-md overflow-hidden cursor-pointer">
//                                 {/* <img className="w-full h-[124px] object-cover" alt={product.title} src={product.image}/> */}
//                                 {product.image && (<img className="w-full h-[124px] object-cover" alt={product.title} src={product.image}/>)}
//                                 <div className="p-1">
//                                     <h3 className="[font-family:'Montserrat',Helvetica] font-medium text-black text-xs mt-1">
//                                         {product.title}
//                                     </h3>
//                                     <p className="[font-family:'Montserrat',Helvetica] font-normal text-black text-[10px] mt-1 h-8">
//                                         {product.description}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <NavBar />
                

//             </div>  
//         </div>
//     </div>
//   )
// }

// export default HomePage



