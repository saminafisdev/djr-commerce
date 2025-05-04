import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAddItemMutation } from "../cart/cartApi";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../auth/authSlice";
import { FiShoppingBag } from "react-icons/fi";
import PropTypes from "prop-types";
import { Toaster, toaster } from "@/components/ui/toaster";

export const AddToCartButton = ({
  product_id,
  width = "full",
  quantity = 1,
}) => {
  const navigate = useNavigate();
  const [addToCart] = useAddItemMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart({ product_id: product_id, quantity: quantity });

      toaster.create({
        description: "Item added to cart",
        type: "success",
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Toaster />
      <Button
        onClick={handleAddToCart}
        variant={"outline"}
        mt={4}
        colorPalette={"blue"}
        width={width}
      >
        <FiShoppingBag /> Add to cart
      </Button>
    </>
  );
};

AddToCartButton.propTypes = {
  product_id: PropTypes.number.isRequired,
  width: PropTypes.string,
  quantity: PropTypes.number,
};
