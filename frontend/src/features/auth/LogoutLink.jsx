import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "./authApi";
import { removeUser } from "./authSlice";
import { useNavigate } from "react-router";
import { apiSlice } from "../api/apiSlice";

export const LogoutLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(removeUser());
      dispatch(apiSlice.util.resetApiState());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      Logout
    </Button>
  );
};
