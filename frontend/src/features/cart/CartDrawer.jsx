import {
  DrawerActionTrigger,
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
import {
  Button,
  Circle,
  Float,
  IconButton,
  Spinner,
  Stack,
  StackSeparator,
  Text,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { CartDetail } from "./CartDetail";
import { EmptyCart } from "./EmptyCart";
import { useGetCartQuery } from "./cartApi";

export const CartDrawer = () => {
  const { data, isFetching, isLoading, isError } = useGetCartQuery();

  if (isLoading) return <h3>Loading</h3>;
  if (isError) return <h3>Error fetching Cart</h3>;

  return (
    <DrawerRoot size={"md"}>
      <DrawerBackdrop />
      <DrawerTrigger>
        <IconButton position={"relative"}>
          <FiShoppingCart />
          <Float>
            <Circle bg={"blue.500"} color={"white"} size={5}>
              {data?.total_items}
            </Circle>
          </Float>
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerCloseTrigger />
        <DrawerHeader>
          <DrawerTitle fontSize={"2xl"}>My Cart</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {data?.items.length ? (
            <Stack spaceY={4} separator={<StackSeparator />}>
              {data?.items.map((item) => (
                <CartDetail key={item.id} item={item} />
              ))}
            </Stack>
          ) : (
            <EmptyCart />
          )}
        </DrawerBody>
        <DrawerFooter>
          <Text mr="auto" fontSize={"2xl"}>
            Total: {isFetching ? <Spinner /> : `$${data?.total_price}`}
          </Text>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};
