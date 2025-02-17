import { Container, Heading, Text } from "@chakra-ui/react";
import { useGetWishlistQuery } from "./wishlistApi";
import { WishlistTable } from "./WishlistTable";
import { EmptyWishlist } from "./EmptyWishlist";

export const WishlistPage = () => {
  const { data: wishlist, isLoading, isError } = useGetWishlistQuery();

  if (isLoading) return <Text>Loading</Text>;
  if (isError) return <Text>Error</Text>;

  return (
    <Container>
      <Heading size={"4xl"} textAlign={"center"} py={6}>
        My Wishlist
      </Heading>

      {wishlist?.items.length > 0 ? (
        <WishlistTable wishlist={wishlist} />
      ) : (
        <EmptyWishlist />
      )}
    </Container>
  );
};
