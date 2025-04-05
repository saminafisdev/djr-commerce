import PropTypes from "prop-types";
import { ButtonGroup, IconButton, Image, Table } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useRemoveWishlistItemMutation } from "./wishlistApi";
import { useAddItemMutation } from "../cart/cartApi";

const WishlistItem = ({ item }) => {
  const [addToCart] = useAddItemMutation();
  const [removeItem] = useRemoveWishlistItemMutation();
  const removeWishlistItem = async (product_id) => {
    try {
      await removeItem({ product_id });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Table.Row>
      <Table.Cell>
        <ButtonGroup variant={"outline"}>
          <IconButton
            colorPalette={"red"}
            onClick={() => removeWishlistItem(item.product.id)}
          >
            <FaTrash />
          </IconButton>
          <IconButton
            colorPalette={"blue"}
            onClick={() =>
              addToCart({ product_id: item.product.id, quantity: 1 })
            }
          >
            <FiShoppingBag />
          </IconButton>
        </ButtonGroup>
      </Table.Cell>
      <Table.Cell>
        <Image
          height={50}
          rounded={"md"}
          src="https://pngimg.com/uploads/headphones/headphones_PNG7645.png"
          alt="product name"
          mx={"auto"}
        />
      </Table.Cell>
      <Table.Cell>{item.product.name}</Table.Cell>
      <Table.Cell>${item.product.unit_price}</Table.Cell>
    </Table.Row>
  );
};

export default WishlistItem;

WishlistItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      unit_price: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
