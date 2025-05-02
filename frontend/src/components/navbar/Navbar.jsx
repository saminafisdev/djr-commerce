import {
  Box,
  ButtonGroup,
  Circle,
  Container,
  Float,
  HStack,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";

import { Logo } from "../Logo";
import { InputGroup } from "../ui/input-group";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { ProfileMenu } from "./ProfileMenu";
import { Link } from "react-router";
import { useGetWishlistQuery } from "@/features/wishlist/wishlistApi";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";

export const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { data: wishlist } = useGetWishlistQuery(undefined, {
    skip: !isAuthenticated,
  });

  return (
    <Box>
      <Container>
        <HStack justifyContent={"space-between"} py={4}>
          <Icon>
            <Logo width={"40px"} />
          </Icon>
          <InputGroup startElement={<FiSearch />} width="2/3">
            <Input placeholder="What are you looking for" />
          </InputGroup>
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
