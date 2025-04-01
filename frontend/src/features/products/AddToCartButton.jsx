import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useAddItemMutation } from "../cart/cartApi";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../auth/authSlice";
import { FiShoppingBag } from "react-icons/fi";
import PropTypes from "prop-types";

export const AddToCartButton = ({ product_id, width, quantity }) => {
  const navigate = useNavigate();
  const [addToCart] = useAddItemMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Button
      onClick={() =>
        isAuthenticated
          ? addToCart({ product_id: product_id, quantity: quantity })
          : navigate("/login")
      }
      variant={"outline"}
      mt={4}
      colorPalette={"blue"}
      width={width}
    >
      <FiShoppingBag /> Add to Cart
    </Button>
  );
};

AddToCartButton.propTypes = {
  product_id: PropTypes.string.isRequired,
  width: PropTypes.string,
  quantity: PropTypes.number.isRequired,
};

AddToCartButton.defaultProps = {
  width: "full",
  quantity: 1,
};
