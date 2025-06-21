import PropTypes from "prop-types";
import {
  HStack,
  IconButton,
  Image,
  NumberInput,
  Spinner,
  Square,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useRemoveItemMutation, useUpdateItemMutation } from "./cartApi";

export const CartDetail = ({ item: { id, product, quantity, subtotal } }) => {
  const [removeItem, { isLoading }] = useRemoveItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const updateCartItem = async (amount) => {
    try {
      await updateItem({ id, body: { quantity: amount } }).unwrap();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

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
        <NumberInput.Root defaultValue={quantity} unstyled spinOnPress={false}>
          <HStack gap="2">
            <NumberInput.DecrementTrigger asChild>
              <IconButton
                variant="outline"
                size="sm"
                onClick={() => updateCartItem(quantity - 1)}
              >
                <LuMinus />
              </IconButton>
            </NumberInput.DecrementTrigger>
            <NumberInput.ValueText
              textAlign="center"
              fontSize="lg"
              minW="3ch"
            />
            <NumberInput.IncrementTrigger asChild>
              <IconButton
                variant="outline"
                size="sm"
                onClick={() => updateCartItem(quantity + 1)}
              >
                <LuPlus />
              </IconButton>
            </NumberInput.IncrementTrigger>
          </HStack>
        </NumberInput.Root>
      </Stack>
      <Stack>
        <Text fontSize={"xl"} fontWeight={"medium"}>
          ${subtotal}
        </Text>
        <IconButton colorPalette={"red"} onClick={removeCartItem}>
          {isLoading ? <Spinner color={"gray.600"} /> : <FaTrash />}
        </IconButton>
      </Stack>
    </HStack>
  );
};

CartDetail.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      unit_price: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
    subtotal: PropTypes.number.isRequired,
  }).isRequired,
};
