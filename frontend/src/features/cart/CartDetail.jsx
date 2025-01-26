import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { HStack, Image, Square, Stack, Text } from "@chakra-ui/react";

export const CartDetail = () => {
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
          Mens T-Shirt
        </Text>
        <NumberInputRoot size={"sm"} width={200} defaultValue="1" min={1}>
          <NumberInputLabel />
          <NumberInputField />
        </NumberInputRoot>
      </Stack>
      <Text fontSize={"xl"} fontWeight={"medium"}>
        $200
      </Text>
    </HStack>
  );
};
