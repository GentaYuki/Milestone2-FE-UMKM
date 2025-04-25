import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeIcon, ShoppingCartIcon } from "lucide-react"

const NavBar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16 px-4">
        {/* Home Button */}
        <button 
          onClick={() => navigate('/home')} 
          className="flex flex-col items-center justify-center w-full text-gray-800"
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>

        {/* Cart Button */}
        <button 
          onClick={() => navigate('/checkout')} 
          className="flex flex-col items-center justify-center w-full text-gray-800"
        >
          <ShoppingCartIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Cart</span>
        </button>
      </div>
    </div>
  )
}

export default NavBar