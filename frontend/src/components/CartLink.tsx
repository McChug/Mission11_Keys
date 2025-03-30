import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartLink = () => {
  const navigate = useNavigate();
  const { totalPrice } = useCart();

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1.5rem",
        padding: "1rem 1.5rem",
        borderRadius: "5px",
        backgroundColor: "#CAE9FF",
        cursor: "pointer",
        border: "1px solid #ccc",
        zIndex: "100",
        display: "flex",
        gap: "1rem",
      }}
      onClick={() => navigate("/cart")}
    >
      <p className="m-0">View Your Cart</p>
      <div>
        <i className="bi bi-cart"></i> ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default CartLink;
