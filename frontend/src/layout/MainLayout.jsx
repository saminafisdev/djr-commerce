import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { Navbar } from "@/components/navbar/Navbar";

export const MainLayout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
};
