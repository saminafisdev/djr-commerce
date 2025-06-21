import {
  Button,
  DrawerActionTrigger,
  EmptyState,
  VStack,
} from "@chakra-ui/react";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router";

export const EmptyCart = () => {
  return (
    <EmptyState.Root size={"lg"} colorPalette={"blue"}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuShoppingCart />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Your cart is empty</EmptyState.Title>
          <EmptyState.Description>
            Explore our products and add items to your cart
          </EmptyState.Description>
        </VStack>
        <DrawerActionTrigger>
          <Button
            variant={"outline"}
            colorPalette={"blue"}
            rounded={"lg"}
            asChild
          >
            <Link to={"/products"}>Go shopping</Link>
          </Button>
        </DrawerActionTrigger>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
