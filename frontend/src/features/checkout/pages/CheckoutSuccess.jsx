import { Box, Container, Heading, Text } from "@chakra-ui/react";

export const CheckoutSuccess = () => {
  return (
    <Box backgroundColor={"green.200"} py={20} textAlign={"center"}>
      <Container>
        <Heading color={"green.900"} size={"4xl"}>
          Your order has placed successfully!
        </Heading>
        <Text color={"green.900"} fontSize={"2xl"} my={2}>
          Thank you for shopping with us
        </Text>
      </Container>
    </Box>
  );
};
