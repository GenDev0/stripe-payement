import { useCart } from "@/context/CartContext";
import React from "react";

type Props = {
  open: boolean;
  setcartSliderIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShoppingCartSliderOver({
  open,
  setcartSliderIsOpen,
}: Props) {
  const { items, removeItem } = useCart();
  const Total = items.reduce(
    (acc: any, curr: { unit_amount: any }) => (acc += curr.unit_amount),
    0
  );
  return <div></div>;
}
