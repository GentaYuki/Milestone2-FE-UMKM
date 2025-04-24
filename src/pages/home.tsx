import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navBar'

const HomePage: React.FC=()=> {
    
    const navigate = useNavigate();
    

    const categories = [
        {
          name: "Food",
          image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/ellipse-4.png",
        },
        {
          name: "Fashion",
          image:
            "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash--3q3tsj01nc.png",
        },
        {
          name: "Handicraft",
          image:
            "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash-gcdjllzoklo.png",
        },
        {
          name: "Electronic",
          image:
            "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash-xpjyl0l5ii8.png",
        },
        {
          name: "Herbal",
          image:
            "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash-oyye4g-i5zq.png",
        },
        {
          name: "Gifts",
          image:
            "https://c.animaapp.com/m9sr09xvPvV0Jw/img/unsplash-pxm8aejbzvk.png",
        },
      ];

    const discountProducts = [
    {
      id: "6",
      title: "Women Printed Kurta",
      category: "fashion",
      description: "Neque porro quisquam est qui dolorem ipsum quia",
      image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group-2.png", // No image in the original code
      price: "₹1500",
      originalPrice: "₹2499",
      discount: "40%Off",
    },
    {
      id: "9",
      title: "HRX by Hrithik Roshan",
      category: "fashion",
      description: "Neque porro quisquam est qui dolorem ipsum quia",
      image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group.png",
      price: "₹2499",
      originalPrice: "₹4999",
      discount: "50%Off",
    },
    {
      id: "13",
      title: "Philips BHH880/10",
      description: "Hair Straightening Brush With Keratin Infused Bristles (Black).",
      image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group.png",
      price: "₹999",
      originalPrice: "₹1999",
      discount: "50%Off",
    },
    {
      id: "14",
      title: "TITAN Men Watch- 1806N",
      category: "fashion",
      description: "This Titan watch in Black color is I wanted to buy for a long time",
      image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group-2.png",
      price: "₹1500",
      originalPrice: "₹3500",
      discount: "60%Off",
    },
    {
        id: "15",
        title: "TITAN Men Watch- 1806N",
        category: "fashion",
        description: "This Titan watch in Black color is I wanted to buy for a long time",
        image: "https://c.animaapp.com/m9sr09xvPvV0Jw/img/mask-group-2.png",
        price: "₹1500",
        originalPrice: "₹3500",
        discount: "60%Off",
      },
  ];
   

  return (

    <div>
        <div className="bg-[#fdfdfd] flex flex-row justify-center w-full">
            <div className="bg-[#fdfdfd] w-full max-w-[375px] h-full relative overflow-hidden">
                <header className="w-full h-14 flex items-center justify-between px-4 mt-4">
                    <div className="flex items-center gap-[9px]">
                        <img
                        className="w-[38.78px] h-[31.03px]"
                        alt="Stylish Logo"
                        src="https://c.animaapp.com/m9sr09xvPvV0Jw/img/group-34010.png"
                        />
                        <div className="[font-family:'Libre_Caslon_Text',Helvetica] font-bold text-[#4392f9] text-lg">
                        Stylish
                        </div>
                    </div>
                    <img src="https://c.animaapp.com/m9sr09xvPvV0Jw/img/2289-skvnqsbgqu1pidewmjgtmte2-1.png" alt="profile" className="w-10 h-10 object-cover rounded-full" />
                </header>

                <div className="px-4 mt-4">
                    <div className="flex space-x-4 pb-4">
                        {categories.map((category, index)=>(
                            <div key={index} onClick={() => navigate(`/products/${category.name}`)} className="flex flex-col items-center cursor-pointer">
                                <img className="w-14 h-14 rounded-full object-cover" alt={category.name} src={category.image}/>
                                <span className="mt-1 [font-family:'Montserrat',Helvetica] font-normal text-black text-[10px]">{category.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-4 mt-6">
                    <div className="flex flex-wrap gap-3 pb-4">
                        {discountProducts.map((product, index)=>(
                            <div key={index} onClick={() => navigate(`/products/${product.id}`)} className="w-[calc(50%-6px)] rounded-md overflow-hidden cursor-pointer">
                                {/* <img className="w-full h-[124px] object-cover" alt={product.title} src={product.image}/> */}
                                {product.image && (<img className="w-full h-[124px] object-cover" alt={product.title} src={product.image}/>)}
                                <div className="p-1">
                                    <h3 className="[font-family:'Montserrat',Helvetica] font-medium text-black text-xs mt-1">
                                        {product.title}
                                    </h3>
                                    <p className="[font-family:'Montserrat',Helvetica] font-normal text-black text-[10px] mt-1 h-8">
                                        {product.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <NavBar />
                

            </div>  
        </div>
    </div>
  )
}

export default HomePage