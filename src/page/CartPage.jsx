import { useCartStore } from "../store/cartStore";
import "../style/page/cartPage.sass";
import { FaShoppingCart } from "react-icons/fa";
import ModalCart from "../Component/modal/ModalCart";

function CartPage() {
    const { cart, updateQuantity, removeProduct } = useCartStore();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div id="backgroundPage">
            <div id="BigModal__center">
                <ModalCart />
            </div>
        </div>
    );
}

export default CartPage;
