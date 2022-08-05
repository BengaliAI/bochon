import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { SideNav } from "./sideNav";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      direction="row"
      bgGradient="radial-gradient( circle 1500px at 8.3% 75.7%,  rgba(209,247,241,0.75) 0%, rgba(249,213,213,0.75) 81% );"
      height="100vh"
    >
      <Box
        bg="primary.bg"
        w={[0, 0, 320, 320]}
        visibility={["hidden", "hidden", "visible", "visible"]}
      >
        <SideNav />
      </Box>
      <Box>{children}</Box>
    </Flex>
  );
};
