import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeCartItem, emptyCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="d-flex flex-column align-items-center my-5">
            {cart.map((item: CartItem) => (
              <div key={item.bookId} className="card w-50">
                <div className="card-header">
                  {item.title} &ndash; x{item.quantity}
                </div>
                <div className="card-body d-flex justify-content-center align-items-center flex-wrap gap-3">
                  ${item.price.toFixed(2)}
                  <button onClick={() => removeCartItem(item.bookId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2>Total: </h2>
      <button>Checkout</button>
      <button onClick={() => navigate("/")}>Continue Shopping</button>
      {cart.length > 0 && <button onClick={emptyCart}>Clear Cart</button>}
    </div>
  );
}

export default CartPage;
