import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";

function HandleCart({
  bookId,
  title,
  price,
}: {
  bookId: number;
  title: string;
  price: number;
}) {
  const navigate = useNavigate();
  const { addCartItem } = useCart();

  const handleAddToCart = ({
    bookId,
    title,
    price,
  }: {
    bookId: number;
    title: string;
    price: number;
  }) => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || "No Book Found",
      price,
      quantity: 1,
      subtotal: price,
    };
    addCartItem(newItem);
    navigate("/cart");
  };

  return (
    <button onClick={() => handleAddToCart({ bookId, title, price })}>
      Add to Cart
    </button>
  );
}

export default HandleCart;
