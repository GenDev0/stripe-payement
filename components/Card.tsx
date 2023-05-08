import { useCart } from "@/context/CartContext";
import React, { useEffect, useState } from "react";

type Props = {
  price: any;
};

export default function Card({ price }: Props) {
  const { items, addItem } = useCart();
  const [error, setError] = useState("");
  const { product, unit_amount } = price;
  const addItemToCart = (price: { id: any }) => {
    const found = items.find((p: { id: any }) => p.id === price.id);
    if (found) {
      setError("Item has been added!");
      return;
    }
    addItem(price);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setError(""), 3000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div>
      <div className='relative'>
        <div className='relative w-full h-72 rounded-lg overflow-hidden'>
          <img
            className='w-full h-full object-center object-cover'
            src={product?.images[0]}
            alt={product?.description}
          />
        </div>
        <div className='relative mt-4'>
          <h3 className='text-sm font-medium text-gray-900'>{product?.name}</h3>
          <p className='mt-1 text-sm text-gray-500'>{product?.description}</p>
        </div>
        <div className='absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-center justify-center'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-slate-600 '
          >
            <p className='relative text-lg font-semibold text-white'>
              {(unit_amount / 100).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </div>
        </div>
        <div className='mt-6'>
          <button
            className='relative flex bg-gray-100 border border-transparent rounded-lg'
            onClick={() => addItemToCart(price)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
