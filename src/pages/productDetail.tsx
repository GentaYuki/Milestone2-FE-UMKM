import React from "react";
import NavBar from '../components/navBar'
import { useParams, useNavigate } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-[#fdfdfd] flex flex-row justify-center w-full">
      <div className="bg-[#fdfdfd] w-[375px] h-[884px]">
        <div className="relative h-[884px] bg-[#f8f8f8]">

          <button onClick={() => navigate(-1)}>
            <img
              className="absolute w-[11px] h-5 top-5 left-[21px]"
              alt="Vector"
              src="https://c.animaapp.com/m9uk4gudLbxSsP/img/vector-3.svg"
            />
          </button>

          <div className="absolute w-[339px] h-[235px] top-[116px] left-4">
            <div className="flex w-[339px] items-start gap-4 absolute top-0 left-0 overflow-x-scroll">
                <div className="relative w-[343px] h-[235px]">
                    <div className="relative h-[235px]">
                        <div className="absolute w-[343px] h-[235px] top-0 left-0">
                        
                            <img
                                className="absolute w-[343px] h-[213px] top-0 left-0 object-cover"
                                alt="Unsplash"
                                src="https://c.animaapp.com/m9uk4gudLbxSsP/img/unsplash-novnxxmdni0.svg"
                    />
                            </div></div></div>
            {/* <div className="absolute w-[148px] h-[15px] top-[188px] left-0 [font-family:'Montserrat',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[22px] whitespace-nowrap">
              NIke Sneakers
            </div> */}
            </div>
          </div>

          <div className="absolute w-[343px] h-[387px] top-[360px] left-4">
            <p className="absolute h-4 top-28 left-0 [font-family:'Montserrat',Helvetica] font-normal text-black text-sm tracking-[0] leading-4 whitespace-nowrap">
              Vision Alta Men’s Shoes Size (All Colours)
            </p>

            <div className="absolute w-[343px] h-[303px] top-0 left-0">
              <div className="relative w-[347px] h-[303px]">
                <div className="absolute w-[347px] h-[287px] top-[17px] left-0">
                  <div className="absolute w-[116px] h-[11px] top-0 left-0 [font-family:'Montserrat',Helvetica] font-medium text-black text-sm tracking-[0] leading-4 whitespace-nowrap">
                    Product Details
                  </div>

                  <p className="absolute w-[343px] h-24 top-[191px] left-0 [font-family:'Montserrat',Helvetica] font-normal text-transparent text-xs tracking-[0] leading-3">
                    <span className="text-black leading-4">
                      Perhaps the most iconic sneaker of all-time, this original
                      &#34;Chicago&#34;? colorway is the cornerstone to any
                      sneaker collection. Made famous in 1985 by Michael Jordan,
                      the shoe has stood the test of time, becoming the most
                      famous colorway of the Air Jordan 1. This 2015 release saw
                      the
                    </span>

                    <span className="text-[#828282] leading-4"> ...</span>

                    <span className="text-[#f97189] leading-4">More</span>
                  </p>
                </div>

                <div className="absolute w-[170px] h-[179px] top-0 left-0">
                  <div className="absolute w-[106px] h-[11px] top-0 left-0">
                    <div className="absolute w-[52px] h-[11px] top-0 left-0">
                      <div className="relative w-[50px] h-[11px]">
                        <div className="w-[49px] left-px font-normal text-medium-gray2 absolute h-[11px] top-0 [font-family:'Montserrat',Helvetica] text-sm tracking-[0] leading-4 whitespace-nowrap">
                          ₹2,999
                        </div>

                        <img
                          className="absolute w-[50px] h-px top-[5px] left-0"
                          alt="Line"
                          src="https://c.animaapp.com/m9uk4gudLbxSsP/img/line-3.svg"
                        />
                      </div>
                    </div>

                    <div className="w-[46px] left-[58px] font-medium text-black absolute h-[11px] top-0 [font-family:'Montserrat',Helvetica] text-sm tracking-[0] leading-4 whitespace-nowrap">
                      ₹1,500
                    </div>
                  </div>

                  <div className="absolute h-4 top-[163px] left-28 [font-family:'Montserrat',Helvetica] font-semibold text-[#f97189] text-sm tracking-[0] leading-4 whitespace-nowrap">
                    50% Off
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute w-[138px] h-[255px] top-[132px] left-0">
              <div className="absolute w-[136px] h-10 top-[215px] left-0">
                <div className="w-[136px] h-9 top-0.5 rounded-[20px_4px_4px_20px] [background:linear-gradient(180deg,rgba(63,146,255,1)_0%,rgba(11,54,137,1)_100%)] absolute left-0" />

                <div className="cursor-pointer absolute top-2.5 left-[41px] [font-family:'Montserrat',Helvetica] font-medium text-primarywhite text-base tracking-[0] leading-5 whitespace-nowrap">
                  Add to cart
                </div>

                <div className="absolute w-10 h-10 top-0 left-0 rounded-[20px] shadow-[inset_0px_4px_4px_#00000026,inset_0px_-4px_4px_#00000026] [background:linear-gradient(180deg,rgba(63,146,255,1)_0%,rgba(11,54,137,1)_100%)]" />
              </div>

              {/* <Component1_2 className="!absolute !w-6 !h-[17px] !top-0 !left-2" /> */}
            </div>
          </div>

          <NavBar />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage
