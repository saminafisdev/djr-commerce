import { Link as RouterLink, useSearchParams } from "react-router";

import {
  Box,
  Button,
  Center,
  Container,
  Float,
  GridItem,
  Group,
  HStack,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { Rating } from "@/components/ui/rating";

import { FiHeart } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { useGetProductsQuery } from "./productsApi";
import PropTypes from "prop-types";
import { useAddItemMutation } from "../cart/cartApi";

const ProductCard = ({ product: { id, name, slug, unit_price } }) => {
  const [addItem] = useAddItemMutation();

  return (
    <GridItem>
      <Box>
        <Center
          rounded={"md"}
          position={"relative"}
          height={250}
          bg={"gray.50"}
        >
          <Image
            height={200}
            rounded={"md"}
            src="https://pngimg.com/uploads/headphones/headphones_PNG7645.png"
            alt="product name"
          />
          <Float offset={8}>
            <IconButton
              rounded={"full"}
              colorPalette={"gray"}
              variant={"subtle"}
            >
              <FiHeart />
            </IconButton>
          </Float>
        </Center>
        <Box>
          <Text textStyle={"xl"}>
            <Link variant={"plain"} asChild>
              <RouterLink to={`/products/${slug}`}>{name}</RouterLink>
            </Link>
          </Text>
          <Group>
            <Rating
              defaultValue={3}
              size="sm"
              colorPalette={"orange"}
              readOnly
            />
            <Text>(300)</Text>
          </Group>
          <Text fontWeight={"semibold"}>${unit_price}</Text>
        </Box>
        <Button
          onClick={() => addItem({ product_id: id, quantity: 1 })}
          variant={"outline"}
          mt={4}
          colorPalette={"blue"}
          width={"full"}
        >
          <FiShoppingBag /> Add to Cart
        </Button>
      </Box>
    </GridItem>
  );
};

export const ProductsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isError, error } = useGetProductsQuery(page);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  const { count, results: products } = data;

  return (
    <Container py={6}>
      <Text fontSize={"2xl"} fontWeight={"medium"} mb={4}>
        Product List ({count})
      </Text>
      <SimpleGrid minChildWidth={"xs"} gap={4}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
      <PaginationRoot
        count={count}
        page={page}
        onPageChange={(e) => setSearchParams({ page: e.page })}
        variant={"solid"}
        colorPalette={"blue"}
        mt={6}
      >
        <HStack justify={"center"}>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Container>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    unit_price: PropTypes.string.isRequired,
  }).isRequired,
};
