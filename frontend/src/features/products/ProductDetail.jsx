import { Rating } from "@/components/ui/rating";
import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRoot,
} from "@/components/ui/number-input";
import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  Float,
  Group,
  Heading,
  IconButton,
  Image,
  Square,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { useGetProductQuery } from "./productsApi";
import { useParams } from "react-router";
import { useState } from "react";

export const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading, isError, error } = useGetProductQuery(slug);
  const [cartQuantity, setCartQuantity] = useState(1);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    if (error.status === 404) return <div>{error.data.detail}</div>;
    return <div>Error: {error?.message}</div>;
  }

  return (
    <Container pt={8}>
      <Flex gap={12}>
        <Square bg={"gray.50"} rounded={"md"} size={"lg"} position={"relative"}>
          <Image
            height={350}
            rounded={"md"}
            src="https://pngimg.com/uploads/headphones/headphones_PNG7645.png"
            alt="product name"
          />
          <Float offset={"12"}>
            <IconButton
              rounded={"full"}
              colorPalette={"gray"}
              variant={"subtle"}
              size={"2xl"}
            >
              <FiHeart />
            </IconButton>
          </Float>
        </Square>
        <Stack gap={5}>
          <Heading size={"4xl"}>{product.name}</Heading>
          <Text color={"gray.600"} fontSize={"lg"}>
            {product.description}
          </Text>
          <Group>
            <Rating
              defaultValue={3}
              size="lg"
              colorPalette={"orange"}
              readOnly
            />
            <Text fontSize={"lg"}>(300)</Text>
          </Group>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            ${product.unit_price}
          </Text>
          <NumberInputRoot
            size={"lg"}
            width={200}
            min={1}
            max={product?.inventory}
            value={cartQuantity}
            onValueChange={(e) => setCartQuantity(e.value)}
          >
            <NumberInputLabel />
            <NumberInputField />
          </NumberInputRoot>
          <ButtonGroup size={"xl"}>
            <Button variant={"outline"} mt={4} colorPalette={"blue"}>
              <FiShoppingBag /> Add to Cart
            </Button>
            <Button variant={"solid"} mt={4} colorPalette={"blue"}>
              Buy now
            </Button>
          </ButtonGroup>
        </Stack>
      </Flex>
    </Container>
  );
};
