import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartLink = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "2rem",
        padding: "1rem 1.5rem",
        borderRadius: "5px",
        cursor: "pointer",
        border: "1px solid #ccc",
      }}
      onClick={() => navigate("/cart")}
    >
      <i className="bi bi-cart"></i> ${totalPrice.toFixed(2)}
    </div>
  );
};

export default CartLink;
