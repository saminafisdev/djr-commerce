import {
  Box,
  ButtonGroup,
  Circle,
  Container,
  Float,
  HStack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";

import { Logo } from "../Logo";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { ProfileMenu } from "./ProfileMenu";
import { Link } from "react-router";
import { useGetWishlistQuery } from "@/features/wishlist/wishlistApi";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { SearchBar } from "../search-bar";

export const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { data: wishlist } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });

  return (
    <Box>
      <Container>
        <HStack justifyContent={"space-between"} py={4}>
          <Link to={"/"}>
            <Icon>
              <Logo width={"40px"} />
            </Icon>
          </Link>
          <SearchBar />
          <ButtonGroup variant={"ghost"} spaceX={3}>
            <CartDrawer />
            <Link to={"/wishlist"}>
              <IconButton position="relative">
                <FiHeart />
                {isAuthenticated && (
                  <Float placement={"top-end"}>
                    <Circle size={5} bg={"blue.500"} color={"white"}>
                      {wishlist?.items?.length ?? 0}
                    </Circle>
                  </Float>
                )}
              </IconButton>
            </Link>
            <ProfileMenu />
          </ButtonGroup>
        </HStack>
      </Container>
    </Box>
  );
};
