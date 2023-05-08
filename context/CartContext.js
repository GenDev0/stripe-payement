import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const LoadJSON = (key) => key && JSON.parse(localStorage.getItem(key));
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const cartProvider = ({ children }) => {
  const key = `STRIPE_CART_ITEMS`;
  const firsRender = useRef(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (firsRender.current) {
      firsRender.current = false;
      const localItems = LoadJSON(key);
      localItems && setItems(localItems);
      return;
    }
    saveJSON(key, items);
  }, [key, items]);
  const addItem = useCallback(
    (price) => setItems((prices) => prices.concat([price])),
    []
  );
  const removeItem = useCallback(
    (id) => setItems((prices) => prices.filter((price) => price.id !== id)),
    []
  );
  const resetCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default cartProvider;
