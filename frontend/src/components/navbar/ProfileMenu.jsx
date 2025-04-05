import { Link } from "react-router";
import { useSelector } from "react-redux";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiUser } from "react-icons/fi";
import { LogoutLink } from "@/features/auth/LogoutLink";

import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { Button, ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import { useGetUserInfoQuery } from "@/features/auth/authApi";

const LoggedInMenu = () => {
  return (
    <ButtonGroup width={"full"} variant={"ghost"} flexDirection={"column"}>
      <Button asChild>
        <Link to={"/account"}>Profile</Link>
      </Button>
      <LogoutLink />
    </ButtonGroup>
  );
};

const LoggedOutMenu = () => {
  return (
    <Button width={"full"} asChild>
      <Link to={"/login"}>Login</Link>
    </Button>
  );
};

export const ProfileMenu = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: user } = useGetUserInfoQuery();

  return (
    <PopoverRoot size={"xs"}>
      <PopoverTrigger as={IconButton}>
        <FiUser />
        {isAuthenticated && <Text>{user?.username}</Text>}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          {isAuthenticated ? <LoggedInMenu /> : <LoggedOutMenu />}
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
