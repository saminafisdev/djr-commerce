import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";

import { Logo } from "./Logo";
import { InputGroup } from "./ui/input-group";
import { CartDrawer } from "@/features/cart/CartDrawer";

export const Navbar = () => {
  return (
    <Box>
      <Container>
        <HStack justifyContent={"space-between"} py={4}>
          <Icon>
            <Logo width={"40px"} />
          </Icon>
          <InputGroup startElement={<FiSearch />}>
            <Input placeholder="What are you looking for" width={700} />
          </InputGroup>
          <ButtonGroup variant={"ghost"} spaceX={3}>
            <CartDrawer />
            <IconButton>
              <FiHeart />
            </IconButton>
            <IconButton>
              <FiUser />
            </IconButton>
          </ButtonGroup>
        </HStack>
      </Container>
    </Box>
  );
};
