import React, { useState } from "react";
import Header from "./Header";
import ShoppingCartSliderOver from "./ShoppingCartSliderOver";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [cartSliderIsOpen, setcartSliderIsOpen] = useState(false);
  return (
    <>
      <Header setcartSliderIsOpen={setcartSliderIsOpen} />
      <ShoppingCartSliderOver
        open={cartSliderIsOpen}
        setcartSliderIsOpen={setcartSliderIsOpen}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
