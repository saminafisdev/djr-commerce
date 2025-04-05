import { Box, Container, Heading, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router";

export const CheckoutCancel = () => {
  return (
    <Box backgroundColor={"red.200"} py={20} textAlign={"center"}>
      <Container>
        <Heading color={"red.900"} size={"4xl"}>
          Order cancelled!
        </Heading>
        <ChakraLink color={"red.900"} my={2}>
          <Link to="/products">Keep browsing products</Link>
        </ChakraLink>
      </Container>
    </Box>
  );
};
