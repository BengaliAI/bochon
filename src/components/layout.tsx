import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { SideNav } from "./sideNav";

const gradients = [
  "radial-gradient( circle 800px at 8.3% 75.7%,  rgba(209,247,241,0.7) 0%, rgba(249,213,213,0.7) 81% );",
  "radial-gradient( circle 1500px at 8.3% 75.7%,  rgba(209,247,241,0.7) 0%, rgba(249,213,213,0.7) 81% );",
];

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      direction="row"
      bgGradient={[gradients[0], gradients[0], gradients[1], gradients[1]]}
      height="100vh"
    >
      <Box
        bg="primary.bg"
        minW={[0, 0, 320, 320]}
        maxW={[0, 0, 320, 320]}
        visibility={["hidden", "hidden", "visible", "visible"]}
      >
        <SideNav />
      </Box>
      <Box width="100%">{children}</Box>
    </Flex>
  );
};
