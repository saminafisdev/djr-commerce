import { Button, Heading, Icon, VStack } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

export const EmptyWishlist = () => {
  return (
    <VStack alignItems={"center"} justifyContent={"center"}>
      <Icon fontSize={"9xl"} color={"tomato"}>
        <FaHeart />
      </Icon>
      <Heading>Your Wishlist is Empty.</Heading>
      <Button colorPalette={"blue"} asChild>
        <Link to={"/products"}>Browse Items</Link>
      </Button>
    </VStack>
  );
};
