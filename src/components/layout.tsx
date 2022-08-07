import { Box, Flex, Heading } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { NavDrawer } from "./navDrawer";
import { SideNav } from "./sideNav";

const gradients = [
  "radial-gradient( circle 800px at 8.3% 75.7%,  rgba(209,247,241,0.7) 0%, rgba(249,213,213,0.7) 81% );",
  "radial-gradient( circle 1500px at 8.3% 75.7%,  rgba(209,247,241,0.7) 0%, rgba(249,213,213,0.7) 81% );",
];

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      direction={["column", "column", "row"]}
      bgGradient={[gradients[0], gradients[0], gradients[1], gradients[1]]}
      height="100vh"
    >
      <Box
        width="100%"
        bg="#fff9"
        display={["flex", "flex", "none"]}
        visibility={["visible", "visible", "hidden"]}
        justifyContent="space-between"
        alignItems="center"
        p={3}
        px={5}
        shadow="sm"
      >
        <Heading>বচন</Heading>
        <NavDrawer />
      </Box>
      <Box
        bg="#fff9"
        minW={[0, 0, 320, 320]}
        maxW={[0, 0, 320, 320]}
        display={["none", "none", "block"]}
        visibility={["hidden", "hidden", "visible"]}
      >
        <SideNav />
      </Box>
      <Box width="100%" height="100%">
        {children}
      </Box>
    </Flex>
  );
};
