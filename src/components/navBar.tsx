import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    ChevronRightIcon,
    FilterIcon,
    HeartIcon,
    HomeIcon,
    SearchIcon,
    SettingsIcon,
    ShoppingCartIcon,
  } from "lucide-react";


const NavBar: React.FC=() => {

  const navigate = useNavigate();

    const navItems = [
    {
      name: "Home",
      icon: <HomeIcon onClick={() => navigate(`/home`)} className="w-6 h-6" />,
      active: true,
      color: "text-[#ea3030]",
    },
    // {
    //   name: "Wishlist",
    //   icon: <HeartIcon className="w-6 h-6" />,
    //   active: false,
    //   color: "text-lightgray-11",
    // },
    {
      name: "Search",
      icon: <SearchIcon className="w-6 h-6" />,
      active: false,
      color: "text-lightgray-11",
    },
    // {
    //   name: "Setting",
    //   icon: <SettingsIcon className="w-6 h-6" />,
    //   active: false,
    //   color: "text-black",
    // },
  ];

  return (
    <div>
                <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto">
                    <div className="relative h-[82px]">
                        <div className="absolute w-full h-[76px] bg-gray-100 shadow-[0px_-1px_1px_#0000001a] flex justify-around items-center">
                            {navItems.map((item, index)=>(
                                <div key={index} className="cursor-pointer flex flex-col items-center text-gray-800">
                                    {item.icon}
                                    {item.name}
                                </div>
                            ))}
                            <div className="absolute left-1/2 transform -translate-x-1/2 -top-3">
                                <div className="w-[54px] h-14 bg-gray-100 rounded-[50px] shadow-[0px_2px_14px_#00000017] flex items-center justify-center">
                                    <ShoppingCartIcon className="w-6 h-6 text-gray-800" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default NavBar