import {
  Button,
  DrawerActionTrigger,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import emptyCart from "@/assets/svg/empty_cart.svg";
import { Link } from "react-router";

export const EmptyCart = () => {
  return (
    <Stack align={"center"} justify={"center"} h={"full"} spaceY={"4"}>
      <Image src={emptyCart} alt="Empty cart" height={60} />
      <Text fontSize={"2xl"}>Your cart is empty</Text>
      <DrawerActionTrigger>
        <Button
          variant={"solid"}
          colorPalette={"blue"}
          size={"xl"}
          rounded={"lg"}
          asChild
        >
          <Link to={"/products"}>Go shopping</Link>
        </Button>
      </DrawerActionTrigger>
    </Stack>
  );
};
