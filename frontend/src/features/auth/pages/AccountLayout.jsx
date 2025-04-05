import {
  Box,
  Container,
  Flex,
  Link as ChakraLink,
  StackSeparator,
  VStack,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router";

export const AccountLayout = () => {
  return (
    <Container py={10}>
      <Flex direction={"row"} gap={16}>
        <Box as={"nav"} w={"3/12"} borderWidth={"1px"} rounded={"md"}>
          <VStack separator={<StackSeparator />} gap={0}>
            <ChakraLink fontSize={"lg"} py={4} px={6} w="full" asChild>
              <NavLink
                to={"/account"}
                end
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#a3cfff" : "",
                  color: isActive ? "#173da6" : "",
                })}
              >
                Profile
              </NavLink>
            </ChakraLink>
            <ChakraLink fontSize={"lg"} py={4} px={6} w="full" asChild>
              <NavLink
                to={"/account/order"}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#a3cfff" : "",
                  color: isActive ? "#173da6" : "",
                })}
              >
                Orders
              </NavLink>
            </ChakraLink>
          </VStack>
        </Box>

        <Outlet />
      </Flex>
    </Container>
  );
};
