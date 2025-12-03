"use client";
import { useSelector } from "react-redux";
import CartWithoutLogin from "@/components/cart/cartWithoutLogin";
import MainCart from "@/components/cart/mainCart";
import { useModalStore } from "@/features/store/modalStore";

const CartPage = () => {
  const token = useSelector((state) => state.auth.token);

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <div className="mt-16">
      {!token ? (
        <CartWithoutLogin
          openLoginModal={() => openModal("login")}
        />
      ) : (
        <MainCart
          openDeleteModal={(name, props) => openModal(name,props)}
          token={token}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default CartPage;
