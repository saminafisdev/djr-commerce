import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRoot,
} from "@/components/ui/number-input";
import {
  HStack,
  IconButton,
  Image,
  Spinner,
  Square,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useRemoveItemMutation } from "./cartApi";

export const CartDetail = ({ item: { id, product, quantity, subtotal } }) => {
  const [removeItem, { isLoading }] = useRemoveItemMutation();

  const removeCartItem = async () => {
    await removeItem({ item_id: id }).unwrap();
  };

  return (
    <HStack direction={"row"} spaceX={4}>
      <Square bg={"gray.50"} rounded={"md"} size={32}>
        <Image
          height={20}
          rounded={"md"}
          src="https://pngimg.com/uploads/headphones/headphones_PNG7645.png"
          alt="product name"
        />
      </Square>
      <Stack flex={1}>
        <Text fontWeight={"medium"} fontSize={"xl"} mb={4}>
          {product?.name}
        </Text>
        <NumberInputRoot
          size={"sm"}
          width={200}
          defaultValue={quantity}
          min={1}
        >
          <NumberInputLabel />
          <NumberInputField />
        </NumberInputRoot>
      </Stack>
      <Stack>
        <Text fontSize={"xl"} fontWeight={"medium"}>
          ${subtotal}
        </Text>
        <IconButton color={"red"} onClick={removeCartItem}>
          {isLoading ? <Spinner color={"gray.600"} /> : <FaTrash />}
        </IconButton>
      </Stack>
    </HStack>
  );
};

import PropTypes from "prop-types";

CartDetail.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      unit_price: PropTypes.number.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
    subtotal: PropTypes.number.isRequired,
  }).isRequired,
};
