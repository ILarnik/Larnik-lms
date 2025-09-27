import React from "react";

export default function DiscountBar() {
    const DiscountAmount = ('50%')
    const DiscountCoupon = ('LEARN50')
    
return (
  <>
    <div className="w-full h-auto bg-rose-200 flex items-center justify-center px-4 py-6">
      <h1 className="text-lg sm:text-xl md:text-2xl text-black font-semibold text-center leading-snug">
        🎉 Use code{" "}
        <span className="bg-blue-200 px-2 py-0.5 rounded-lg font-mono text-blue-800">
          {DiscountCoupon}
        </span>{" "}
        to get <span className="font-bold">{DiscountAmount}</span> off on your first month!
      </h1>
    </div>
  </>
);

    
}