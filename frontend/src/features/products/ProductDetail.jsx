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

export const ProductDetail = () => {
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
          <Heading size={"4xl"}>Mens T-Shirt</Heading>
          <Text color={"gray.600"} fontSize={"lg"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum,
            repellendus. Sunt voluptatem tenetur voluptatibus vero aliquam
            minus, officiis iste magni, aut autem, quae voluptatum aliquid quia
            aspernatur ab. Quaerat, distinctio?
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
            $200
          </Text>
          <NumberInputRoot size={"lg"} width={200} defaultValue="1">
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
