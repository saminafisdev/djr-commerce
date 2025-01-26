import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { Navbar } from "@/components/Navbar";

export const MainLayout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
};
