import { Button, Heading, Icon, VStack } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

export const AnonymousUser = () => {
  return (
    <VStack alignItems={"center"} justifyContent={"center"}>
      <Icon fontSize={"9xl"} color={"tomato"}>
        <FaHeart />
      </Icon>
      <Heading>Login to add items to the wishlist.</Heading>
      <Button colorPalette={"blue"} asChild>
        <Link to={"/login"}>Login</Link>
      </Button>
    </VStack>
  );
};
