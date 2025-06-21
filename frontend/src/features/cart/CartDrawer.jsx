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
import { useGetCartQuery, useStripeCheckoutMutation } from "./cartApi";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../auth/authSlice";
import { UnauthorizedCart } from "./UnauthorizedCart";
import { EmptyCart } from "./EmptyCart";

export const CartDrawer = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const {
    data: cart,
    isFetching,
    isLoading,
    isError,
  } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [createCheckoutSession, { isLoading: isCheckoutLoading }] =
    useStripeCheckoutMutation();

  if (isLoading) return <h3>Loading</h3>;
  if (isError) console.error("Error fetching cart");

  const handleCheckout = async () => {
    try {
      const response = await createCheckoutSession().unwrap();
      window.location.href = response;
    } catch (err) {
      console.error("Failed to create checkout session", err);
    }
  };

  return (
    <DrawerRoot size={"md"}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton position={"relative"}>
          <FiShoppingCart />
          {isAuthenticated && (
            <Float>
              <Circle bg={"blue.500"} color={"white"} size={5}>
                {cart?.total_items ?? 0}
              </Circle>
            </Float>
          )}
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerCloseTrigger />
        <DrawerHeader>
          <DrawerTitle fontSize={"2xl"}>Cart</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {!isAuthenticated ? (
            <UnauthorizedCart />
          ) : cart?.items.length > 0 ? (
            <Stack spaceY={4} separator={<StackSeparator />}>
              {cart?.items.map((item) => (
                <CartDetail key={item.id} item={item} />
              ))}
            </Stack>
          ) : (
            <EmptyCart />
          )}
        </DrawerBody>
        <DrawerFooter>
          {isAuthenticated && (
            <Text mr="auto" fontSize={"2xl"}>
              Total: {isFetching ? <Spinner /> : `$${cart?.total_price}`}
            </Text>
          )}
          {cart?.items?.length > 0 ? (
            <Button
              type="submit"
              variant={"solid"}
              colorPalette={"green"}
              disabled={isCheckoutLoading}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          ) : null}
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};
