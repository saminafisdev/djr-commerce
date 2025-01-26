import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IconButton, Stack, StackSeparator } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { CartDetail } from "./CartDetail";

export const CartDrawer = () => {
  return (
    <DrawerRoot size={"md"}>
      <DrawerBackdrop />
      <DrawerTrigger>
        <IconButton>
          <FiShoppingCart />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerCloseTrigger />
        <DrawerHeader>
          <DrawerTitle fontSize={"2xl"}>My Cart</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack spaceY={4} separator={<StackSeparator />}>
            <CartDetail />
            <CartDetail />
            <CartDetail />
          </Stack>
        </DrawerBody>
        <DrawerFooter />
      </DrawerContent>
    </DrawerRoot>
  );
};
