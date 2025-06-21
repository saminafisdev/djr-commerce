import { Rating } from "@/components/ui/rating";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import {
  Button,
  ButtonGroup,
  Container,
  Float,
  Group,
  Heading,
  IconButton,
  Image,
  Square,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { useGetProductQuery } from "./productsApi";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveWishlistItemMutation,
} from "../wishlist/wishlistApi";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../auth/authSlice";
import { AddToCartButton } from "./AddToCartButton";

export const ProductDetail = () => {
  const { slug } = useParams();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: product, isLoading, isError, error } = useGetProductQuery(slug);
  const { data: wishlist } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveWishlistItemMutation();
  const [cartQuantity, setCartQuantity] = useState(1);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    if (error.status === 404) return <div>{error.data.detail}</div>;
    return <div>Error: {error?.message}</div>;
  }

  const wishlistIds = new Set(wishlist?.items?.map((item) => item.product.id));

  return (
    <Container pt={8}>
      <Stack direction={{ base: "column", md: "row" }} gap={12}>
        <Square
          bg={"gray.50"}
          rounded={"md"}
          size={{ base: "xs", md: "lg" }}
          position={"relative"}
        >
          <Image
            height={{ base: 200, md: 300 }}
            rounded={"md"}
            src="https://pngimg.com/uploads/headphones/headphones_PNG7645.png"
            alt="product name"
          />
          <Float offset={"12"}>
            {wishlistIds.has(product?.id) ? (
              <IconButton
                rounded={"full"}
                colorPalette={"red"}
                variant={"subtle"}
                size={"2xl"}
                onClick={() => removeFromWishlist({ product_id: product.id })}
              >
                <FaHeart />
              </IconButton>
            ) : (
              <IconButton
                rounded={"full"}
                colorPalette={"gray"}
                variant={"subtle"}
                size={"2xl"}
                onClick={() =>
                  isAuthenticated
                    ? addToWishlist({ product_id: product.id })
                    : navigate("/login")
                }
              >
                <FiHeart />
              </IconButton>
            )}
          </Float>
        </Square>
        <Stack gap={5}>
          <Heading size={"4xl"}>{product.name}</Heading>
          <Text color={"gray.600"} fontSize={"lg"}>
            {product.description}
          </Text>
          <Group>
            <Rating
              defaultValue={product.average_rating ?? 0}
              size="lg"
              colorPalette={"orange"}
              readOnly
            />
            <Text fontSize={"lg"}>({product.review_count})</Text>
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
            <NumberInputField />
          </NumberInputRoot>
          <ButtonGroup size={"xl"}>
            <AddToCartButton
              product_id={product.id}
              width={"200px"}
              quantity={cartQuantity}
            />
            <Button variant={"solid"} mt={4} colorPalette={"blue"}>
              Buy now
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Container>
  );
};
