import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { HStack, Image, Square, Stack, Text } from "@chakra-ui/react";

export const CartDetail = ({ item: { product, quantity, subtotal } }) => {
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
      <Text fontSize={"xl"} fontWeight={"medium"}>
        ${product?.unit_price}
      </Text>
    </HStack>
  );
};
