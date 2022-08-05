import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { SideNav } from "./sideNav";

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction="row">
      <Box>
        <SideNav />
      </Box>
      <Box>{children}</Box>
    </Flex>
  );
};
