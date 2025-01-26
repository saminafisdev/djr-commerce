import { Link as RouterLink } from "react-router";

import { Rating } from "@/components/ui/rating";
import {
  Box,
  Button,
  Center,
  Container,
  Float,
  Grid,
  GridItem,
  Group,
  IconButton,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

import { FiHeart } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";

const ProductCard = () => {
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
              <RouterLink to={`/products/1`}>T-shirt for men</RouterLink>
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
          <Text fontWeight={"semibold"}>$20</Text>
        </Box>
        <Button variant={"outline"} mt={4} colorPalette={"blue"} width={"full"}>
          <FiShoppingBag /> Add to Cart
        </Button>
      </Box>
    </GridItem>
  );
};

export const ProductsList = () => {
  return (
    <Container>
      <Text fontSize={"2xl"} fontWeight={"medium"} mb={4}>
        Product List
      </Text>
      <Grid templateColumns={"repeat(4, 1fr)"} gap={4}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Grid>
    </Container>
  );
};
