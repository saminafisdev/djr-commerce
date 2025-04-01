import { Container, Heading, Text } from "@chakra-ui/react";
import { useGetWishlistQuery } from "./wishlistApi";
import { WishlistTable } from "./WishlistTable";
import { EmptyWishlist } from "./EmptyWishlist";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../auth/authSlice";
import { AnonymousUser } from "./AnonymousUser";

export const WishlistPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const {
    data: wishlist,
    isLoading,
    isError,
  } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });

  if (isLoading) return <Text>Loading</Text>;
  if (isError) return <Text>Error</Text>;

  return (
    <Container>
      <Heading size={"4xl"} textAlign={"center"} py={6}>
        My Wishlist
      </Heading>

      {!isAuthenticated ? (
        <AnonymousUser />
      ) : wishlist?.items.length > 0 ? (
        <WishlistTable wishlist={wishlist} />
      ) : (
        <EmptyWishlist />
      )}
    </Container>
  );
};
